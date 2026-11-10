import {
  ShieldCheck,
  Activity,
  Globe,
  Cpu,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <div id="dashboard" className="relative w-full">

      {/* Dashboard Card */}
      <div className="rounded-3xl border border-cyan-300/10 bg-[#113333]/90 p-6 shadow-2xl shadow-teal-400/10 backdrop-blur-xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <p className="text-sm text-slate-500">
              ThreatForge XDR
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              Security Overview
            </h2>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10">
            <ShieldCheck className="text-teal-300" size={22} />
          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">

          {/* Critical Alerts */}
          <div className="rounded-2xl border border-cyan-300/5 bg-[#0b1f1f] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-rose-300/20 hover:bg-rose-400/5">
            <AlertTriangle className="mb-3 text-rose-300" size={21} />

            <p className="text-sm text-slate-500">
              Critical Alerts
            </p>

            <h3 className="mt-1 text-3xl font-bold text-white">
              12
            </h3>
          </div>

          {/* Protected Devices */}
          <div className="rounded-2xl border border-cyan-300/5 bg-[#0b1f1f] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-teal-300/20 hover:bg-teal-400/5">
            <Cpu className="mb-3 text-teal-300" size={21} />

            <p className="text-sm text-slate-500">
              Protected Devices
            </p>

            <h3 className="mt-1 text-3xl font-bold text-white">
              245
            </h3>
          </div>

          {/* Countries */}
          <div className="rounded-2xl border border-cyan-300/5 bg-[#0b1f1f] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-cyan-400/5">
            <Globe className="mb-3 text-cyan-300" size={21} />

            <p className="text-sm text-slate-500">
              Countries
            </p>

            <h3 className="mt-1 text-3xl font-bold text-white">
              18
            </h3>
          </div>

          {/* AI Status */}
          <div className="rounded-2xl border border-cyan-300/5 bg-[#0b1f1f] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-teal-300/20 hover:bg-teal-400/5">
            <Activity className="mb-3 text-teal-300" size={21} />

            <p className="text-sm text-slate-500">
              AI Status
            </p>

            <h3 className="mt-1 font-bold text-teal-300">
              Monitoring
            </h3>
          </div>

        </div>

        {/* Threat Score */}
        <div className="mt-8 rounded-2xl border border-cyan-300/5 bg-[#0b1f1f] p-5">

          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Threat Score
            </span>

            <span className="font-bold text-rose-300">
              82%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#1b4040]">
            <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-teal-400 to-cyan-300" />
          </div>

        </div>

        {/* System Health */}
        <div className="mt-5 space-y-4 rounded-2xl border border-cyan-300/5 bg-[#0b1f1f] p-5">

          {/* CPU */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-500">
                CPU Usage
              </span>

              <span className="text-teal-300">
                62%
              </span>
            </div>

            <div className="h-2 rounded-full bg-[#1b4040]">
              <div className="h-full w-[62%] rounded-full bg-teal-400" />
            </div>
          </div>

          {/* Memory */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-500">
                Memory
              </span>

              <span className="text-cyan-300">
                81%
              </span>
            </div>

            <div className="h-2 rounded-full bg-[#1b4040]">
              <div className="h-full w-[81%] rounded-full bg-cyan-300" />
            </div>
          </div>

        </div>

        {/* Threat Feed */}
        <div className="mt-8">

          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">
              Live Threat Feed
            </h3>

            <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-teal-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-lg shadow-teal-400/50" />
              Live
            </span>
          </div>

          <div className="space-y-3">

            {/* SQL Injection */}
            <div className="flex items-center justify-between rounded-xl border border-cyan-300/5 bg-[#0b1f1f] px-4 py-3 transition hover:border-rose-300/20 hover:bg-rose-400/5">

              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-rose-400" />

                <span className="text-sm text-slate-300">
                  SQL Injection
                </span>
              </div>

              <span className="text-xs font-semibold text-rose-300">
                Critical
              </span>

            </div>

            {/* SSH Brute Force */}
            <div className="flex items-center justify-between rounded-xl border border-cyan-300/5 bg-[#0b1f1f] px-4 py-3 transition hover:border-amber-300/20 hover:bg-amber-400/5">

              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-amber-300" />

                <span className="text-sm text-slate-300">
                  SSH Brute Force
                </span>
              </div>

              <span className="text-xs font-semibold text-amber-300">
                Medium
              </span>

            </div>

            {/* Port Scan */}
            <div className="flex items-center justify-between rounded-xl border border-cyan-300/5 bg-[#0b1f1f] px-4 py-3 transition hover:border-teal-300/20 hover:bg-teal-400/5">

              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-teal-400" />

                <span className="text-sm text-slate-300">
                  Port Scan
                </span>
              </div>

              <span className="text-xs font-semibold text-teal-300">
                Low
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}