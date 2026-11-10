import { useEffect, useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getAnalytics, type AnalyticsData } from "../../services/analytics";

const COLORS = ["#ff647c", "#f6bd60", "#4bdcff", "#55e6bd"];

export default function ThreatPieChart() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { getAnalytics().then(setAnalytics).catch(() => setFailed(true)); }, []);

  const data = useMemo(() => {
    if (!analytics) return [];
    const severity = analytics.severity as unknown as Record<string, number>;
    return ["Critical", "High", "Medium", "Low"].map((name) => ({
      name,
      value: Number(severity[name] ?? severity[name.toLowerCase()] ?? 0),
    }));
  }, [analytics]);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return <section className="tf-section p-5">
    <div className="mb-3"><p className="tf-eyebrow">Severity mix</p><h2 className="mt-1 text-sm font-extrabold text-white">Alert distribution</h2><p className="mt-1 text-[10px] text-slate-500">Severity counts returned by the analytics API.</p></div>
    {analytics ? <div className="grid items-center gap-2 sm:grid-cols-[1fr_1fr]">
      <div className="relative h-56"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} paddingAngle={3}>{data.map((item, index) => <Cell key={item.name} fill={COLORS[index]} stroke="transparent" />)}</Pie><Tooltip contentStyle={{ background: "#0b1422", border: "1px solid rgba(148,163,184,.2)", borderRadius: 12, color: "#fff", fontSize: 11 }} /></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><strong className="text-2xl font-extrabold text-white">{total}</strong><span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Alerts</span></div></div>
      <div className="space-y-4">{data.map((item, index) => <div key={item.name} className="flex items-center gap-3"><span className="h-2 w-2 rounded-full" style={{ background: COLORS[index] }}/><div className="min-w-0 flex-1"><div className="flex justify-between gap-3 text-[10px]"><span className="text-slate-400">{item.name}</span><span className="font-extrabold text-slate-200">{item.value}</span></div><div className="tf-progress mt-1.5 !h-1"><span style={{ width: `${total ? item.value / total * 100 : 0}%`, background: COLORS[index] }}/></div></div></div>)}</div>
    </div> : <div className="grid h-56 place-items-center text-xs text-slate-500">{failed ? "Analytics endpoint is unavailable." : "Loading severity data…"}</div>}
  </section>;
}
