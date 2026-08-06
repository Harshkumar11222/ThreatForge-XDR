import {
  ShieldCheck,
  Bell,
  Search,
  CalendarDays,
} from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";
import { useState } from "react";
import toast from "react-hot-toast";
import { startScan } from "../../services/scanner";

interface DashboardHeaderProps {
  onScanComplete: () => void;
}

export default function DashboardHeader({
  onScanComplete,
}: DashboardHeaderProps) {

  const [scanning, setScanning] = useState(false);
  const { addNotification } = useNotifications();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleScan = async () => {
  try {
    setScanning(true);

    const result = await startScan();

    toast.success(
      `Scan Complete - ${result.total_threats} Threat(s) Found`
    );

    // 🔔 Notification add
    addNotification({
      id: Date.now(),
      title: "Scan Completed",
      severity:
        result.total_threats > 0 ? "High" : "Low",
      ip: "Local System",
      time: "Just now",
      read: false,
    });

    // Dashboard refresh
    onScanComplete();

  } catch (error) {
    console.error(error);

    toast.error("Scan Failed");

    addNotification({
      id: Date.now(),
      title: "Scan Failed",
      severity: "Critical",
      ip: "Local System",
      time: "Just now",
      read: false,
    });

  } finally {
    setScanning(false);
  }
};

  return (
    <div className="flex flex-col gap-6 border-b border-slate-800 pb-6 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}
      <div>

        <p className="text-sm text-slate-400">
          Welcome back 👋
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Security Operations Center
        </h1>

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
          <CalendarDays size={16} />
          {today}
        </div>

      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-4">

        {/* Search */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />

        </div>

        {/* Notification */}
        <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 transition hover:border-cyan-400">

          <Bell
            size={20}
            className="text-white"
          />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        {/* Scan Button */}
        <button
          onClick={handleScan}
          disabled={scanning}
          className="rounded-xl bg-cyan-600 px-5 py-2 font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-50"
        >
          {scanning ? "Scanning..." : "Start Scan"}
        </button>

        {/* Status */}
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">

          <ShieldCheck
            size={18}
            className="text-emerald-400"
          />

          <span className="text-sm font-medium text-emerald-400">
            Protected
          </span>

        </div>

      </div>

    </div>
  );
}