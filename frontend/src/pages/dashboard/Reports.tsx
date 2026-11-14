
import { useEffect, useMemo, useState } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  RefreshCw,
} from "lucide-react";
import { getAlerts, type Alert } from "../../services/alerts";
import { getScans, type Scan } from "../../services/scans";
import toast from "react-hot-toast";

function escapeCell(value: unknown) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function downloadCsv(alerts: Alert[]) {
  const columns = [
    "id",
    "threat",
    "severity",
    "risk_score",
    "file_name",
    "file_path",
    "source",
    "status",
    "created_at",
  ] as const;

  const csv = [
    columns.join(","),
    ...alerts.map((alert) =>
      columns.map((key) => escapeCell(alert[key])).join(",")
    ),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF", csv], {
    type: "text/csv;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = `threatforge-alerts-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  anchor.click();
  URL.revokeObjectURL(url);
}

function downloadScanCsv(scans: Scan[]) {
  const columns = [
    "job_id",
    "job_status",
    "job_created_at",
    "total_files",
    "scanned_files",
    "clean_files",
    "suspicious_files",
    "malicious_files",
    "error_files",
    "file_path",
    "file_size_bytes",
    "file_status",
    "sha256",
    "clamav_result",
    "yara_status",
    "yara_matches",
    "threat_name",
    "severity",
    "error_message",
    "scanned_at",
  ];

  const rows = scans.flatMap((scan) =>
    scan.files.map((file) => [
      scan.job_id,
      scan.status,
      scan.created_at,
      scan.total_files,
      scan.scanned_files,
      scan.clean_files,
      scan.suspicious_files,
      scan.malicious_files,
      scan.error_files,
      file.relative_path,
      file.size_bytes,
      file.status,
      file.sha256,
      file.clamav_result,
      file.yara_status,
      file.yara_matches,
      file.threat_name,
      file.severity,
      file.error_message,
      file.scanned_at,
    ])
  );

  const csv = [
    columns.join(","),
    ...rows.map((row) => row.map(escapeCell).join(",")),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF", csv], {
    type: "text/csv;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = `threatforge-scan-report-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  anchor.click();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  async function refresh() {
    setLoading(true);
    setLoadError(false);

    try {
      const [alertData, scanData] = await Promise.all([
        getAlerts(),
        getScans(),
      ]);

      setAlerts(alertData);
      setScans(scanData);
    } catch {
      setLoadError(true);
      toast.error("Could not load report data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  const critical = useMemo(
    () =>
      alerts.filter(
        (item) => item.severity.toLowerCase() === "critical"
      ).length,
    [alerts]
  );

  const high = useMemo(
    () =>
      alerts.filter(
        (item) => item.severity.toLowerCase() === "high"
      ).length,
    [alerts]
  );

  const totalFiles = scans.reduce(
    (total, scan) => total + scan.total_files,
    0
  );

  const maliciousFiles = scans.reduce(
    (total, scan) => total + scan.malicious_files,
    0
  );

  const suspiciousFiles = scans.reduce(
    (total, scan) => total + scan.suspicious_files,
    0
  );

  const availableFiles = scans.reduce(
    (total, scan) => total + scan.files.length,
    0
  );

  return (
    <div className="space-y-6">
      <div className="tf-page-head">
        <div>
          <p className="tf-eyebrow">Exports / evidence</p>
          <h1 className="tf-title mt-2">Reports</h1>
          <p className="tf-subtitle mt-2">
            Generate downloadable reports from alerts and file scan records.
          </p>
        </div>

        <button
          className="tf-button-secondary"
          onClick={() => void refresh()}
          disabled={loading}
        >
          <RefreshCw
            size={14}
            className={loading ? "animate-spin" : ""}
          />
          Refresh data
        </button>
      </div>

      {loadError && (
        <div className="rounded-xl border border-rose-300/20 bg-rose-300/[.05] p-4 text-xs text-rose-200">
          Report data could not be loaded. Confirm the backend is reachable
          and you are signed in.
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="tf-kpi p-4">
          <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
            Alert records
          </p>
          <p className="mt-2 text-3xl font-extrabold text-white">
            {loading ? "—" : alerts.length}
          </p>
        </div>

        <div className="tf-kpi p-4">
          <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
            Critical / High
          </p>
          <p className="mt-2 text-3xl font-extrabold text-rose-200">
            {loading ? "—" : critical + high}
          </p>
          <p className="mt-1 text-[10px] text-slate-500">
            {critical} critical · {high} high
          </p>
        </div>

        <div className="tf-kpi p-4">
          <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
            Uploaded files
          </p>
          <p className="mt-2 text-3xl font-extrabold text-cyan-200">
            {loading ? "—" : totalFiles}
          </p>
          <p className="mt-1 text-[10px] text-slate-500">
            {scans.length} scan jobs
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="tf-section p-6">
          <span className="tf-feature-icon">
            <FileSpreadsheet size={19} />
          </span>

          <h2 className="mt-5 text-lg font-extrabold text-white">
            Alert register
          </h2>

          <p className="mt-2 text-xs leading-6 text-slate-400">
            Export alert IDs, threat names, severity, risk scores, file
            references, sources and timestamps as a CSV file.
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-slate-700/50 pt-4">
            <span className="text-[10px] text-slate-500">
              {alerts.length} records ready
            </span>

            <button
              onClick={() => {
                if (alerts.length) {
                  downloadCsv(alerts);
                  toast.success("Alert CSV exported.");
                } else {
                  toast.error("No alert records available to export.");
                }
              }}
              disabled={loading || alerts.length === 0}
              className="tf-button"
            >
              <Download size={14} />
              Export CSV
            </button>
          </div>
        </section>

        <section className="tf-section p-6">
          <span className="tf-feature-icon">
            <FileText size={19} />
          </span>

          <h2 className="mt-5 text-lg font-extrabold text-white">
            Detailed scan report
          </h2>

          <p className="mt-2 text-xs leading-6 text-slate-400">
            Export upload-job summaries and file-level scan results,
            including SHA-256 hashes, ClamAV results, YARA matches,
            threat names and severity.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-slate-800/50 p-3">
              <p className="text-[9px] uppercase text-slate-500">Malicious</p>
              <p className="mt-1 text-lg font-bold text-rose-300">
                {maliciousFiles}
              </p>
            </div>

            <div className="rounded-lg bg-slate-800/50 p-3">
              <p className="text-[9px] uppercase text-slate-500">Suspicious</p>
              <p className="mt-1 text-lg font-bold text-amber-300">
                {suspiciousFiles}
              </p>
            </div>

            <div className="rounded-lg bg-slate-800/50 p-3">
              <p className="text-[9px] uppercase text-slate-500">Files</p>
              <p className="mt-1 text-lg font-bold text-cyan-300">
                {availableFiles}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-700/50 pt-4">
            <span className="text-[10px] text-slate-500">
              {availableFiles} file records ready
            </span>

            <button
              onClick={() => {
                if (availableFiles > 0) {
                  downloadScanCsv(scans);
                  toast.success("Detailed scan report exported.");
                } else {
                  toast.error("No file-level scan records available.");
                }
              }}
              disabled={loading || availableFiles === 0}
              className="tf-button"
            >
              <Download size={14} />
              Export Scan CSV
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
