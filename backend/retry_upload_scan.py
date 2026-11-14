
from pathlib import Path

from app.database import SessionLocal
from app.models.upload_scan import UploadJob, UploadScanFile
from app.services.upload_scan_service import process_upload_job

JOB_ID = "49bee725-6b0d-4a1b-82c6-98ee5130b54a"

db = SessionLocal()

try:
    job = db.query(UploadJob).filter(
        UploadJob.id == JOB_ID
    ).first()

    if not job:
        raise RuntimeError("Upload job not found.")

    if job.status != "uploaded":
        raise RuntimeError(
            f"Expected uploaded status, found: {job.status}"
        )

    files = db.query(UploadScanFile).filter(
        UploadScanFile.job_id == JOB_ID
    ).all()

    if not files:
        raise RuntimeError("No uploaded files found.")

    print(f"Job: {job.id}")
    print(f"Files: {len(files)}")

    for item in files:
        path = Path(item.stored_path)

        if not path.is_file():
            raise RuntimeError(
                f"Missing file: {item.relative_path}"
            )

        actual_size = path.stat().st_size

        if (
            item.uploaded_bytes != item.size_bytes
            or actual_size != item.size_bytes
        ):
            raise RuntimeError(
                f"Incomplete file: {item.relative_path}"
            )

        print(
            f"Verified: {item.relative_path} "
            f"({actual_size:,} bytes)"
        )

    job.status = "scanning"
    job.scanned_files = 0
    job.clean_files = 0
    job.suspicious_files = 0
    job.malicious_files = 0
    job.error_files = 0

    for item in files:
        item.status = "Not Scanned"
        item.sha256 = None
        item.clamav_result = None
        item.yara_status = None
        item.yara_matches = None
        item.threat_name = None
        item.severity = None
        item.error_message = None
        item.scanned_at = None

    db.commit()

    print("\nAll files verified.")
    print("Scan status updated to scanning.")

except Exception:
    db.rollback()
    raise

finally:
    db.close()

print("\nStarting malware scanner...")
process_upload_job(JOB_ID)
print("\nScanner execution finished.")
