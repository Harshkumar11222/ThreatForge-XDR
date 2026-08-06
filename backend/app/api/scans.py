from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.scan import Scan
from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/scans",
    tags=["Scans"],
)


@router.get("/")
def get_scans(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    scans = (
        db.query(Scan)
        .order_by(Scan.id.desc())
        .limit(20)
        .all()
    )

    return scans