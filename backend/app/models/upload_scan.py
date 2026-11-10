
from sqlalchemy import (
    Column,
    String,
    Integer,
    DateTime,
    ForeignKey,
    Text,
)
from sqlalchemy.sql import func

from app.database import Base


class UploadJob(Base):
    __tablename__ = "upload_jobs"

    id = Column(String(36), primary_key=True, index=True)

    owner_email = Column(
        String(320),
        nullable=False,
        index=True,
    )

    status = Column(
        String(30),
        nullable=False,
        default="created",
        index=True,
    )

    total_bytes = Column(Integer, nullable=False, default=0)
    uploaded_bytes = Column(Integer, nullable=False, default=0)

    total_files = Column(Integer, nullable=False, default=0)
    scanned_files = Column(Integer, nullable=False, default=0)

    clean_files = Column(Integer, nullable=False, default=0)
    suspicious_files = Column(Integer, nullable=False, default=0)
    malicious_files = Column(Integer, nullable=False, default=0)
    error_files = Column(Integer, nullable=False, default=0)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


class UploadScanFile(Base):
    __tablename__ = "upload_scan_files"

    id = Column(String(36), primary_key=True, index=True)

    job_id = Column(
        String(36),
        ForeignKey("upload_jobs.id"),
        nullable=False,
        index=True,
    )

    relative_path = Column(String(1024), nullable=False)
    stored_path = Column(String(1500), nullable=False)

    size_bytes = Column(Integer, nullable=False, default=0)
    uploaded_bytes = Column(Integer, nullable=False, default=0)

    status = Column(
        String(30),
        nullable=False,
        default="Not Scanned",
        index=True,
    )

    sha256 = Column(String(64), nullable=True)

    clamav_result = Column(String(100), nullable=True)
    yara_status = Column(String(50), nullable=True)
    yara_matches = Column(Text, nullable=True)

    threat_name = Column(String(255), nullable=True)
    severity = Column(String(30), nullable=True)
    error_message = Column(Text, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    scanned_at = Column(
        DateTime(timezone=True),
        nullable=True,
    )
