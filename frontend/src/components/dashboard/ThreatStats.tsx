import { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  AlertTriangle,
  Shield,
  Globe,
  Cpu,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import StatCard from "./StatCard";
import {
  getDashboardStats,
  type DashboardStats,
} from "../../services/dashboard";

interface StatCardProps {
  title: string;
  value: string;
  color: string;
  trend: string;
  trendColor: string;
  icon: any;
}

export default function ThreatStats() {

  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (

<div className="mt-8 grid gap-6 lg:grid-cols-4">

{[1,2,3,4].map((i)=>(

<div
key={i}
className="h-44 animate-pulse rounded-3xl bg-slate-800"
/>

))}

</div>

);
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-4">

      <StatCard
        title="Protected Endpoints"
        value={stats.protected_devices.toString()}
        color="text-cyan-400"
        trend="+18%"
        trendColor="text-green-400"
        icon={Shield}
      />

      <StatCard
        title="Active Threats"
        value={stats.critical_alerts.toString()}
        color="text-red-400"
        trend="-4%"
        trendColor="text-red-400"
        icon={AlertTriangle}
      />

      <StatCard
        title="Threat Score"
        value={stats.ai_status}
        color="text-blue-400"
        trend="Excellent"
        trendColor="text-green-400"
        icon={Cpu}
      />

      <StatCard
        title="Countries"
        value={stats.countries.toString()}
        color="text-cyan-400"
        trend="Live"
        trendColor="text-cyan-400"
        icon={Globe}
      />

    </div>
  );
}