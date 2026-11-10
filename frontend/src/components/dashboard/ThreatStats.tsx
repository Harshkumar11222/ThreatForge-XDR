import { useEffect, useState } from "react";
import { AlertTriangle, Fingerprint, Monitor, ShieldCheck } from "lucide-react";
import { getDashboardStats, type DashboardStats } from "../../services/dashboard";

export default function ThreatStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getDashboardStats().then(setStats).catch(() => setFailed(true));
  }, []);

  const cards = [
    { label: "Critical alerts", value: stats?.critical_alerts, note: "From dashboard API", icon: AlertTriangle, tone: "rose" },
    { label: "Protected devices", value: stats?.protected_devices, note: "Reported by backend", icon: Monitor, tone: "cyan" },
    { label: "Countries", value: stats?.countries, note: "Reported by backend", icon: ShieldCheck, tone: "emerald" },
    { label: "Inspection layers", value: "03", note: "SHA-256 · ClamAV · YARA", icon: Fingerprint, tone: "violet" },
  ];

  const toneClass: Record<string, string> = {
    rose: "bg-rose-300/10 text-rose-200 border-rose-300/15",
    cyan: "bg-cyan-300/10 text-cyan-200 border-cyan-300/15",
    emerald: "bg-emerald-300/10 text-emerald-200 border-emerald-300/15",
    violet: "bg-violet-300/10 text-violet-200 border-violet-300/15",
  };

  return <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
    {cards.map(({ label, value, note, icon: Icon, tone }) => <div key={label} className="tf-kpi p-4 sm:p-5">
      <div className="relative z-10 flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-slate-500">{label}</p><p className="mt-3 text-3xl font-extrabold tracking-tight text-white">{value === undefined ? (failed ? "—" : "…") : value}</p><p className="mt-2 text-[9px] text-slate-500">{note}</p></div><span className={`grid h-10 w-10 flex-none place-items-center rounded-xl border ${toneClass[tone]}`}><Icon size={18}/></span></div>
    </div>)}
  </div>;
}
