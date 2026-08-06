import { useNotifications } from "../../hooks/useNotifications";

export default function NotificationDropdown() {
  const { notifications, clearNotifications } = useNotifications();

  return (
    <div className="absolute right-0 top-14 z-50 w-96 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

      <div className="flex items-center justify-between border-b border-slate-700 p-4">
        <h3 className="text-lg font-bold text-white">
          Notifications
        </h3>

        <button
          onClick={clearNotifications}
          className="text-sm text-cyan-400 hover:text-cyan-300"
        >
          Clear All
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">

        {notifications.length === 0 ? (
          <p className="p-6 text-center text-slate-400">
            No notifications
          </p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="border-b border-slate-800 p-4 hover:bg-slate-800/50"
            >
              <h4 className="font-semibold text-white">
                {notification.title}
              </h4>

              <p className="mt-1 text-sm text-slate-400">
                {notification.severity}
              </p>

              <p className="text-xs text-slate-500">
                {notification.ip}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                {notification.time}
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}