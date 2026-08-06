import os

SUSPICIOUS_EXTENSIONS = {
    ".exe": ("Executable File", "Critical", 95),
    ".dll": ("Dynamic Library", "High", 90),
    ".bat": ("Batch Script", "High", 85),
    ".cmd": ("Command Script", "High", 85),
    ".ps1": ("PowerShell Script", "Critical", 95),
    ".vbs": ("VBScript", "Critical", 90),
    ".js": ("JavaScript Script", "Medium", 70),
    ".jar": ("Java Archive", "Medium", 70),
    ".scr": ("Screen Saver Executable", "Critical", 95),
    ".msi": ("Windows Installer", "Medium", 60),

    ".zip": ("Compressed Archive", "Low", 20),
    ".rar": ("Compressed Archive", "Low", 20),
    ".7z": ("Compressed Archive", "Low", 20),

    ".docm": ("Office Macro", "High", 85),
    ".xlsm": ("Office Macro", "High", 85),
    ".pptm": ("Office Macro", "High", 85),

    ".locked": ("Possible Ransomware", "Critical", 100),
    ".encrypted": ("Possible Ransomware", "Critical", 100),
    ".crypted": ("Possible Ransomware", "Critical", 100),
}


def analyze_file(path: str):

    ext = os.path.splitext(path)[1].lower()

    if ext in SUSPICIOUS_EXTENSIONS:

        threat, severity, score = SUSPICIOUS_EXTENSIONS[ext]

        return {
            "detected": True,
            "threat": threat,
            "severity": severity,
            "risk_score": score,
        }

    return {
        "detected": False
    }