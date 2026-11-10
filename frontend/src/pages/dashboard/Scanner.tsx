
import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileText,
  FileUp,
  FolderUp,
  LoaderCircle,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";

import {
  MAX_UPLOAD_BYTES,
  getRelativeFilePath,
  getUploadStatus,
  uploadFilesInChunks,
  type UploadManifestFile,
  type UploadProgress,
} from "../../services/uploads";

const MAX_FILES = 10000;

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
}

function getStatusClass(status: string): string {
  const value = status.toLowerCase();

  if (value === "clean") return "clean";
  if (value === "suspicious") return "suspicious";
  if (value === "malicious") return "malicious";
  if (value.includes("error") || value === "failed") return "error";
  if (value === "scanning" || value === "uploading") return "active";

  return "pending";
}

function StatusIcon({ status }: { status: string }) {
  const value = status.toLowerCase();

  if (value === "clean") return <ShieldCheck size={18} />;
  if (value === "suspicious") return <ShieldAlert size={18} />;
  if (value === "malicious") return <ShieldX size={18} />;
  if (value.includes("error")) return <AlertTriangle size={18} />;
  if (value === "scanning") return <LoaderCircle size={18} className="tf-spin" />;

  return <Clock3 size={18} />;
}

export default function Scanner() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress>({
    uploadedBytes: 0,
    totalBytes: 0,
    currentFile: "",
  });

  const [jobId, setJobId] = useState("");
  const [jobStatus, setJobStatus] = useState("idle");
  const [scanFiles, setScanFiles] = useState<UploadManifestFile[]>([]);

  const totalBytes = useMemo(
    () => selectedFiles.reduce((sum, file) => sum + file.size, 0),
    [selectedFiles]
  );

  const uploadPercentage =
    progress.totalBytes > 0
      ? Math.min(
          100,
          Math.round((progress.uploadedBytes / progress.totalBytes) * 100)
        )
      : 0;

  const resultCounts = useMemo(() => {
    return {
      clean: scanFiles.filter((file) => file.status === "Clean").length,
      suspicious: scanFiles.filter((file) => file.status === "Suspicious").length,
      malicious: scanFiles.filter((file) => file.status === "Malicious").length,
      errors: scanFiles.filter(
        (file) =>
          file.status === "Scan Error" || file.status === "Not Scanned"
      ).length,
    };
  }, [scanFiles]);

  function addFiles(incoming: File[]) {
    setError("");

    if (!incoming.length) return;

    const combined = [...selectedFiles, ...incoming];

    const unique = new Map<string, File>();

    for (const file of combined) {
      const key = `${getRelativeFilePath(file)}:${file.size}:${file.lastModified}`;
      unique.set(key, file);
    }

    const nextFiles = Array.from(unique.values());

    if (nextFiles.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES.toLocaleString()} files are allowed.`);
      return;
    }

    const combinedSize = nextFiles.reduce(
      (sum, file) => sum + file.size,
      0
    );

    setSelectedFiles(nextFiles);

    if (combinedSize > MAX_UPLOAD_BYTES) {
      setError("Combined upload size exceeds the 12 GB limit.");
    }
  }

  function handleFileSelection(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const incoming = Array.from(event.target.files ?? []);
    addFiles(incoming);

    // Allow selecting the same file again later.
    event.target.value = "";
  }

  function chooseFiles() {
    fileInputRef.current?.click();
  }

  function chooseFolder() {
    const input = folderInputRef.current;

    if (!input) return;

    // Chromium-based browsers support directory selection.
    input.setAttribute("webkitdirectory", "");
    input.setAttribute("directory", "");
    input.click();
  }

  function removeFile(index: number) {
    setSelectedFiles((current) =>
      current.filter((_, fileIndex) => fileIndex !== index)
    );
    setError("");
  }

  function clearSelection() {
    setSelectedFiles([]);
    setError("");
    setProgress({
      uploadedBytes: 0,
      totalBytes: 0,
      currentFile: "",
    });
    setScanFiles([]);
    setJobId("");
    setJobStatus("idle");
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    addFiles(Array.from(event.dataTransfer.files));
  }

  async function refreshResults(id = jobId) {
    if (!id) return;

    try {
      const response = await getUploadStatus(id);
      setJobStatus(response.status);
      setScanFiles(response.files ?? []);
    } catch {
      setError("Unable to refresh scan status. Check backend connection.");
    }
  }

  async function waitForScan(id: string) {
    // Poll for up to 10 minutes. User can refresh again afterwards.
    for (let attempt = 0; attempt < 300; attempt += 1) {
      const response = await getUploadStatus(id);

      setJobStatus(response.status);
      setScanFiles(response.files ?? []);

      if (
        response.status === "completed" ||
        response.status === "failed"
      ) {
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    setError(
      "Scanning is still running. Use Refresh Results to check its progress."
    );
  }

  async function startUpload() {
    if (!selectedFiles.length) {
      setError("Select at least one file or folder first.");
      return;
    }

    if (totalBytes > MAX_UPLOAD_BYTES) {
      setError("Combined upload size must not exceed 12 GB.");
      return;
    }

    setError("");
    setUploading(true);
    setProgress({
      uploadedBytes: 0,
      totalBytes,
      currentFile: "Preparing upload",
    });

    setScanFiles([]);
    setJobId("");
    setJobStatus("uploading");

    try {
      const result = await uploadFilesInChunks(
        selectedFiles,
        (nextProgress) => setProgress(nextProgress)
      );

      setJobId(result.jobId);
      setJobStatus(result.status);

      // The finalize endpoint starts background malware scanning.
      await waitForScan(result.jobId);
    } catch (err: any) {
      const detail =
        err?.response?.data?.detail ||
        err?.message ||
        "Upload failed. Please retry.";

      setError(
        typeof detail === "string"
          ? detail
          : JSON.stringify(detail)
      );

      if (jobId) {
        await refreshResults(jobId);
      }
    } finally {
      setUploading(false);
    }
  }

  const isScanning =
    jobStatus === "scanning" || jobStatus === "uploading";

  return (
    <main className="tf-scanner-page">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="tf-visually-hidden"
        onChange={handleFileSelection}
      />

      <input
        ref={folderInputRef}
        type="file"
        multiple
        className="tf-visually-hidden"
        onChange={handleFileSelection}
      />

      <header className="tf-scanner-header">
        <div>
          <div className="tf-eyebrow">
            THREATFORGE XDR / SECURITY OPERATIONS
          </div>

          <h1 className="tf-title">File Scanner</h1>

          <p className="tf-subtitle">
            Upload files or complete folders. ThreatForge will calculate
            SHA-256 hashes and inspect files with configured ClamAV and
            YARA detection rules.
          </p>
        </div>

        <div className="tf-scanner-status">
          <span className="tf-status-dot" />
          SCANNING ENGINE
        </div>
      </header>

      <section className="tf-upload-limit">
        <div className="tf-limit-icon">
          <ShieldCheck size={25} />
        </div>

        <div className="tf-limit-copy">
          <strong>12 GB combined upload limit</strong>
          <span>
            The limit applies to all selected files together, not individually.
          </span>
        </div>

        <div className="tf-limit-value">
          {formatBytes(totalBytes)} / 12 GB
        </div>
      </section>

      <section className="tf-upload-panel">
        <div className="tf-panel-heading">
          <div>
            <h2>Upload files for analysis</h2>
            <p>Select individual files or an entire folder.</p>
          </div>

          <span className="tf-chip">
            {selectedFiles.length} FILES SELECTED
          </span>
        </div>

        <div className="tf-upload-choices">
          <button
            type="button"
            className="tf-upload-choice"
            onClick={chooseFiles}
            disabled={uploading}
          >
            <span className="tf-upload-choice-icon">
              <FileUp size={29} />
            </span>

            <span className="tf-upload-choice-copy">
              <strong>Upload Files</strong>
              <small>Select one or multiple files from your computer.</small>
              <em>Browse files →</em>
            </span>
          </button>

          <button
            type="button"
            className="tf-upload-choice tf-upload-choice-folder"
            onClick={chooseFolder}
            disabled={uploading}
          >
            <span className="tf-upload-choice-icon">
              <FolderUp size={29} />
            </span>

            <span className="tf-upload-choice-copy">
              <strong>Upload Folder</strong>
              <small>Select a complete folder with its subfolders.</small>
              <em>Browse folder →</em>
            </span>
          </button>
        </div>

        <div
          className={`tf-dropzone-large ${dragging ? "is-dragging" : ""}`}
          onDragEnter={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setDragging(false);
            }
          }}
          onDrop={handleDrop}
        >
          <UploadCloud size={43} />
          <strong>Drag and drop files here</strong>
          <span>Or use the Upload Files / Upload Folder buttons above.</span>
          <small>Maximum combined size: 12 GB</small>
        </div>

        {error && (
          <div className="tf-scanner-error" role="alert">
            <AlertTriangle size={19} />
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {selectedFiles.length > 0 && (
          <div className="tf-selected-files">
            <div className="tf-panel-heading">
              <div>
                <h3>Selected files</h3>
                <p>
                  {selectedFiles.length} files · {formatBytes(totalBytes)}
                </p>
              </div>

              <button
                type="button"
                className="tf-text-button"
                onClick={clearSelection}
                disabled={uploading}
              >
                <Trash2 size={16} />
                Clear all
              </button>
            </div>

            <div className="tf-file-list">
              {selectedFiles.map((file, index) => (
                <div
                  className="tf-file-row"
                  key={`${getRelativeFilePath(file)}-${file.lastModified}-${index}`}
                >
                  <div className="tf-file-icon">
                    <FileText size={20} />
                  </div>

                  <div className="tf-file-info">
                    <strong>{file.name}</strong>
                    <span>{getRelativeFilePath(file)}</span>
                  </div>

                  <span className="tf-file-size">
                    {formatBytes(file.size)}
                  </span>

                  <button
                    type="button"
                    className="tf-icon-button"
                    onClick={() => removeFile(index)}
                    disabled={uploading}
                    aria-label={`Remove ${file.name}`}
                  >
                    <X size={17} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="tf-upload-footer">
          <div className="tf-upload-footer-info">
            <ShieldCheck size={18} />
            <span>Files are stored privately for scanning.</span>
          </div>

          <button
            type="button"
            className="tf-primary-button"
            onClick={startUpload}
            disabled={
              uploading ||
              selectedFiles.length === 0 ||
              totalBytes > MAX_UPLOAD_BYTES
            }
          >
            {uploading ? (
              <>
                <LoaderCircle size={19} className="tf-spin" />
                Processing...
              </>
            ) : (
              <>
                <ScanSearchFallback />
                Upload & Scan
              </>
            )}
          </button>
        </div>
      </section>

      {(uploading || jobId) && (
        <section className="tf-upload-panel tf-progress-panel">
          <div className="tf-panel-heading">
            <div>
              <h2>Scan activity</h2>
              <p>
                {jobId ? `Job ID: ${jobId}` : "Preparing your upload"}
              </p>
            </div>

            <span className={`tf-status-badge ${getStatusClass(jobStatus)}`}>
              {jobStatus.toUpperCase()}
            </span>
          </div>

          <div className="tf-progress-track">
            <div
              className="tf-progress-fill"
              style={{
                width: `${uploadPercentage}%`,
              }}
            />
          </div>

          <div className="tf-progress-labels">
            <span>{formatBytes(progress.uploadedBytes)} uploaded</span>
            <strong>{uploadPercentage}%</strong>
            <span>{formatBytes(progress.totalBytes)} total</span>
          </div>

          {progress.currentFile && (
            <p className="tf-current-file">
              Current file: {progress.currentFile}
            </p>
          )}

          {jobId && (
            <button
              type="button"
              className="tf-secondary-button"
              onClick={() => refreshResults()}
              disabled={uploading}
            >
              <RefreshCw size={17} />
              Refresh Results
            </button>
          )}
        </section>
      )}

      {scanFiles.length > 0 && (
        <section className="tf-upload-panel">
          <div className="tf-panel-heading">
            <div>
              <h2>Security scan results</h2>
              <p>File-level results returned by the backend.</p>
            </div>

            <Activity size={24} className="tf-result-icon" />
          </div>

          <div className="tf-result-grid">
            <div className="tf-result-card clean">
              <ShieldCheck size={22} />
              <span>Clean</span>
              <strong>{resultCounts.clean}</strong>
            </div>

            <div className="tf-result-card suspicious">
              <ShieldAlert size={22} />
              <span>Suspicious</span>
              <strong>{resultCounts.suspicious}</strong>
            </div>

            <div className="tf-result-card malicious">
              <ShieldX size={22} />
              <span>Malicious</span>
              <strong>{resultCounts.malicious}</strong>
            </div>

            <div className="tf-result-card error">
              <AlertTriangle size={22} />
              <span>Error / Not scanned</span>
              <strong>{resultCounts.errors}</strong>
            </div>
          </div>

          <div className="tf-file-list">
            {scanFiles.map((file) => (
              <div className="tf-result-row" key={file.file_id}>
                <div className={`tf-result-status ${getStatusClass(file.status)}`}>
                  <StatusIcon status={file.status} />
                </div>

                <div className="tf-file-info">
                  <strong>{file.relative_path}</strong>
                  <span>
                    {formatBytes(file.size_bytes)}
                    {file.sha256 ? ` · SHA-256: ${file.sha256}` : ""}
                  </span>
                </div>

                <span
                  className={`tf-status-badge ${getStatusClass(file.status)}`}
                >
                  {file.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {jobStatus === "completed" && (
        <div className="tf-completion-note">
          <CheckCircle2 size={19} />
          Scan processing has finished. Review each file's individual result.
        </div>
      )}

      {jobStatus === "failed" && (
        <div className="tf-scanner-error">
          <AlertTriangle size={19} />
          Scan job failed. Check the backend logs before retrying.
        </div>
      )}

      {isScanning && !uploading && (
        <div className="tf-scanning-note">
          <LoaderCircle size={18} className="tf-spin" />
          Malware analysis is running in the backend.
        </div>
      )}
    </main>
  );
}

function ScanSearchFallback() {
  return <FileUp size={19} />;
}
