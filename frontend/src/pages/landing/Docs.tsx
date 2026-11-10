import { Link } from "react-router-dom";
import { ArrowUpRight, FileSearch, Fingerprint, KeyRound, ShieldAlert } from "lucide-react";
import MarketingFrame from "../../components/layout/MarketingFrame";

const endpoints = [
  { method: "POST", path: "/auth/login", description: "Authenticate and receive a bearer token." },
  { method: "GET", path: "/alerts/", description: "Retrieve the current alert list." },
  { method: "GET", path: "/analytics/", description: "Retrieve dashboard analytics." },
  { method: "POST", path: "/uploads/init", description: "Create an upload job and file manifest." },
  { method: "PUT", path: "/uploads/{job_id}/files/{file_id}/chunk", description: "Send a file chunk at the expected byte offset." },
  { method: "GET", path: "/uploads/{job_id}", description: "Read upload and per-file processing status." },
  { method: "POST", path: "/uploads/{job_id}/finalize", description: "Validate completed files and begin scan processing." },
];

export default function Docs() {
  return <MarketingFrame>
    <section className="py-20 sm:py-24">
      <div className="tf-marketing-container">
        <p className="tf-eyebrow">Documentation / API quick reference</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-[-.05em] text-white sm:text-5xl">A practical map of the console.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">The local FastAPI Swagger page is the source of truth for the running backend. These are the main routes exposed by the current project frontend and upload workflow.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">{[{icon:KeyRound,title:"Authenticate",text:"Sign in to receive the bearer token used by protected endpoints."},{icon:FileSearch,title:"Upload",text:"Initialize the manifest, send chunks with offsets and finalize the job."},{icon:Fingerprint,title:"Inspect",text:"The scanner records SHA-256, ClamAV output and configured YARA matches."}].map(({icon:Icon,title,text})=><div key={title} className="tf-marketing-card p-5"><span className="tf-feature-icon"><Icon size={18}/></span><h2 className="mt-4 text-sm font-extrabold text-white">{title}</h2><p className="mt-2 text-xs leading-6 text-slate-400">{text}</p></div>)}</div>
        <div className="tf-marketing-card mt-6 overflow-hidden">
          <div className="border-b border-slate-700/50 px-5 py-4"><div className="flex items-center gap-2"><ShieldAlert size={16} className="text-cyan-300"/><h2 className="text-sm font-extrabold text-white">API endpoints</h2></div><p className="mt-1 text-[10px] text-slate-500">Requires a local backend at 127.0.0.1:8000 for interactive use.</p></div>
          <div className="divide-y divide-slate-800/70">{endpoints.map((endpoint) => <div key={endpoint.path} className="grid gap-2 px-5 py-3 sm:grid-cols-[62px_minmax(0,1fr)_1.3fr] sm:items-center"><span className={`w-fit rounded-md px-2 py-1 text-[9px] font-extrabold ${endpoint.method === "GET" ? "bg-emerald-300/10 text-emerald-200" : endpoint.method === "PUT" ? "bg-amber-300/10 text-amber-200" : "bg-cyan-300/10 text-cyan-200"}`}>{endpoint.method}</span><code className="tf-mono break-all text-[11px] text-slate-200">{endpoint.path}</code><span className="text-[11px] text-slate-500">{endpoint.description}</span></div>)}</div>
        </div>
        <div className="mt-7 flex flex-wrap gap-3"><a className="tf-button" href="http://127.0.0.1:8000/docs" target="_blank" rel="noreferrer">Open Swagger UI <ArrowUpRight size={15}/></a><Link className="tf-button-secondary" to="/login">Go to console</Link></div>
      </div>
    </section>
  </MarketingFrame>;
}
