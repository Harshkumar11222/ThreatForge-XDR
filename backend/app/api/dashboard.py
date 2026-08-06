from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/stats")
def dashboard_stats(
    current_user: str = Depends(get_current_user),
):
    return {
        "critical_alerts": 12,
        "protected_devices": 245,
        "countries": 18,
        "ai_status": "ACTIVE",
    }