from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base

class Quarantine(Base):
    __tablename__ = "quarantine"

    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String, index=True)
    original_path = Column(String, unique=True)
    quarantine_path = Column(String, unique=True)
    threat = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
