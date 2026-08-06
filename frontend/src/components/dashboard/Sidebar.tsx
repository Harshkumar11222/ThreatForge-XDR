import {
  ShieldCheck,
  LayoutDashboard,
  AlertTriangle,
  BarChart3,
  Monitor,
  Globe,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: AlertTriangle, label: "Alerts", path: "/alerts" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Monitor, label: "Endpoints", path: "/endpoints" },
  { icon: Globe, label: "Threat Intel", path: "/threat-intel" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-[#020617]">

      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500">
          <ShieldCheck className="text-white" size={26} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            ThreatForge
          </h2>

          <p className="text-xs text-cyan-400">
            XDR Platform
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-slate-800 p-5">

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 font-bold text-white">
            H
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Harsh Kumar
            </h3>

            <p className="text-xs text-slate-400">
              Cyber Security Engineer
            </p>
          </div>

        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 py-3 text-red-400 transition hover:bg-red-500/10">
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}