const activities = [
  {
    title: "SQL Injection Blocked",
    severity: "Critical",
    color: "text-rose-300",
    dot: "bg-rose-400",
    hover: "hover:border-rose-300/20 hover:bg-rose-400/5",
  },
  {
    title: "SSH Brute Force Detected",
    severity: "Medium",
    color: "text-amber-300",
    dot: "bg-amber-300",
    hover: "hover:border-amber-300/20 hover:bg-amber-400/5",
  },
  {
    title: "Port Scan Detected",
    severity: "Low",
    color: "text-teal-300",
    dot: "bg-teal-400",
    hover: "hover:border-teal-300/25 hover:bg-teal-400/5",
  },
  {
    title: "AI Investigation Completed",
    severity: "Success",
    color: "text-emerald-300",
    dot: "bg-emerald-400",
    hover: "hover:border-emerald-300/20 hover:bg-emerald-400/5",
  },
];

export default function ActivityFeed() {
  return (
    <div className="mt-8 rounded-2xl border border-cyan-300/10 bg-[#113333] p-6 shadow-lg shadow-teal-400/5">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <h3 className="text-xl font-semibold text-white">
          Recent Security Activity
        </h3>

        <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-lg shadow-teal-400/50" />
          Live
        </span>

      </div>

      {/* Activities */}
      <div className="space-y-4">

        {activities.map((item) => (
          <div
            key={item.title}
            className={`
              flex items-center justify-between
              rounded-xl
              border border-cyan-300/10
              bg-[#0b1f1f]
              px-4 py-4
              transition-all duration-300
              hover:-translate-y-0.5
              ${item.hover}
            `}
          >

            <div className="flex items-center gap-3">

              <span
                className={`
                  h-2 w-2 rounded-full
                  ${item.dot}
                `}
              />

              <span className="text-slate-300">
                {item.title}
              </span>

            </div>

            <span
              className={`font-semibold ${item.color}`}
            >
              {item.severity}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}