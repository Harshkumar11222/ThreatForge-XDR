import { BarChart3, Info } from "lucide-react";
import ThreatChart from "../../components/dashboard/ThreatChart";
import ThreatPieChart from "../../components/dashboard/ThreatPieChart";
import TopAttackingIPs from "../../components/dashboard/TopAttackingIPs";

export default function Analytics() {
  return <div className="space-y-6">
    <div className="tf-page-head"><div><p className="tf-eyebrow">Intelligence / metrics</p><h1 className="tf-title mt-2">Security analytics</h1><p className="tf-subtitle mt-2">Explore trend and severity data returned by the analytics endpoints.</p></div><span className="tf-chip"><BarChart3 size={13} className="text-cyan-200"/> API-backed view</span></div>
    <div className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]"><ThreatChart/><ThreatPieChart/></div>
    <TopAttackingIPs />
    <div className="flex gap-3 rounded-xl border border-cyan-300/10 bg-cyan-300/[.035] p-4"><Info size={15} className="mt-0.5 flex-none text-cyan-200"/><p className="text-[10px] leading-5 text-slate-400">Charts display the values currently returned by your backend. They are not independently inferred threat telemetry; missing API data is shown as unavailable rather than replaced with sample counts.</p></div>
  </div>;
}
