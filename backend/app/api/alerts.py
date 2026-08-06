from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.alert import Alert
from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"],
)


@router.get("/")
def get_alerts(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    alerts = (
        db.query(Alert)
        .order_by(Alert.id.desc())
        .limit(20)
        .all()
    )

    return alerts