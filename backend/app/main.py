from fastapi import FastAPI
from app.database import Base, engine
from app.models.user import User
from app.api.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.dashboard import router as dashboard_router
from app.api.alerts import router as alerts_router
from app.api.analytics import router as analytics_router
from app.api.scanner import router as scanner_router
from app.models.scan import Scan
from app.api.scans import router as scans_router
from app.models import alert
import threading
from app.scanner.watcher import start_file_watcher

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ThreatForge XDR API",
    version="1.0.0",
    description="Backend API for ThreatForge XDR Platform"
)

@app.on_event("startup")
def start_scanner():

    thread = threading.Thread(
        target=start_file_watcher,
        daemon=True
    )

    thread.start()

    print("ThreatForge Scanner Started")

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


app.include_router(scans_router)
app.include_router(scanner_router)
app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(alerts_router)
app.include_router(analytics_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to ThreatForge XDR API 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "version": "1.0.0"
    }