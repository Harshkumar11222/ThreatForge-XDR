
from datetime import datetime, timezone
from pathlib import Path

from app.database import SessionLocal
from app.models.upload_scan import UploadJob, UploadScanFile
from app.models.alert import Alert
from app.services.malware_scanner import scan_file


def process_upload_job(job_id: str):
    """
    Scan every completely uploaded file in a job.
    Save scan results and create alerts for detections.
    """

    db = SessionLocal()

    try:
        job = (
            db.query(UploadJob)
            .filter(UploadJob.id == job_id)
            .first()
        )

        if not job or job.status != "scanning":
            return

        files = (
            db.query(UploadScanFile)
            .filter(UploadScanFile.job_id == job_id)
            .all()
        )

        job.scanned_files = 0
        job.clean_files = 0
        job.suspicious_files = 0
        job.malicious_files = 0
        job.error_files = 0
        db.commit()

        for item in files:
            item.status = "Scanning"
            db.commit()

            stored_file = Path(item.stored_path)

            # Never scan incomplete or missing uploads.
            if (
                not stored_file.is_file()
                or stored_file.stat().st_size != item.size_bytes
                or item.uploaded_bytes != item.size_bytes
            ):
                result = {
                    "status": "Scan Error",
                    "sha256": None,
                    "clamav_result": None,
                    "yara_status": None,
                    "yara_matches": None,
                    "threat_name": None,
                    "severity": None,
                    "risk_score": 0,
                    "error_message": "Uploaded file is missing or incomplete.",
                }
            else:
                result = scan_file(str(stored_file))

            item.status = result.get("status", "Scan Error")
            item.sha256 = result.get("sha256")
            item.clamav_result = result.get("clamav_result")
            item.yara_status = result.get("yara_status")
            item.yara_matches = result.get("yara_matches")
            item.threat_name = result.get("threat_name")
            item.severity = result.get("severity")
            item.error_message = result.get("error_message")
            item.scanned_at = datetime.now(timezone.utc)

            # Update job summary counters.
            if item.status == "Clean":
                job.clean_files += 1

            elif item.status == "Suspicious":
                job.suspicious_files += 1

            elif item.status == "Malicious":
                job.malicious_files += 1

            elif item.status in ("Scan Error", "Not Scanned"):
                job.error_files += 1

            # Create an alert only for actual scanner findings.
            if item.status in ("Suspicious", "Malicious"):
                alert = Alert(
                    threat=item.threat_name or "Scanner Detection",
                    severity=item.severity or "High",
                    risk_score=result.get("risk_score", 0),
                    file_name=Path(item.relative_path).name[:255],
                    file_path=str(stored_file),
                    source="Upload Scanner",
                    status="Active",
                )
                db.add(alert)

            job.scanned_files += 1
            db.commit()

        # Completed means processing finished.
        # Individual files can still be Not Scanned or Scan Error.
        job.status = "completed"
        db.commit()

    except Exception as exc:
        db.rollback()

        try:
            job = (
                db.query(UploadJob)
                .filter(UploadJob.id == job_id)
                .first()
            )

            if job:
                job.status = "failed"
                db.commit()

        except Exception:
            db.rollback()

        print(f"[UPLOAD SCANNER ERROR] Job {job_id}: {exc}")

    finally:
        db.close()
