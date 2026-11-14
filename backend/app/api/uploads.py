
import asyncio
import os
import shutil
from pathlib import Path
from uuid import uuid4

from fastapi import (
    APIRouter,
    BackgroundTasks,
    Depends,
    HTTPException,
    Query,
    Request,
)
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from app.services.upload_scan_service import process_upload_job
from app.database import get_db
from app.core.dependencies import get_current_user
from app.models.upload_scan import UploadJob, UploadScanFile


router = APIRouter(prefix="/uploads", tags=["File Upload Scanner"])

# 12 GB in decimal bytes
MAX_TOTAL_BYTES = 12_000_000_000

# Each request may contain a maximum 16 MB chunk
CHUNK_SIZE = 16 * 1024 * 1024

MAX_FILES = 10_000

BACKEND_DIR = Path(__file__).resolve().parents[2]
UPLOAD_ROOT = BACKEND_DIR / "storage" / "uploads"

# Prevent simultaneous chunks for the same file in this process.
_UPLOAD_LOCKS: dict[str, asyncio.Lock] = {}


class UploadFileInfo(BaseModel):
    relative_path: str = Field(min_length=1, max_length=1024)
    size_bytes: int = Field(ge=0)


class UploadInitRequest(BaseModel):
    files: list[UploadFileInfo] = Field(
        min_length=1,
        max_length=MAX_FILES,
    )


def validate_relative_path(value: str) -> str:
    value = value.strip().replace("\\", "/")

    if not value or value.startswith("/") or ":" in value:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid relative path: {value}",
        )

    if "\x00" in value or any(ord(char) < 32 for char in value):
        raise HTTPException(
            status_code=400,
            detail="File path contains invalid characters.",
        )

    parts = value.split("/")

    if any(part in ("", ".", "..") for part in parts):
        raise HTTPException(
            status_code=400,
            detail=f"Unsafe file path: {value}",
        )

    return "/".join(parts)


def get_owned_job(
    db: Session,
    job_id: str,
    owner_email: str,
) -> UploadJob:
    job = (
        db.query(UploadJob)
        .filter(
            UploadJob.id == job_id,
            UploadJob.owner_email == owner_email,
        )
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Upload job not found.",
        )

    return job


@router.post("/init")
def initialize_upload(
    payload: UploadInitRequest,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    normalized_files = []
    seen_paths = set()
    total_bytes = 0

    for item in payload.files:
        relative_path = validate_relative_path(item.relative_path)

        path_key = relative_path.casefold()

        if path_key in seen_paths:
            raise HTTPException(
                status_code=400,
                detail=f"Duplicate file path: {relative_path}",
            )

        seen_paths.add(path_key)
        total_bytes += item.size_bytes

        if total_bytes > MAX_TOTAL_BYTES:
            raise HTTPException(
                status_code=413,
                detail="Combined upload size exceeds the 12 GB limit.",
            )

        normalized_files.append(
            {
                "relative_path": relative_path,
                "size_bytes": item.size_bytes,
            }
        )

    job_id = str(uuid4())
    job_directory = UPLOAD_ROOT / job_id

    try:
        job_directory.mkdir(parents=True, exist_ok=False)

        job = UploadJob(
            id=job_id,
            owner_email=current_user,
            status="uploading",
            total_bytes=total_bytes,
            uploaded_bytes=0,
            total_files=len(normalized_files),
            scanned_files=0,
        )

        db.add(job)

        manifest = []

        for item in normalized_files:
            file_id = str(uuid4())

            stored_path = job_directory / f"{file_id}.bin"

            file_status = (
                "Uploaded"
                if item["size_bytes"] == 0
                else "Uploading"
            )

            if item["size_bytes"] == 0:
                stored_path.touch()

            scan_file = UploadScanFile(
                id=file_id,
                job_id=job_id,
                relative_path=item["relative_path"],
                stored_path=str(stored_path),
                size_bytes=item["size_bytes"],
                uploaded_bytes=0,
                status=file_status,
            )

            db.add(scan_file)

            manifest.append(
                {
                    "file_id": file_id,
                    "relative_path": item["relative_path"],
                    "size_bytes": item["size_bytes"],
                    "uploaded_bytes": 0,
                    "status": file_status,
                }
            )

        db.commit()

        return {
            "job_id": job_id,
            "status": "uploading",
            "total_bytes": total_bytes,
            "total_files": len(normalized_files),
            "chunk_size": CHUNK_SIZE,
            "files": manifest,
        }

    except HTTPException:
        db.rollback()
        shutil.rmtree(job_directory, ignore_errors=True)
        raise

    except Exception:
        db.rollback()
        shutil.rmtree(job_directory, ignore_errors=True)
        raise HTTPException(
            status_code=500,
            detail="Could not initialize upload.",
        )


@router.put("/{job_id}/files/{file_id}/chunk")
async def upload_file_chunk(
    job_id: str,
    file_id: str,
    request: Request,
    offset: int = Query(ge=0),
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    lock = _UPLOAD_LOCKS.setdefault(file_id, asyncio.Lock())

    async with lock:
        job = get_owned_job(db, job_id, current_user)

        if job.status != "uploading":
            raise HTTPException(
                status_code=409,
                detail="This upload job is not accepting chunks.",
            )

        scan_file = (
            db.query(UploadScanFile)
            .filter(
                UploadScanFile.id == file_id,
                UploadScanFile.job_id == job_id,
            )
            .first()
        )

        if not scan_file:
            raise HTTPException(
                status_code=404,
                detail="Upload file not found.",
            )

        if offset != scan_file.uploaded_bytes:
            raise HTTPException(
                status_code=409,
                detail={
                    "message": "Incorrect upload offset.",
                    "expected_offset": scan_file.uploaded_bytes,
                },
            )

        if scan_file.status == "Uploaded":
            raise HTTPException(
                status_code=409,
                detail="This file is already fully uploaded.",
            )

        content_length = request.headers.get("content-length")

        if content_length:
            try:
                if int(content_length) > CHUNK_SIZE:
                    raise HTTPException(
                        status_code=413,
                        detail="Chunk exceeds the 16 MB limit.",
                    )
            except ValueError:
                raise HTTPException(
                    status_code=400,
                    detail="Invalid Content-Length header.",
                )

        remaining = scan_file.size_bytes - offset

        if remaining <= 0:
            raise HTTPException(
                status_code=409,
                detail="No bytes remain for this file.",
            )

        destination = Path(scan_file.stored_path)
        destination.parent.mkdir(parents=True, exist_ok=True)

        temp_path = destination.with_name(
            destination.name + f".{uuid4().hex}.part"
        )

        written = 0

        try:
            with open(temp_path, "wb") as temp_file:
                async for chunk in request.stream():
                    if not chunk:
                        continue

                    written += len(chunk)

                    if written > CHUNK_SIZE:
                        raise HTTPException(
                            status_code=413,
                            detail="Chunk exceeds the 16 MB limit.",
                        )

                    if written > remaining:
                        raise HTTPException(
                            status_code=413,
                            detail="Chunk exceeds the remaining file size.",
                        )

                    temp_file.write(chunk)

            if written == 0:
                raise HTTPException(
                    status_code=400,
                    detail="Empty chunk received.",
                )

            # Recover safely if a previous request appended bytes
            # but failed before its database commit.
            if destination.exists():
                current_size = destination.stat().st_size

                if current_size < offset:
                    raise HTTPException(
                        status_code=409,
                        detail="Stored file is shorter than the recorded offset.",
                    )

                if current_size > offset:
                    with open(destination, "r+b") as existing_file:
                        existing_file.truncate(offset)

            elif offset != 0:
                raise HTTPException(
                    status_code=409,
                    detail="Stored upload file is missing.",
                )

            with open(temp_path, "rb") as source:
                with open(destination, "ab") as target:
                    shutil.copyfileobj(source, target, length=1024 * 1024)
                    target.flush()
                    os.fsync(target.fileno())

            scan_file.uploaded_bytes += written

            if scan_file.uploaded_bytes == scan_file.size_bytes:
                scan_file.status = "Uploaded"

            job.uploaded_bytes += written

            db.commit()

            return {
                "job_id": job_id,
                "file_id": file_id,
                "uploaded_bytes": scan_file.uploaded_bytes,
                "file_size": scan_file.size_bytes,
                "job_uploaded_bytes": job.uploaded_bytes,
                "job_total_bytes": job.total_bytes,
                "status": scan_file.status,
                "next_offset": scan_file.uploaded_bytes,
            }

        except HTTPException:
            db.rollback()
            raise

        except Exception:
            db.rollback()
            raise HTTPException(
                status_code=500,
                detail="Chunk upload failed.",
            )

        finally:
            temp_path.unlink(missing_ok=True)

@router.get("/history")
def get_upload_history(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    jobs = (
        db.query(UploadJob)
        .filter(UploadJob.owner_email == current_user)
        .order_by(UploadJob.created_at.desc())
        .limit(50)
        .all()
    )

    if not jobs:
        return []

    job_ids = [job.id for job in jobs]

    files = (
        db.query(UploadScanFile)
        .filter(UploadScanFile.job_id.in_(job_ids))
        .order_by(UploadScanFile.created_at.desc())
        .all()
    )

    files_by_job = {}

    for item in files:
        files_by_job.setdefault(item.job_id, []).append({
            "file_id": item.id,
            "relative_path": item.relative_path,
            "size_bytes": item.size_bytes,
            "status": item.status,
            "sha256": item.sha256,
            "clamav_result": item.clamav_result,
            "yara_status": item.yara_status,
            "yara_matches": item.yara_matches,
            "threat_name": item.threat_name,
            "severity": item.severity,
            "error_message": item.error_message,
            "scanned_at": item.scanned_at,
        })

    return [
        {
            "job_id": job.id,
            "status": job.status,
            "total_files": job.total_files,
            "scanned_files": job.scanned_files,
            "clean_files": job.clean_files,
            "suspicious_files": job.suspicious_files,
            "malicious_files": job.malicious_files,
            "error_files": job.error_files,
            "total_bytes": job.total_bytes,
            "created_at": job.created_at,
            "updated_at": job.updated_at,
            "files": files_by_job.get(job.id, []),
        }
        for job in jobs
    ]
@router.get("/{job_id}")
def get_upload_status(
    job_id: str,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    job = get_owned_job(db, job_id, current_user)

    files = (
        db.query(UploadScanFile)
        .filter(UploadScanFile.job_id == job_id)
        .all()
    )

    return {
        "job_id": job.id,
        "status": job.status,
        "total_bytes": job.total_bytes,
        "uploaded_bytes": job.uploaded_bytes,
        "total_files": job.total_files,
        
"files": [
    {
        "file_id": item.id,
        "relative_path": item.relative_path,
        "size_bytes": item.size_bytes,
        "uploaded_bytes": item.uploaded_bytes,
        "status": item.status,
        "sha256": item.sha256,
        "clamav_result": item.clamav_result,
        "yara_status": item.yara_status,
        "yara_matches": item.yara_matches,
        "threat_name": item.threat_name,
        "severity": item.severity,
        "error_message": item.error_message,
    }
    for item in files
],

    }


@router.post("/{job_id}/finalize")
def finalize_upload(
    job_id: str,
    background_tasks: BackgroundTasks,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    job = get_owned_job(db, job_id, current_user)

    if job.status != "uploading":
        raise HTTPException(
            status_code=409,
            detail="Upload job cannot be finalized in its current state.",
        )

    files = (
        db.query(UploadScanFile)
        .filter(UploadScanFile.job_id == job_id)
        .all()
    )

    incomplete = [
        item.relative_path
        for item in files
        if (
            item.uploaded_bytes != item.size_bytes
            or not Path(item.stored_path).is_file()
            or Path(item.stored_path).stat().st_size != item.size_bytes
        )
    ]

    if incomplete:
        raise HTTPException(
            status_code=409,
            detail={
                "message": "Some files are not completely uploaded.",
                "incomplete_files": incomplete[:20],
            },
        )

    # Mark job as scanning before starting the worker.
    job.status = "scanning"
    db.commit()

    # Start malware scanning in the background.
    background_tasks.add_task(process_upload_job, job_id)

    return {
        "job_id": job_id,
        "status": "scanning",
        "total_files": job.total_files,
        "total_bytes": job.total_bytes,
        "message": "Upload completed. Malware scanning has started.",
    }