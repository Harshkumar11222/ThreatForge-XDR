import { useMemo, useState } from "react";
import { Bell, Menu, Shield, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import NotificationDropdown from "./NotificationDropdown";
import { useNotifications } from "../../hooks/useNotifications";

const routeNames: Record<string, string> = {
  "/dashboard": "Overview",
  "/scanner": "File scanner",
  "/alerts": "Security alerts",
  "/analytics": "Analytics",
  "/reports": "Reports",
  "/settings": "Settings",
};

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [open, setOpen] = useState(false);
  const { notifications } = useNotifications();
  const { pathname } = useLocation();
  const title = routeNames[pathname] || "Security workspace";
  const dateLabel = useMemo(
    () => new Intl.DateTimeFormat(undefined, { weekday: "short", day: "2-digit", month: "short", year: "numeric" }).format(new Date()),
    [],
  );

  return (
    <header className="tf-topbar sticky top-0 z-30 flex min-h-[76px] items-center gap-4 px-4 sm:px-6 lg:px-8">
      <button onClick={onMenuClick} aria-label="Open navigation" className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-2.5 text-slate-300 hover:border-cyan-300/30 hover:text-cyan-100 lg:hidden">
        <Menu size={18} />
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-slate-600">
          <span>ThreatForge XDR</span><ChevronRight size={12} /><span className="text-cyan-300">{title}</span>
        </div>
        <div className="mt-1 truncate text-sm font-extrabold text-slate-100 sm:text-base">{title}</div>
      </div>
      <div className="hidden items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/50 px-3 py-2 sm:flex">
        <Shield size={14} className="text-cyan-300" />
        <span className="text-[10px] font-bold text-slate-400">Local security console</span>
      </div>
      <div className="hidden text-right md:block">
        <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Workspace date</div>
        <div className="mt-1 text-xs font-bold text-slate-300">{dateLabel}</div>
      </div>
      <div className="relative">
        <button onClick={() => setOpen((value) => !value)} aria-label="Notifications" className="relative rounded-xl border border-slate-700/70 bg-slate-900/65 p-2.5 text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100">
          <Bell size={17} />
          {notifications.length > 0 && <span className="absolute -right-1 -top-1 grid h-[17px] min-w-[17px] place-items-center rounded-full border border-[#0b1422] bg-rose-500 px-1 text-[9px] font-extrabold text-white">{notifications.length}</span>}
        </button>
        {open && <NotificationDropdown />}
      </div>
    </header>
  );
}
