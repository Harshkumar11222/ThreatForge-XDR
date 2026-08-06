from sqlalchemy.orm import Session

from app.models.alert import Alert


def save_alert(
    db: Session,
    threat: str,
    severity: str,
    risk_score: int,
    file_name: str,
    file_path: str,
    source: str = "Real-Time Scanner",
):
    alert = Alert(
        threat=threat,
        severity=severity,
        risk_score=risk_score,
        file_name=file_name,
        file_path=file_path,
        source=source,
        status="Active",
    )

    db.add(alert)
    db.commit()
    db.refresh(alert)

    return alert


def get_recent_alerts(db: Session, limit: int = 10):
    return (
        db.query(Alert)
        .order_by(Alert.created_at.desc())
        .limit(limit)
        .all()
    )


def get_alert_statistics(db: Session):
    alerts = db.query(Alert).all()

    total = len(alerts)
    critical = len([a for a in alerts if a.severity == "Critical"])
    high = len([a for a in alerts if a.severity == "High"])
    medium = len([a for a in alerts if a.severity == "Medium"])
    low = len([a for a in alerts if a.severity == "Low"])

    return {
        "total": total,
        "critical": critical,
        "high": high,
        "medium": medium,
        "low": low,
    }


def resolve_alert(db: Session, alert_id: int):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()

    if not alert:
        return None

    alert.status = "Resolved"

    db.commit()
    db.refresh(alert)

    return alert


def delete_alert(db: Session, alert_id: int):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()

    if not alert:
        return False

    db.delete(alert)
    db.commit()

    return True