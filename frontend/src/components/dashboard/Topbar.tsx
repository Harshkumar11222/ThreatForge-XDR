import { useState } from "react";
import {
  Search,
  Bell,
  UserCircle,
} from "lucide-react";

import NotificationDropdown from "./NotificationDropdown";
import { useNotifications } from "../../hooks/useNotifications";

export default function Topbar() {
  const [open, setOpen] = useState(false);

  const { notifications } = useNotifications();

  return (
  <div className="mb-8 flex items-center justify-between">

    {/* Left */}

    <div>
      <h1 className="text-3xl font-bold text-white">
        ThreatForge XDR
      </h1>

      <p className="mt-1 text-slate-400">
        Welcome back, Harsh 👋
      </p>
    </div>

    {/* Right */}

    <div className="flex items-center gap-4">

      {/* Search */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search alerts, IPs, users..."
          className="w-72 rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
        />

      </div>

      {/* Notification */}

      <div className="relative">

        <button
          onClick={() => setOpen(!open)}
          className="relative rounded-2xl border border-slate-700 bg-slate-900 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20"
        >

          <Bell
            size={22}
            className="text-white"
          />

          {notifications.length > 0 && (

            <span className="absolute -right-1 -top-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">

              {notifications.length}

            </span>

          )}

        </button>

        {open && (
          <div className="absolute right-0 mt-3 z-50">
            <NotificationDropdown />
          </div>
        )}

      </div>

      {/* Status */}

      <div className="hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 lg:flex lg:items-center lg:gap-2">

        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>

        <span className="text-sm font-medium text-emerald-400">
          System Protected
        </span>

      </div>

      {/* Profile */}

      <button className="transition-transform duration-300 hover:scale-105">

        <div className="rounded-full border-2 border-cyan-500 bg-cyan-500 p-1">

          <UserCircle
            size={42}
            className="text-slate-900"
          />

        </div>

      </button>

    </div>

  </div>
);
}