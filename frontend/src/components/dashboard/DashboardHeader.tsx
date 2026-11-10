import {
  ShieldCheck,
  CalendarDays,
  Play,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { startScan } from "../../services/scanner";
import { useNotifications } from "../../hooks/useNotifications";

interface Props {
  onScanComplete: () => void;
}

export default function DashboardHeader({ onScanComplete }: Props) {
  const [scanning, setScanning] = useState(false);
  const { addNotification } = useNotifications();

  const now = new Date();
  const hour = now.getHours();

  const greeting =
    hour >= 5 && hour < 12
      ? "Good morning"
      : hour >= 12 && hour < 17
      ? "Good afternoon"
      : hour >= 17 && hour < 21
      ? "Good evening"
      : "Good night";

  const today = now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  async function handleScan() {
    try {
      setScanning(true);

      const result = await startScan();

      toast.success(
        `Scan Complete - ${result.total_threats} Threat(s) Found`
      );

      addNotification({
        id: Date.now(),
        title: "Scan Completed",
        severity: result.total_threats > 0 ? "High" : "Low",
        ip: "Local System",
        time: "Just now",
        read: false,
      });

      onScanComplete();
    } catch (e) {
      console.error(e);
      toast.error("Scan Failed");
    } finally {
      setScanning(false);
    }
  }

  return (
    <section className="tf-grid relative overflow-hidden border-b border-cyan-300/10 px-7 py-8">

      {/* Background Text */}
      <div className="pointer-events-none absolute right-8 top-4 text-right opacity-40">

        <div className="text-[10px] font-medium tracking-[.3em] text-teal-300/70">
          THREATFORGE XDR
        </div>

        <div className="mt-2 text-3xl font-bold text-teal-300/10">
          DETECTION TODAY
        </div>

        <div className="text-3xl font-bold text-cyan-300/5">
          PREVENTION TOMORROW
        </div>

      </div>

      {/* Header Content */}
      <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">

        {/* Greeting */}
        <div>

          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-teal-300">

            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-lg shadow-teal-400/50" />

            Security Operations Center

          </div>

          <h1 className="text-4xl font-bold tracking-wide text-white">

            {greeting},{" "}

            <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Harsh
            </span>

          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Your system is protected and monitoring in real time.
          </p>

          {/* Date */}
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <CalendarDays
              size={14}
              className="text-teal-300/70"
            />

            {today}
          </div>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Secure Status */}
          <div className="flex items-center gap-2 rounded-full border border-teal-300/15 bg-teal-400/5 px-4 py-2 text-xs font-bold text-teal-300">

            <ShieldCheck size={15} />

            SYSTEM SECURE

          </div>

          {/* Scan */}
          <button
            onClick={handleScan}
            disabled={scanning}
            className="
              flex items-center gap-2
              rounded-xl
              bg-teal-400
              px-5 py-2.5
              text-sm font-bold
              text-[#062222]
              shadow-lg shadow-teal-400/15
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-teal-300
              hover:shadow-teal-400/25
              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:translate-y-0
            "
          >

            {scanning ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <Play size={16} />
            )}

            {scanning ? "Scanning..." : "Run Scan"}

          </button>

        </div>

      </div>

    </section>
  );
}