import os
import time
import sys

# System path set karne ke liye taaki 'app' module successfully load ho sake
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Desktop directory set karein
WATCH_DIRECTORY = os.path.join(
    os.path.expanduser("~"),
    "Desktop"
)

class ThreatForgeWatcher(FileSystemEventHandler):

    def save_to_database(self, file_path, result):
        from app.database import SessionLocal
        from app.services.alert_service import save_alert

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
            print("[+] Alert successfully saved to database")

        except Exception as e:
            db.rollback()
            print(f"[!] Database Error: {e}")

        finally:
            db.close()

    def analyze_and_save(self, file_path):
        from app.scanner.detector import analyze_file

        # Double check: agar file pehle hi delete ya move ho chuki hai, toh return karein
        if not os.path.exists(file_path):
            return

        result = analyze_file(file_path)

        if result["detected"]:
            # Database Session open karein aur automatic active response (Quarantine) execute karein
            from app.database import SessionLocal
            from app.services.quarantine_service import quarantine_file

            db = SessionLocal()
            try:
                # 1. Pehle alert ko database me save karein
                self.save_to_database(file_path, result)

                # 2. File ko quarantine folder me isolated environment me lock karein
                quarantine_entry = quarantine_file(db, file_path, result["threat"])
                if quarantine_entry:
                    print(f"[🛡️] ACTIVE RESPONSE: File '{os.path.basename(file_path)}' has been isolated!")
                else:
                    print(f"[!] Warning: File isolation / quarantine execution failed.")
            except Exception as e:
                print(f"[!] Error in active response pipeline: {e}")
            finally:
                db.close()

            print("=" * 60)
            print("🚨 THREAT DETECTED")
            print(f"Threat     : {result['threat']}")
            print(f"Severity   : {result['severity']}")
            print(f"Risk Score : {result['risk_score']}")
            print(f"File       : {os.path.basename(file_path)}")
            print(f"Path       : {file_path}")
            print("=" * 60)

    def on_created(self, event):
        if event.is_directory:
            return
        print(f"[+] File Created : {event.src_path}")
        self.analyze_and_save(event.src_path)

    def on_modified(self, event):
        if event.is_directory:
            return
        print(f"[*] File Modified : {event.src_path}")
        self.analyze_and_save(event.src_path)

    def on_deleted(self, event):
        if event.is_directory:
            return
        print(f"[-] File Deleted : {event.src_path}")

    def on_moved(self, event):
        if event.is_directory:
            return
        print("[>] File Renamed")
        print(f"From : {event.src_path}")
        print(f"To   : {event.dest_path}")
        self.analyze_and_save(event.dest_path)


def start_file_watcher():
    print("=" * 60)
    print("ThreatForge Real-Time Scanner Started")
    print(f"Watching : {WATCH_DIRECTORY}")
    print("=" * 60)

    if not os.path.isdir(WATCH_DIRECTORY):
        print(f"[!] Watch directory not found: {WATCH_DIRECTORY}")
        return

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
        print("\nStopping Watcher...")
        observer.stop()

    observer.join()


if __name__ == "__main__":
    start_file_watcher()
