from unittest import result
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from app.scanner.detector import analyze_file
from app.database import SessionLocal
from app.services.alert_service import save_alert
import os
import time


WATCH_DIRECTORY = os.path.expanduser("~/Desktop")


class ThreatForgeWatcher(FileSystemEventHandler):

    def save_to_database(self, file_path, result):

        db = SessionLocal()

    try:
        save_alert(
        db=db,
        threat=result["threat"],
        severity=result["severity"],
        risk_score=result["risk_score"],
        file_name=os.path.basename(file_path),
        file_path=file_path,
        source="Real-Time Scanner",
        )

    finally:
        db.close()

    def on_created(self, event):

        if event.is_directory:
            return

        print(f"[+] File Created : {event.src_path}")

        result = analyze_file(event.src_path)

        if result["detected"]:
            self.save_to_database(event.src_path, result)
            print("=" * 60)
            print("THREAT DETECTED")
            print(f"Threat     : {result['threat']}")
            print(f"Severity   : {result['severity']}")
            print(f"Risk Score : {result['risk_score']}")
            print("=" * 60)

    def on_modified(self, event):
        self.save_to_database(event.src_path, result)

        if event.is_directory:
            return

        print(f"[*] File Modified : {event.src_path}")

        result = analyze_file(event.src_path)

        if result["detected"]:
            print("=" * 60)
            print("MODIFIED SUSPICIOUS FILE")
            print(f"Threat     : {result['threat']}")
            print(f"Severity   : {result['severity']}")
            print(f"Risk Score : {result['risk_score']}")
            print("=" * 60)

    def on_deleted(self, event):

        if event.is_directory:
            return

        print(f"[-] File Deleted : {event.src_path}")

    def on_moved(self, event):
        self.save_to_database(event.dest_path, result)
        if event.is_directory:
            return

        print(f"[>] File Renamed")
        print(f"From : {event.src_path}")
        print(f"To   : {event.dest_path}")

        result = analyze_file(event.dest_path)

        if result["detected"]:
            print("=" * 60)
            print("SUSPICIOUS FILE RENAMED")
            print(f"Threat     : {result['threat']}")
            print(f"Severity   : {result['severity']}")
            print(f"Risk Score : {result['risk_score']}")
            print("=" * 60)


def start_file_watcher():

    print("=" * 60)
    print("ThreatForge Real-Time Scanner Started")
    print(f"Watching : {WATCH_DIRECTORY}")
    print("=" * 60)

    event_handler = ThreatForgeWatcher()

    observer = Observer()
    observer.schedule(
        event_handler,
        WATCH_DIRECTORY,
        recursive=True
    )

    observer.start()

    try:
        while True:
            time.sleep(1)

    except KeyboardInterrupt:
        observer.stop()

    observer.join()