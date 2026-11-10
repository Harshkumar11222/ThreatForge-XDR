import { useEffect, useState } from "react";
import { ArrowUpRight, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { getAlerts, type Alert } from "../../services/alerts";

const severityClass = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "critical": return "tf-severity-critical";
    case "high": return "tf-severity-high";
    case "medium": return "tf-severity-medium";
    default: return "tf-severity-low";
  }
};

export default function RecentAlertsTable() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    const load = () => getAlerts().then((data) => { if (active) { setAlerts(data); setFailed(false); } }).catch(() => { if (active) setFailed(true); }).finally(() => { if (active) setLoading(false); });
    void load();
    const interval = window.setInterval(load, 15000);
    return () => { active = false; window.clearInterval(interval); };
  }, []);

  return <section className="tf-section overflow-hidden">
    <div className="flex items-center justify-between gap-3 border-b border-slate-700/50 p-5"><div className="flex items-center gap-3"><span className="tf-feature-icon !h-9 !w-9"><ShieldAlert size={16}/></span><div><h2 className="text-sm font-extrabold text-white">Recent alerts</h2><p className="mt-1 text-[10px] text-slate-500">Latest records from the alert endpoint</p></div></div><Link to="/alerts" className="inline-flex items-center gap-1 text-[10px] font-extrabold text-cyan-200 hover:text-white">View queue <ArrowUpRight size={13}/></Link></div>
    <div className="overflow-x-auto"><table className="tf-table min-w-[700px]"><thead><tr><th>Finding</th><th>File / source</th><th>Risk</th><th>Severity</th><th>Status</th></tr></thead><tbody>
      {loading && <tr><td colSpan={5} className="py-10 text-center text-slate-500">Loading alert records…</td></tr>}
      {!loading && failed && <tr><td colSpan={5} className="py-10 text-center text-rose-200">Alert endpoint is unavailable.</td></tr>}
      {!loading && !failed && alerts.slice(0, 7).map((alert) => <tr key={alert.id}><td><p className="font-bold text-slate-100">{alert.threat}</p><p className="mt-1 text-[9px] text-slate-600">#{alert.id}</p></td><td className="max-w-[190px] truncate">{alert.file_name || alert.source || "—"}</td><td className="tf-mono font-bold">{alert.risk_score ?? 0}</td><td><span className={`rounded-md px-2 py-1 text-[9px] font-extrabold ${severityClass(alert.severity)}`}>{alert.severity}</span></td><td className="text-[10px]">{alert.status}</td></tr>)}
      {!loading && !failed && alerts.length === 0 && <tr><td colSpan={5} className="py-10 text-center text-slate-500">No alert records available yet.</td></tr>}
    </tbody></table></div>
  </section>;
}
