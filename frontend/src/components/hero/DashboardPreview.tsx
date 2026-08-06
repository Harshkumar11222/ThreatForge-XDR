import {
  ShieldCheck,
  Activity,
  Globe,
  Cpu,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <div className="relative">

      <div className="rounded-3xl border border-slate-800 bg-[#111827]/80 backdrop-blur-xl p-6 shadow-2xl shadow-cyan-500/10">

        {/* Header */}

        <div className="flex items-center justify-between mb-6">

          <div>

            <p className="text-sm text-slate-400">
              ThreatForge XDR
            </p>

            <h2 className="text-2xl font-bold text-white">
              Security Overview
            </h2>

          </div>

          <ShieldCheck className="text-cyan-400" />

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-4">

<div className="rounded-2xl bg-slate-900 p-4 hover:-translate-y-2 transition-all duration-300">
            <AlertTriangle
              className="text-red-500 mb-3"
            />

            <p className="text-slate-400 text-sm">
              Critical Alerts
            </p>

            <h3 className="text-3xl font-bold text-white">
              12
            </h3>

          </div>

<div className="rounded-2xl bg-slate-900 p-4 hover:-translate-y-2 transition-all duration-300">
            <Cpu
              className="text-cyan-400 mb-3"
            />

            <p className="text-slate-400 text-sm">
              Protected Devices
            </p>

            <h3 className="text-3xl font-bold text-white">
              245
            </h3>

          </div>

<div className="rounded-2xl bg-slate-900 p-4 hover:-translate-y-2 transition-all duration-300">
            <Globe
              className="text-blue-400 mb-3"
            />

            <p className="text-slate-400 text-sm">
              Countries
            </p>

            <h3 className="text-3xl font-bold text-white">
              18
            </h3>

          </div>

<div className="rounded-2xl bg-slate-900 p-4 hover:-translate-y-2 transition-all duration-300">
            <Activity
              className="text-green-400 mb-3"
            />

            <p className="text-slate-400 text-sm">
              AI Status
            </p>

            <h3 className="text-green-400 font-bold">
              Monitoring
            </h3>

          </div>

        </div>

        {/* Threat Score */}

<div className="mt-8 rounded-2xl bg-slate-900 p-5">

  <div className="mb-2 flex items-center justify-between">

    <span className="text-sm text-slate-400">
      Threat Score
    </span>

    <span className="font-bold text-red-400">
      82%
    </span>

  </div>

  <div className="h-2 overflow-hidden rounded-full bg-slate-700">

    <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />

  </div>

</div>

{/* System Health */}

<div className="mt-5 space-y-4 rounded-2xl bg-slate-900 p-5">

  <div>

    <div className="mb-2 flex justify-between text-sm">

      <span className="text-slate-400">
        CPU Usage
      </span>

      <span className="text-cyan-400">
        62%
      </span>

    </div>

    <div className="h-2 rounded-full bg-slate-700">

      <div className="h-full w-[62%] rounded-full bg-cyan-400" />

    </div>

  </div>

  <div>

    <div className="mb-2 flex justify-between text-sm">

      <span className="text-slate-400">
        Memory
      </span>

      <span className="text-blue-400">
        81%
      </span>

    </div>

    <div className="h-2 rounded-full bg-slate-700">

      <div className="h-full w-[81%] rounded-full bg-blue-500" />

    </div>

  </div>

</div>


        {/* Threat Feed */}

        <div className="mt-8">

          <h3 className="text-white font-semibold mb-4">
            Live Threat Feed
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between rounded-xl bg-slate-900 px-4 py-3">

              <span className="text-slate-300">
                SQL Injection
              </span>

              <span className="text-red-400">
                Critical
              </span>

            </div>

            <div className="flex justify-between rounded-xl bg-slate-900 px-4 py-3">

              <span className="text-slate-300">
                SSH Brute Force
              </span>

              <span className="text-yellow-400">
                Medium
              </span>

            </div>

            <div className="flex justify-between rounded-xl bg-slate-900 px-4 py-3">

              <span className="text-slate-300">
                Port Scan
              </span>

              <span className="text-cyan-400">
                Low
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}