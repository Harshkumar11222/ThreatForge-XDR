import { useEffect, useMemo, useState } from "react";
import { Download, FileSpreadsheet, FileText, RefreshCw } from "lucide-react";
import { getAlerts, type Alert } from "../../services/alerts";
import { getScans, type Scan } from "../../services/scans";
import toast from "react-hot-toast";

function downloadCsv(alerts: Alert[]) {
  const columns = ["id", "threat", "severity", "risk_score", "file_name", "file_path", "source", "status", "created_at"] as const;
  const escapeCell = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const csv = [columns.join(","), ...alerts.map((alert) => columns.map((key) => escapeCell(alert[key])).join(","))].join("\r\n");
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `threatforge-alerts-${new Date().toISOString().slice(0, 10)}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  async function refresh() {
    setLoading(true); setLoadError(false);
    try {
      const [alertData, scanData] = await Promise.all([getAlerts(), getScans()]);
      setAlerts(alertData); setScans(scanData);
    } catch { setLoadError(true); }
    finally { setLoading(false); }
  }
  useEffect(() => { void refresh(); }, []);

  const critical = useMemo(() => alerts.filter((item) => item.severity.toLowerCase() === "critical").length, [alerts]);
  const high = useMemo(() => alerts.filter((item) => item.severity.toLowerCase() === "high").length, [alerts]);

  return <div className="space-y-6">
    <div className="tf-page-head"><div><p className="tf-eyebrow">Exports / evidence</p><h1 className="tf-title mt-2">Reports</h1><p className="tf-subtitle mt-2">Create a local CSV export from alert records currently available in the API.</p></div><button className="tf-button-secondary" onClick={() => void refresh()} disabled={loading}><RefreshCw size={14} className={loading ? "animate-spin" : ""}/> Refresh data</button></div>
    {loadError && <div className="rounded-xl border border-rose-300/20 bg-rose-300/[.05] p-4 text-xs text-rose-200">Report data could not be loaded. Confirm the backend is reachable and you are signed in.</div>}
    <div className="grid gap-3 sm:grid-cols-3"><div className="tf-kpi p-4"><p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">Alert records</p><p className="mt-2 text-3xl font-extrabold text-white">{loading ? "…" : alerts.length}</p></div><div className="tf-kpi p-4"><p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">Critical / High</p><p className="mt-2 text-3xl font-extrabold text-rose-200">{loading ? "…" : critical + high}</p><p className="mt-1 text-[10px] text-slate-500">{critical} critical · {high} high</p></div><div className="tf-kpi p-4"><p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">Legacy scan records</p><p className="mt-2 text-3xl font-extrabold text-cyan-200">{loading ? "…" : scans.length}</p></div></div>
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="tf-section p-6"><span className="tf-feature-icon"><FileSpreadsheet size={19}/></span><h2 className="mt-5 text-lg font-extrabold text-white">Alert register</h2><p className="mt-2 text-xs leading-6 text-slate-400">Export alert IDs, threat names, severity, risk scores, file references, sources and timestamps as a CSV file.</p><div className="mt-6 flex items-center justify-between border-t border-slate-700/50 pt-4"><span className="text-[10px] text-slate-500">{alerts.length} records ready</span><button onClick={() => { if (alerts.length) downloadCsv(alerts); else toast.error("No alert records available to export."); }} disabled={loading || alerts.length === 0} className="tf-button"><Download size={14}/> Export CSV</button></div></section>
      <section className="tf-section p-6"><span className="tf-feature-icon"><FileText size={19}/></span><h2 className="mt-5 text-lg font-extrabold text-white">Scan history</h2><p className="mt-2 text-xs leading-6 text-slate-400">Review the legacy scan history endpoint. A separate upload-job report can be added when the upload results API exposes full file-level scan details.</p><div className="mt-6 flex items-center justify-between border-t border-slate-700/50 pt-4"><span className="text-[10px] text-slate-500">{scans.length} scan records</span><span className="tf-chip">Read-only summary</span></div></section>
    </div>
  </div>;
}
