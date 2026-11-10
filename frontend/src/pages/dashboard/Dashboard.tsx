import { ArrowUpRight, FileSearch, Fingerprint, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import ThreatStats from "../../components/dashboard/ThreatStats";
import ThreatChart from "../../components/dashboard/ThreatChart";
import ThreatPieChart from "../../components/dashboard/ThreatPieChart";
import RecentAlertsTable from "../../components/dashboard/RecentAlertsTable";
import ScanHistory from "../../components/dashboard/ScanHistory";
import TopAttackingIPs from "../../components/dashboard/TopAttackingIPs";

export default function Dashboard() {
  return <div className="space-y-6">
    <div className="tf-page-head">
      <div><p className="tf-eyebrow">Security operations / overview</p><h1 className="tf-title mt-2">Operations overview</h1><p className="tf-subtitle mt-2 max-w-2xl">A single view of alert activity, scan history and the current file-inspection workflow.</p></div>
      <Link to="/scanner" className="tf-button"><FileSearch size={15}/> Start file inspection <ArrowUpRight size={14}/></Link>
    </div>

    <div className="flex flex-wrap gap-2"><span className="tf-chip"><ShieldCheck size={12} className="text-emerald-300"/> Analyst workspace</span><span className="tf-chip"><Fingerprint size={12} className="text-cyan-300"/> SHA-256 identity</span><span className="tf-chip">ClamAV + configured YARA</span></div>
    <ThreatStats />

    <div className="grid gap-4 xl:grid-cols-[1.4fr_.9fr]">
      <ThreatChart />
      <ThreatPieChart />
    </div>

    <RecentAlertsTable />

    <div className="grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
      <ScanHistory />
      <TopAttackingIPs />
    </div>

    <section className="tf-section p-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="tf-eyebrow">Quick navigation</p><h2 className="mt-1 text-sm font-extrabold text-white">Continue investigation</h2><p className="mt-1 text-[10px] text-slate-500">Jump to the workflow you need.</p></div><div className="flex flex-wrap gap-2"><Link to="/scanner" className="tf-button-secondary"><FileSearch size={14}/> File scanner</Link><Link to="/alerts" className="tf-button-secondary">Review alerts <ArrowUpRight size={13}/></Link><Link to="/reports" className="tf-button-secondary">Export report</Link></div></div>
    </section>
  </div>;
}
