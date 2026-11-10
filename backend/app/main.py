import os
import shutil

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.api.uploads import router as uploads_router
from app.database import get_db, Base, engine

# ==============================
# DATABASE MODELS
# ==============================

from app.models.user import User
from app.models.alert import Alert
from app.models.scan import Scan
from app.models.quarantine import Quarantine
from app.models.upload_scan import UploadJob, UploadScanFile

# ==============================
# API ROUTERS
# ==============================

from app.api.auth import router as auth_router
from app.api.alerts import router as alerts_router
from app.api.analytics import router as analytics_router
from app.api.dashboard import router as dashboard_router
from app.api.scanner import router as scanner_router
from app.api.scans import router as scans_router
from app.api.system import router as system_router


# ==============================
# FASTAPI APP
# ==============================

app = FastAPI(
    title="ThreatForge-XDR API Console",
    version="1.0.0",
    description="ThreatForge XDR Security Operations API",
)


# ==============================
# CORS
# ==============================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==============================
# DATABASE TABLE CREATION
# ==============================

Base.metadata.create_all(bind=engine)


# ==============================
# REGISTER API ROUTERS
# ==============================

app.include_router(auth_router)
app.include_router(alerts_router)
app.include_router(analytics_router)
app.include_router(dashboard_router)
app.include_router(scanner_router)
app.include_router(scans_router)
app.include_router(system_router)
app.include_router(uploads_router)

# ==============================
# ROOT ENDPOINT
# ==============================

@app.get("/")
def root():
    return {
        "name": "ThreatForge XDR",
        "status": "online",
        "message": "ThreatForge XDR API is running",
    }


# =========================================================
# QUARANTINE ENDPOINTS
# =========================================================

@app.get("/quarantine/")
def get_all_quarantine(
    db: Session = Depends(get_db),
):
    """
    Quarantine table se isolated files ki list fetch karta hai.
    """
    try:
        return db.query(Quarantine).all()

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database read failed: {str(e)}",
        )


@app.post("/quarantine/{file_id}/restore")
def restore_quarantined_file(
    file_id: int,
    db: Session = Depends(get_db),
):
    """
    Quarantined file ko original location par restore karta hai.
    """

    item = (
        db.query(Quarantine)
        .filter(Quarantine.id == file_id)
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Quarantine record not found in database.",
        )

    try:
        if os.path.exists(item.quarantine_path):

            # Restore physical file
            shutil.move(
                item.quarantine_path,
                item.original_path,
            )

            # Remove quarantine DB record
            db.delete(item)
            db.commit()

            print(
                f"[RESTORED] File '{item.file_name}' "
                f"restored to original location."
            )

            return {
                "status": "success",
                "message": (
                    f"Successfully restored to "
                    f"{item.original_path}"
                ),
            }

        raise HTTPException(
            status_code=404,
            detail=(
                "Physical file missing from "
                "quarantine storage folder."
            ),
        )

    except HTTPException:
        raise

    except Exception as e:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=(
                "Physical restoration process failed: "
                f"{str(e)}"
            ),
        )


@app.delete("/quarantine/{file_id}/delete")
def delete_quarantined_file(
    file_id: int,
    db: Session = Depends(get_db),
):
    """
    Quarantined file ko permanently delete karta hai.
    """

    item = (
        db.query(Quarantine)
        .filter(Quarantine.id == file_id)
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Quarantine record not found in database.",
        )

    try:
        if os.path.exists(item.quarantine_path):
            os.remove(item.quarantine_path)

        db.delete(item)
        db.commit()

        print(
            f"[DELETED] Quarantined file "
            f"'{item.file_name}' permanently deleted."
        )

        return {
            "status": "success",
            "message": "File permanently deleted!",
        }

    except Exception as e:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=(
                "Secure file destruction process failed: "
                f"{str(e)}"
            ),
        )