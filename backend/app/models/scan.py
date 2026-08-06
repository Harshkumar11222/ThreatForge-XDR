from sqlalchemy import Column, Integer, DateTime
from datetime import datetime

from app.database import Base


class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)

    total_threats = Column(Integer, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )