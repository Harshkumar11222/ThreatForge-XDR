import { useEffect, useState } from "react";
import { getAlerts, type Alert } from "../../services/alerts";

export default function RecentAlertsTable() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  loadAlerts();

  const interval = setInterval(() => {
    loadAlerts();
  }, 5000);

  return () => clearInterval(interval);
}, []);

  const loadAlerts = async () => {
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const severityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-500/10 text-red-400";
      case "high":
        return "bg-orange-500/10 text-orange-400";
      case "medium":
        return "bg-yellow-500/10 text-yellow-400";
      default:
        return "bg-cyan-500/10 text-cyan-400";
    }
  };

  if (loading) {
    return (
      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-bold text-white">
          Recent Alerts
        </h2>

        <p className="mt-6 text-slate-400">
          Loading Alerts...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Recent Alerts
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700 text-left text-slate-400">

              <th className="pb-4">Threat</th>
              <th className="pb-4">Severity</th>
              <th className="pb-4">Source IP</th>
              <th className="pb-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {alerts.map((alert) => (

              <tr
                key={alert.id}
                className="border-b border-slate-800 transition hover:bg-slate-800/40"
              >

                <td className="py-4 text-white">
                  {alert.threat}
                </td>

                <td className="py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${severityColor(
                      alert.severity
                    )}`}
                  >
                    {alert.severity}
                  </span>

                </td>

                <td className="py-4 text-slate-300">
                  {alert.source}
                </td>

                <td className="py-4 text-green-400">
                  {alert.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}