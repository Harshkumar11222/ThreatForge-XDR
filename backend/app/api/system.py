import psutil
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/system",
    tags=["System"]
)


@router.get("/health")
def system_health(
    current_user: str = Depends(get_current_user)
):
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage("C:\\")

    network = psutil.net_io_counters()

    return {
        "cpu": psutil.cpu_percent(interval=0.5),
        "memory": memory.percent,
        "disk": disk.percent,
        "network_sent": network.bytes_sent,
        "network_received": network.bytes_recv,
        "platform": "Windows",
        "status": "Protected"
    }