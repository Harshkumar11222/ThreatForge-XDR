import { useNotifications } from "../../hooks/useNotifications";

export default function NotificationDropdown() {
  const { notifications, clearNotifications } = useNotifications();

  return (
    <div className="absolute right-0 top-12 z-50 w-[min(360px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-slate-700/70 bg-[#0d1727] shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-slate-700/60 px-4 py-3">
        <div><h3 className="text-sm font-extrabold text-slate-100">Notifications</h3><p className="mt-0.5 text-[10px] text-slate-500">Local session activity</p></div>
        <button onClick={clearNotifications} className="text-[10px] font-extrabold text-cyan-300 hover:text-white">Clear all</button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="px-5 py-9 text-center text-xs text-slate-500">No notifications in this session.</p>
        ) : notifications.map((notification) => (
          <div key={notification.id} className="border-b border-slate-800/70 px-4 py-3 last:border-0 hover:bg-white/[.025]">
            <div className="flex items-center justify-between gap-3"><h4 className="text-xs font-bold text-slate-100">{notification.title}</h4><span className="text-[9px] font-extrabold uppercase text-slate-500">{notification.severity}</span></div>
            <p className="mt-1 text-[11px] text-slate-400">{notification.ip}</p>
            <p className="mt-2 text-[10px] text-slate-600">{notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
