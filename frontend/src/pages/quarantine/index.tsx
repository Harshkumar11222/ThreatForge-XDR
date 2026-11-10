import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert, RefreshCw, Undo, Trash2, CheckCircle } from 'lucide-react';
// Self-contained interface
interface QuarantinedFile {
  id: number;
  file_name: string;
  original_path: string;
  quarantine_path: string;
  threat: string;
  timestamp: string;
}

const QuarantinePage = () => {
  const [files, setFiles] = useState<QuarantinedFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Backend FastAPI se seedha fetch karega bina kisi external api.ts ke
  const fetchQuarantinedFiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/quarantine/');
      setFiles(response.data);
    } catch (error) {
      console.error("Failed to fetch quarantine list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuarantinedFiles();
  }, []);

  // Restore action
  const handleRestore = async (id: number) => {
    try {
      await axios.post(`http://127.0.0.1:8000/quarantine/${id}/restore`);
      setStatusMsg("File successfully restored to original path! 🛡️");
      fetchQuarantinedFiles();
    } catch (error) {
      alert("Failed to restore file. Check backend logs.");
    }
  };

  // Delete action
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/quarantine/${id}/delete`);
      setStatusMsg("Malicious file permanently shredded from disk! 🗑️");
      fetchQuarantinedFiles();
    } catch (error) {
      alert("Failed to delete file from disk.");
    }
  };

  return (
    <div className="p-8 space-y-6 h-full font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Isolated Quarantine Area</h1>
          <p className="text-gray-500 text-sm mt-1">Review, Restore, or Permanently shred quarantined threats on this host.</p>
        </div>
        <button 
          onClick={fetchQuarantinedFiles} 
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm text-sm font-medium"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {statusMsg && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm flex items-center gap-2">
          <CheckCircle className="h-4 w-4" /> {statusMsg}
        </div>
      )}

      {/* Pure Tailwind Table - No Missing UI Imports */}
      <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase">
              <th className="py-3 px-4">File Name</th>
              <th className="py-3 px-4">Threat Signature</th>
              <th className="py-3 px-4">Original Path</th>
              <th className="py-3 px-4">Time Isolated</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  Polling quarantine space from backend...
                </td>
              </tr>
            ) : files.length > 0 ? (
              files.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-medium text-gray-900">{file.file_name}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <ShieldAlert className="h-3 w-3" /> {file.threat}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-500 max-w-xs truncate">{file.original_path}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">
                    {file.timestamp ? new Date(file.timestamp).toLocaleString() : 'Just now'}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleRestore(file.id)}
                      className="px-3 py-1.5 border border-green-600 text-green-700 hover:bg-green-50 rounded-md text-xs font-medium inline-flex items-center gap-1 transition"
                    >
                      <Undo className="h-3.5 w-3.5" /> Restore
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="px-3 py-1.5 bg-red-600 text-white hover:bg-red-700 rounded-md text-xs font-medium inline-flex items-center gap-1 transition shadow-sm"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <span>Great! No isolated files currently active in quarantine storage.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuarantinePage;
