from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import random

from app.database import get_db
from app.models.alert import Alert
from app.models.scan import Scan
from app.core.dependencies import get_current_user
from app.scanner.scanner_service import start_scanner

router = APIRouter(
    prefix="/scanner",
    tags=["Scanner"],
)


@router.post("/start")
def start_scan(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    scanner = start_scanner()

    threats = [
        "SQL Injection",
        "SSH Brute Force",
        "Ransomware",
        "Malware",
        "Port Scan",
        "XSS Attack",
        "DDoS Attempt",
    ]

    severities = [
        "Critical",
        "High",
        "Medium",
        "Low",
    ]

    results = []
    total = random.randint(2, 5)

    for _ in range(total):
        alert = Alert(
            threat=random.choice(threats),
            severity=random.choice(severities),
            source=f"192.168.1.{random.randint(2,250)}",
            status="Blocked",
        )

        db.add(alert)

        results.append({
            "threat": alert.threat,
            "severity": alert.severity,
            "source": alert.source,
            "status": alert.status,
        })

    scan = Scan(total_threats=total)

    db.add(scan)
    db.commit()
    db.refresh(scan)

    return {
        "scanner": scanner,
        "scan_status": "Completed",
        "total_threats": total,
        "results": results,
    }