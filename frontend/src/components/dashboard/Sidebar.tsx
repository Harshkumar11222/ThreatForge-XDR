import {
  Activity,
  AlertTriangle,
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  ScanSearch,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard", end: true },
  { icon: ScanSearch, label: "File scanner", path: "/scanner" },
  { icon: AlertTriangle, label: "Security alerts", path: "/alerts" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

function readUserName() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.name || user?.email || "Workspace user";
  } catch {
    return "Workspace user";
  }
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const userName = readUserName();
  const initials = userName
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part[0]?.toUpperCase())
    .join("") || "TF";

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  return (
    <>
      {mobileOpen && <button aria-label="Close navigation" className="tf-mobile-overlay lg:hidden" onClick={onClose} />}
      <aside className={`tf-sidebar fixed inset-y-0 left-0 z-40 flex h-screen w-[260px] flex-col ${mobileOpen ? "is-open" : ""}`}>
        <div className="flex items-center justify-between border-b border-slate-700/40 px-5 py-5">
          <NavLink to="/dashboard" onClick={onClose} className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 shadow-[0_0_28px_rgba(75,220,255,.12)]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="text-[15px] font-extrabold tracking-[.12em] text-white">THREATFORGE</div>
              <div className="mt-0.5 text-[9px] font-extrabold tracking-[.34em] text-cyan-300">XDR CONSOLE</div>
            </div>
          </NavLink>
          <button className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden" onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pb-3 pt-5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-extrabold tracking-[.22em] text-slate-600">WORKSPACE</span>
            <span className="tf-chip !px-2 !py-1 !text-[9px]">LOCAL</span>
          </div>
          <div className="mt-3 rounded-xl border border-slate-700/50 bg-slate-900/45 p-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <span className="tf-status-dot" /> Security operations
            </div>
            <p className="mt-1 text-[10px] leading-5 text-slate-500">Unified endpoint and file security workspace</p>
          </div>
        </div>

        <nav className="tf-sidebar-scroll flex-1 space-y-1 overflow-y-auto px-3 py-3">
          <p className="mb-2 px-3 pt-2 text-[9px] font-extrabold tracking-[.2em] text-slate-600">CONSOLE</p>
          {menuItems.map(({ icon: Icon, label, path, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              onClick={onClose}
              className={({ isActive }) => `tf-nav-item ${isActive ? "tf-nav-active" : ""}`}
            >
              <Icon size={17} strokeWidth={1.9} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mx-3 mb-3 rounded-xl border border-cyan-300/10 bg-cyan-300/[.045] p-3">
          <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-cyan-200">
            <Activity size={13} /> Detection stack
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="tf-chip !px-2 !py-1 !text-[9px]">SHA-256</span>
            <span className="tf-chip !px-2 !py-1 !text-[9px]">ClamAV</span>
            <span className="tf-chip !px-2 !py-1 !text-[9px]">YARA</span>
          </div>
        </div>

        <div className="border-t border-slate-700/40 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 flex-none place-items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-xs font-extrabold text-cyan-100">{initials}</div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-extrabold text-slate-100">{userName}</div>
              <div className="mt-0.5 text-[10px] text-slate-500">Signed-in account</div>
            </div>
          </div>
          <button onClick={handleLogout} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-rose-400/15 bg-rose-400/[.035] py-2.5 text-[11px] font-extrabold text-rose-300 transition hover:border-rose-300/35 hover:bg-rose-400/[.08]">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
