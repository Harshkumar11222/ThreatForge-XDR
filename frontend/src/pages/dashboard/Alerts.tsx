import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, FileSearch, RefreshCw, Search, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { getAlerts, type Alert } from "../../services/alerts";

function severityClass(severity: string) {
  switch (severity.toLowerCase()) {
    case "critical": return "tf-severity-critical";
    case "high": return "tf-severity-high";
    case "medium": return "tf-severity-medium";
    default: return "tf-severity-low";
  }
}

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("all");

  async function refresh() {
    setLoading(true);
    setFailed(false);
    try { setAlerts(await getAlerts()); }
    catch { setFailed(true); }
    finally { setLoading(false); }
  }

  useEffect(() => { void refresh(); }, []);

  const filtered = useMemo(() => alerts.filter((alert) => {
    const text = `${alert.threat} ${alert.file_name || ""} ${alert.source} ${alert.status}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (severity === "all" || alert.severity.toLowerCase() === severity);
  }), [alerts, search, severity]);

  const activeCount = alerts.filter((alert) => alert.status.toLowerCase() !== "resolved").length;
  const criticalCount = alerts.filter((alert) => alert.severity.toLowerCase() === "critical").length;

  return <div className="space-y-6">
    <div className="tf-page-head"><div><p className="tf-eyebrow">Detection / event triage</p><h1 className="tf-title mt-2">Security alerts</h1><p className="tf-subtitle mt-2">Review findings recorded by the current backend services.</p></div><div className="flex gap-2"><button className="tf-button-secondary" onClick={() => void refresh()} disabled={loading}><RefreshCw size={14} className={loading ? "animate-spin" : ""}/> Refresh</button><Link to="/scanner" className="tf-button"><FileSearch size={14}/> Inspect a file</Link></div></div>

    <div className="grid gap-3 sm:grid-cols-3"><div className="tf-kpi p-4"><p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">Total alerts</p><p className="mt-2 text-3xl font-extrabold text-white">{loading ? "…" : alerts.length}</p><p className="mt-1 text-[10px] text-slate-500">Returned by alerts API</p></div><div className="tf-kpi p-4"><p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">Unresolved</p><p className="mt-2 text-3xl font-extrabold text-amber-200">{loading ? "…" : activeCount}</p><p className="mt-1 text-[10px] text-slate-500">Status is not Resolved</p></div><div className="tf-kpi p-4"><p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">Critical severity</p><p className="mt-2 text-3xl font-extrabold text-rose-200">{loading ? "…" : criticalCount}</p><p className="mt-1 text-[10px] text-slate-500">Requires analyst review</p></div></div>

    <section className="tf-section overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-slate-700/50 p-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-sm font-extrabold text-white">Alert queue</h2><p className="mt-1 text-[10px] text-slate-500">{filtered.length} matching records</p></div><div className="flex flex-col gap-2 sm:flex-row"><label className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"/><input className="tf-input !min-h-[36px] !w-full !pl-9 sm:!w-64" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search threat or file"/></label><select className="tf-input !min-h-[36px] sm:!w-40" value={severity} onChange={(event) => setSeverity(event.target.value)}><option value="all">All severities</option><option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></div></div>
      <div className="overflow-x-auto"><table className="tf-table min-w-[780px]"><thead><tr><th>Finding</th><th>File / source</th><th>Risk</th><th>Severity</th><th>Status</th><th>Created</th></tr></thead><tbody>
        {loading && <tr><td colSpan={6} className="py-12 text-center text-slate-500">Loading alert records…</td></tr>}
        {!loading && failed && <tr><td colSpan={6} className="py-12 text-center text-rose-200">Could not load alerts. Check API availability and your sign-in session.</td></tr>}
        {!loading && !failed && filtered.map((alert) => <tr key={alert.id}><td><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-rose-300/10 text-rose-200"><ShieldAlert size={15}/></span><div><p className="font-bold text-slate-100">{alert.threat}</p><p className="mt-1 text-[9px] text-slate-600">#{alert.id}</p></div></div></td><td><p className="max-w-[220px] truncate text-slate-300">{alert.file_name || alert.source || "—"}</p><p className="mt-1 max-w-[220px] truncate text-[9px] text-slate-600">{alert.file_path || alert.source}</p></td><td className="tf-mono font-bold">{alert.risk_score ?? 0}</td><td><span className={`rounded-md px-2 py-1 text-[9px] font-extrabold ${severityClass(alert.severity)}`}>{alert.severity}</span></td><td><span className="text-[10px] font-bold text-slate-300">{alert.status}</span></td><td className="text-[10px] text-slate-500">{alert.created_at ? new Date(alert.created_at).toLocaleString() : "—"}</td></tr>)}
        {!loading && !failed && filtered.length === 0 && <tr><td colSpan={6} className="py-12 text-center"><AlertTriangle size={20} className="mx-auto text-slate-600"/><p className="mt-2 text-xs text-slate-500">No alert records match this filter.</p></td></tr>}
      </tbody></table></div>
    </section>
  </div>;
}
