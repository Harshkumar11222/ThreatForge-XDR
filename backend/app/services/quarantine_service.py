import os
import shutil
from sqlalchemy.orm import Session
from app.models.quarantine import Quarantine  # <-- IMPORT YAHAN CHANGE HUA HAI

QUARANTINE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "quarantine"))

def quarantine_file(db: Session, file_path: str, threat: str):
    if not os.path.exists(QUARANTINE_DIR):
        os.makedirs(QUARANTINE_DIR)

    file_name = os.path.basename(file_path)
    quarantine_path = os.path.join(QUARANTINE_DIR, file_name)

    try:
        shutil.move(file_path, quarantine_path)

        db_quarantine = Quarantine(
            file_name=file_name,
            original_path=file_path,
            quarantine_path=quarantine_path,
            threat=threat,
        )
        db.add(db_quarantine)
        db.commit()
        db.refresh(db_quarantine)

        print(f"[+] File quarantined: {file_name}")
        return db_quarantine

    except Exception as e:
        print(f"[!] Error quarantining file: {e}")
        return None