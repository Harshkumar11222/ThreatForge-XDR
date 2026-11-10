import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getAnalytics, type AnalyticsData } from "../../services/analytics";

export default function ThreatChart() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { getAnalytics().then(setAnalytics).catch(() => setFailed(true)); }, []);
  const values = analytics?.monthly_attacks ?? [];
  const data = values.map((threats, index) => ({ period: `P${index + 1}`, threats }));

  return <section className="tf-section p-5">
    <div className="mb-4 flex items-start justify-between gap-3"><div><p className="tf-eyebrow">Activity / trend</p><h2 className="mt-1 text-sm font-extrabold text-white">Threat activity</h2><p className="mt-1 text-[10px] text-slate-500">Values returned by the analytics API.</p></div><span className="tf-chip">RECORDED DATA</span></div>
    <div className="h-[270px]">
      {analytics ? (data.length ? <ResponsiveContainer width="100%" height="100%"><LineChart data={data} margin={{ top: 12, right: 10, bottom: 0, left: -18 }}><CartesianGrid stroke="rgba(148,163,184,.1)" strokeDasharray="4 6" vertical={false}/><XAxis dataKey="period" stroke="#71829a" tickLine={false} axisLine={false} tick={{ fontSize: 10 }}/><YAxis stroke="#71829a" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} allowDecimals={false}/><Tooltip contentStyle={{ background: "#0b1422", border: "1px solid rgba(148,163,184,.22)", borderRadius: 12, color: "#fff", fontSize: 11 }}/><Line type="monotone" dataKey="threats" name="Threats" stroke="#4bdcff" strokeWidth={2.5} dot={{ r: 3, fill: "#4bdcff", strokeWidth: 0 }} activeDot={{ r: 5, fill: "#55e6bd" }}/></LineChart></ResponsiveContainer> : <div className="grid h-full place-items-center text-xs text-slate-500">No trend values returned.</div>) : <div className="grid h-full place-items-center text-xs text-slate-500">{failed ? "Analytics endpoint is unavailable." : "Loading trend data…"}</div>}
    </div>
  </section>;
}
