import { useEffect, useState } from "react";
import { getScans, type Scan } from "../../services/scans";

export default function ScanHistory() {

  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScans();
  }, []);

  const loadScans = async () => {
    try {
      const data = await getScans();
      setScans(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        Loading Scan History...
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Recent Scan History
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b border-slate-700 text-left text-slate-400">

            <th>ID</th>
            <th>Total Threats</th>
            <th>Time</th>

          </tr>

        </thead>

        <tbody>

          {scans.map((scan) => (

            <tr
              key={scan.id}
              className="border-b border-slate-800"
            >

              <td className="py-4 text-white">
                #{scan.id}
              </td>

              <td className="py-4 text-red-400">
                {scan.total_threats}
              </td>

              <td className="py-4 text-slate-300">
                {new Date(scan.created_at).toLocaleString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}