import threading
from app.scanner.watcher import start_file_watcher

scanner_thread = None
scanner_running = False


def start_scanner():
    global scanner_thread, scanner_running

    if scanner_running:
        return {
            "status": "already_running",
            "message": "Scanner is already running."
        }

    scanner_running = True

    scanner_thread = threading.Thread(
        target=start_file_watcher,
        daemon=True
    )

    scanner_thread.start()

    return {
        "status": "started",
        "message": "ThreatForge Scanner Started Successfully"
    }


def stop_scanner():
    global scanner_running

    scanner_running = False

    return {
        "status": "stopped",
        "message": "Scanner Stopped"
    }


def is_scanner_running():
    return scanner_running