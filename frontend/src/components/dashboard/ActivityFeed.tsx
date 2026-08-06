const activities = [
  {
    title: "SQL Injection Blocked",
    severity: "Critical",
    color: "text-red-400",
  },
  {
    title: "SSH Brute Force Detected",
    severity: "Medium",
    color: "text-yellow-400",
  },
  {
    title: "Port Scan Detected",
    severity: "Low",
    color: "text-cyan-400",
  },
  {
    title: "AI Investigation Completed",
    severity: "Success",
    color: "text-green-400",
  },
];

export default function ActivityFeed() {
  return (
    <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h3 className="mb-6 text-xl font-semibold text-white">
        Recent Security Activity
      </h3>

      <div className="space-y-4">
        {activities.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-xl border border-slate-800 px-4 py-4 hover:border-cyan-500 transition"
          >
            <span className="text-slate-300">
              {item.title}
            </span>

            <span className={`font-semibold ${item.color}`}>
              {item.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}