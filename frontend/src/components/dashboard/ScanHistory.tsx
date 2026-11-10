import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import { getScans, type Scan } from "../../services/scans";

export default function ScanHistory() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => { getScans().then(setScans).catch(() => setFailed(true)).finally(() => setLoading(false)); }, []);

  return <section className="tf-section overflow-hidden">
    <div className="flex items-center gap-3 border-b border-slate-700/50 p-5"><span className="tf-feature-icon !h-9 !w-9"><Clock3 size={16}/></span><div><h2 className="text-sm font-extrabold text-white">Scan history</h2><p className="mt-1 text-[10px] text-slate-500">Records returned by the existing scans endpoint</p></div></div>
    <div className="overflow-x-auto"><table className="tf-table min-w-[420px]"><thead><tr><th>Scan ID</th><th>Threat count</th><th>Created</th></tr></thead><tbody>
      {loading && <tr><td colSpan={3} className="py-8 text-center text-slate-500">Loading scans…</td></tr>}
      {!loading && failed && <tr><td colSpan={3} className="py-8 text-center text-rose-200">Scan history endpoint is unavailable.</td></tr>}
      {!loading && !failed && scans.slice(0, 8).map((scan) => <tr key={scan.id}><td className="tf-mono text-slate-400">#{scan.id}</td><td className="font-bold text-slate-100">{scan.total_threats}</td><td className="text-[10px] text-slate-500">{new Date(scan.created_at).toLocaleString()}</td></tr>)}
      {!loading && !failed && scans.length === 0 && <tr><td colSpan={3} className="py-8 text-center text-slate-500">No scans recorded.</td></tr>}
    </tbody></table></div>
  </section>;
}
