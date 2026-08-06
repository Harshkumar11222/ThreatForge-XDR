from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)

    threat = Column(String(150), nullable=False)

    severity = Column(String(50), nullable=False)

    risk_score = Column(Integer, default=0)

    file_name = Column(String(255))

    file_path = Column(String(500))

    source = Column(String(100), default="Real-Time Scanner")

    status = Column(String(50), default="Active")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    resolved_at = Column(
        DateTime(timezone=True),
        nullable=True,
    )