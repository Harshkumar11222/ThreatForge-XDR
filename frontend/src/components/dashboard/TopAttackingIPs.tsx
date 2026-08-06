import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { getTopIPs, type TopIP } from "../../services/analytics";

export default function TopAttackingIPs() {
  const [ips, setIps] = useState<TopIP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIPs();
  }, []);

  async function loadIPs() {
    try {
      const data = await getTopIPs();
      setIps(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

      <div className="flex items-center gap-2 mb-6">
        <ShieldAlert className="text-red-500" />
        <h2 className="text-xl font-bold text-white">
          Top Attacking IPs
        </h2>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : ips.length === 0 ? (
        <p className="text-slate-400">
          No attacks recorded yet.
        </p>
      ) : (
        <div className="space-y-4">
          {ips.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center rounded-xl bg-slate-800/60 px-4 py-3"
            >
              <span className="text-slate-200 font-mono">
                {item.ip}
              </span>

              <span className="text-red-400 font-semibold">
                {item.attacks} Hits
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}