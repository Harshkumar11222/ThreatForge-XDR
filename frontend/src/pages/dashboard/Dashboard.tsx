import DashboardHeader from "../../components/dashboard/DashboardHeader";
import ThreatStats from "../../components/dashboard/ThreatStats";
import ThreatChart from "../../components/dashboard/ThreatChart";
import Sidebar from "../../components/dashboard/Sidebar";
import ThreatPieChart from "../../components/dashboard/ThreatPieChart";
import RecentAlertsTable from "../../components/dashboard/RecentAlertsTable";
import Topbar from "../../components/dashboard/Topbar";
import ScanHistory from "../../components/dashboard/ScanHistory";
import TopAttackingIPs from "../../components/dashboard/TopAttackingIPs";
import { useState } from "react";

export default function Dashboard() {

  const [refreshKey, setRefreshKey] = useState(0);

  const refreshDashboard = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-screen bg-[#030712]">
      <Sidebar />

      <div className="flex-1 p-8">
        <Topbar />

        <DashboardHeader onScanComplete={refreshDashboard} />

        <ThreatStats refreshKey={refreshKey} />

        <ThreatChart refreshKey={refreshKey} />

        <ThreatPieChart refreshKey={refreshKey} />

        <RecentAlertsTable refreshKey={refreshKey} />

        <ScanHistory refreshKey={refreshKey} />

        <TopAttackingIPs refreshKey={refreshKey} />
      </div>
    </div>
  );
}