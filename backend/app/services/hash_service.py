
import hashlib
from pathlib import Path


def calculate_sha256(
    file_path: str,
    chunk_size: int = 1024 * 1024,
) -> str:
    """
    Calculate SHA-256 hash using streaming.
    Large files are processed without loading
    the entire file into memory.
    """

    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {path}")

    if not path.is_file():
        raise ValueError("Path must point to a file.")

    if chunk_size <= 0:
        raise ValueError("Chunk size must be positive.")

    sha256 = hashlib.sha256()

    with path.open("rb") as file:
        while True:
            chunk = file.read(chunk_size)

            if not chunk:
                break

            sha256.update(chunk)

    return sha256.hexdigest()
