import { useEffect, useState } from "react";
import { Globe2, ShieldAlert } from "lucide-react";
import { getTopIPs, type TopIP } from "../../services/analytics";

export default function TopAttackingIPs() {
  const [ips, setIps] = useState<TopIP[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => { getTopIPs().then(setIps).catch(() => setFailed(true)).finally(() => setLoading(false)); }, []);

  return <section className="tf-section p-5">
    <div className="mb-5 flex items-center gap-3"><span className="tf-feature-icon !h-9 !w-9"><Globe2 size={16}/></span><div><h2 className="text-sm font-extrabold text-white">Top source IPs</h2><p className="mt-1 text-[10px] text-slate-500">Ranked by the analytics endpoint</p></div></div>
    {loading ? <p className="py-6 text-center text-xs text-slate-500">Loading IP records…</p> : failed ? <p className="py-6 text-center text-xs text-rose-200">Top IP endpoint is unavailable.</p> : ips.length === 0 ? <div className="py-6 text-center"><ShieldAlert size={20} className="mx-auto text-slate-600"/><p className="mt-2 text-xs text-slate-500">No IP activity recorded.</p></div> : <div className="space-y-2">{ips.slice(0, 6).map((item, index) => <div key={`${item.ip}-${index}`} className="flex items-center gap-3 rounded-xl border border-slate-700/45 bg-slate-950/25 px-3 py-3"><span className="tf-mono grid h-7 w-7 place-items-center rounded-lg bg-slate-800 text-[10px] text-slate-400">{String(index + 1).padStart(2, "0")}</span><span className="tf-mono min-w-0 flex-1 truncate text-[11px] text-slate-200">{item.ip}</span><span className="text-[10px] font-extrabold text-rose-200">{item.attacks} hits</span></div>)}</div>}
  </section>;
}
