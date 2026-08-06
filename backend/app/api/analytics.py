from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.alert import Alert
from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.get("/")
def analytics(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    critical = db.query(Alert).filter(
        Alert.severity == "Critical"
    ).count()

    high = db.query(Alert).filter(
        Alert.severity == "High"
    ).count()

    medium = db.query(Alert).filter(
        Alert.severity == "Medium"
    ).count()

    low = db.query(Alert).filter(
        Alert.severity == "Low"
    ).count()

    # Demo trend data (replace later with real analytics)
    monthly_attacks = [12, 18, 10, 25, 15, 30, 22]

    return {
        "monthly_attacks": monthly_attacks,
        "severity": {
            "Critical": critical,
            "High": high,
            "Medium": medium,
            "Low": low,
        },
    }

from sqlalchemy import func

@router.get("/top-ips")
def top_ips(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    ips = (
        db.query(
            Alert.source,
            func.count(Alert.id).label("attacks"),
        )
        .group_by(Alert.source)
        .order_by(func.count(Alert.id).desc())
        .limit(5)
        .all()
    )

    return [
        {
            "ip": ip.source,
            "attacks": ip.attacks,
        }
        for ip in ips
    ]

from app.models.scan import Scan

@router.get("/trends")
def threat_trends(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    scans = (
        db.query(Scan)
        .order_by(Scan.created_at.asc())
        .all()
    )

    return [
        {
            "scan": f"Scan {i + 1}",
            "threats": scan.total_threats,
        }
        for i, scan in enumerate(scans)
    ]