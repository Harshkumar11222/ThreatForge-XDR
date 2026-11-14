
import { useEffect, useState } from "react";
import { Clock3, ChevronDown, ChevronUp } from "lucide-react";
import { getScans, type Scan } from "../../services/scans";

export default function ScanHistory() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    getScans()
      .then(setScans)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
    return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  };

  const statusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-emerald-400";
      case "failed":
        return "text-rose-400";
      case "scanning":
        return "text-amber-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <section className="tf-section overflow-hidden">
      <div className="flex items-center gap-3 border-b border-slate-700/50 p-5">
        <span className="tf-feature-icon !h-9 !w-9">
          <Clock3 size={16} />
        </span>
        <div>
          <h2 className="text-sm font-extrabold text-white">
            Scan History
          </h2>
          <p className="mt-1 text-[10px] text-slate-500">
            Previous upload and malware scan records
          </p>
        </div>
      </div>

      {loading && (
        <p className="py-8 text-center text-slate-500">
          Loading scan history...
        </p>
      )}

      {failed && (
        <p className="py-8 text-center text-rose-300">
          Could not load scan history.
        </p>
      )}

      {!loading && !failed && scans.length === 0 && (
        <p className="py-8 text-center text-slate-500">
          No scan history available.
        </p>
      )}

      {!loading && !failed && scans.length > 0 && (
        <div className="overflow-x-auto">
          <table className="tf-table min-w-[750px] w-full">
            <thead>
              <tr>
                <th>Upload ID</th>
                <th>Status</th>
                <th>Files</th>
                <th>Clean</th>
                <th>Suspicious</th>
                <th>Malicious</th>
                <th>Errors</th>
                <th>Created</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {scans.map((scan) => (
                <>
                  <tr key={scan.job_id}>
                    <td className="tf-mono text-slate-400">
                      #{scan.job_id.slice(0, 8)}
                    </td>

                    <td className={`font-bold ${statusColor(scan.status)}`}>
                      {scan.status}
                    </td>

                    <td className="text-slate-300">
                      {scan.scanned_files}/{scan.total_files}
                    </td>

                    <td className="font-bold text-emerald-400">
                      {scan.clean_files}
                    </td>

                    <td className="font-bold text-amber-400">
                      {scan.suspicious_files}
                    </td>

                    <td className="font-bold text-rose-400">
                      {scan.malicious_files}
                    </td>

                    <td className="text-slate-400">
                      {scan.error_files}
                    </td>

                    <td className="text-xs text-slate-500">
                      {new Date(scan.created_at).toLocaleString()}
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          setExpanded(
                            expanded === scan.job_id ? null : scan.job_id
                          )
                        }
                        className="text-slate-400 hover:text-white"
                      >
                        {expanded === scan.job_id ? (
                          <ChevronUp size={17} />
                        ) : (
                          <ChevronDown size={17} />
                        )}
                      </button>
                    </td>
                  </tr>

                  {expanded === scan.job_id && (
                    <tr key={`${scan.job_id}-details`}>
                      <td colSpan={9} className="bg-slate-900/40 p-4">
                        <div className="mb-3 flex flex-wrap gap-4 text-xs text-slate-400">
                          <span>Total size: {formatSize(scan.total_bytes)}</span>
                          <span>Files: {scan.total_files}</span>
                          <span>Scanned: {scan.scanned_files}</span>
                        </div>

                        <div className="space-y-3">
                          {scan.files.map((file) => (
                            <div
                              key={file.file_id}
                              className="rounded-lg border border-slate-700/50 p-3"
                            >
                              <div className="flex flex-wrap justify-between gap-2">
                                <span className="break-all text-xs text-slate-200">
                                  {file.relative_path}
                                </span>
                                <span className="text-xs font-bold text-slate-300">
                                  {file.status}
                                </span>
                              </div>

                              <div className="mt-2 flex flex-wrap gap-4 text-[10px] text-slate-500">
                                <span>{formatSize(file.size_bytes)}</span>
                                {file.severity && (
                                  <span>Severity: {file.severity}</span>
                                )}
                                {file.threat_name && (
                                  <span>Threat: {file.threat_name}</span>
                                )}
                                {file.clamav_result && (
                                  <span>ClamAV: {file.clamav_result}</span>
                                )}
                                {file.yara_status && (
                                  <span>YARA: {file.yara_status}</span>
                                )}
                              </div>

                              {file.sha256 && (
                                <p className="mt-2 break-all font-mono text-[10px] text-slate-500">
                                  SHA-256: {file.sha256}
                                </p>
                              )}

                              {file.error_message && (
                                <p className="mt-2 break-all text-xs text-rose-300">
                                  Error: {file.error_message}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
