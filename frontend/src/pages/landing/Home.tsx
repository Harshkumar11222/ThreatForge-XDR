import { Link } from "react-router-dom";
import {
Activity, ArrowDownRight, ArrowRight, ArrowUpRight,
  Fingerprint, FolderUp, Radar, ShieldAlert, ShieldCheck, TerminalSquare,
} from "lucide-react";
import MarketingFrame from "../../components/layout/MarketingFrame";

const capabilities = [
  { icon: Fingerprint, code: "01 / INTEGRITY", title: "File identity", text: "Generate SHA-256 fingerprints with streaming file reads, including large uploads." },
  { icon: ShieldAlert, code: "02 / DETECTION", title: "Malware inspection", text: "Combine ClamAV signature checks with configured YARA rules and explicit scan states." },
  { icon: Activity, code: "03 / OPERATIONS", title: "Alert investigation", text: "Review severity, risk scores, source context and scan outcomes in one console." },
  { icon: FolderUp, code: "04 / INGESTION", title: "Large file intake", text: "Use chunked upload endpoints with a combined 12 GB upload-job limit." },
];

export default function Home() {
  return (
    <MarketingFrame>
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
        <div className="tf-grid-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-28 top-12 h-[420px] w-[420px] rounded-full bg-cyan-400/[.08] blur-[110px]" />
        <div className="tf-marketing-container relative grid items-center gap-14 lg:grid-cols-[1.03fr_.97fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[.07] px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[.17em] text-cyan-100">
              <span className="tf-status-dot" /> Endpoint visibility · File inspection · Response workflow
            </div>
            <p className="tf-eyebrow">Extended detection & response workspace</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[1.04] tracking-[-.055em] text-white sm:text-6xl xl:text-[70px]">
              See the signal.<br /><span className="bg-gradient-to-r from-cyan-200 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">Investigate the threat.</span>
            </h1>
            <p className="mt-7 max-w-xl text-[15px] leading-8 text-slate-400">
              ThreatForge XDR brings file intake, SHA-256 identity, ClamAV and YARA inspection, and security alerts into one focused analyst workspace.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/register" className="tf-button !min-h-[48px] !px-5">Enter the console <ArrowRight size={16} /></Link>
              <Link to="/features" className="tf-button-secondary !min-h-[48px] !px-5">Explore the platform <ArrowUpRight size={16} /></Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-slate-700/50 pt-6">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400"><ShieldCheck size={15} className="text-emerald-300" /> Explicit scan outcomes</div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400"><Fingerprint size={15} className="text-cyan-300" /> SHA-256 file identity</div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400"><TerminalSquare size={15} className="text-violet-300" /> Analyst-first workflow</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[30px] bg-cyan-300/[.06] blur-2xl" />
            <div className="tf-marketing-card relative overflow-hidden p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                <div className="flex items-center gap-2"><div className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-300/10 text-cyan-200"><ShieldCheck size={17}/></div><div><p className="text-[11px] font-extrabold tracking-wider text-white">THREATFORGE XDR</p><p className="text-[9px] text-slate-500">ANALYST WORKSPACE PREVIEW</p></div></div>
                <span className="tf-chip !text-[9px]">INTERFACE PREVIEW</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5 py-4">
                {[{label:"File intake",value:"12 GB",icon:FolderUp},{label:"Hashing",value:"SHA-256",icon:Fingerprint},{label:"Detection",value:"Multi-engine",icon:Radar}].map(({label,value,icon:Icon})=><div key={label} className="rounded-xl border border-slate-700/50 bg-[#0a1422] p-3"><Icon size={15} className="text-cyan-300"/><p className="mt-3 text-[9px] font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-1 text-xs font-extrabold text-slate-100">{value}</p></div>)}
              </div>
              <div className="rounded-xl border border-slate-700/50 bg-[#0a1422] p-4">
                <div className="flex items-center justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Inspection pipeline</p><p className="mt-1 text-[9px] text-slate-600">Conceptual workflow</p></div><span className="tf-chip !border-emerald-300/15 !text-emerald-200">4 stages</span></div>
                <div className="mt-5 space-y-3">
                  {[{name:"Upload manifest",detail:"File and folder intake",state:"READY",color:"text-cyan-200",icon:FolderUp},{name:"SHA-256 fingerprint",detail:"Streaming hash calculation",state:"READY",color:"text-cyan-200",icon:Fingerprint},{name:"ClamAV signatures",detail:"Signature-based inspection",state:"ENGINE",color:"text-emerald-200",icon:ShieldCheck},{name:"YARA rules",detail:"Configured pattern matching",state:"RULES",color:"text-violet-200",icon:Radar}].map(({name,detail,state,color,icon:Icon},i)=><div key={name} className="flex items-center gap-3"><div className="grid h-8 w-8 flex-none place-items-center rounded-lg border border-slate-700 bg-slate-800/70 text-slate-300"><Icon size={15}/></div><div className="min-w-0 flex-1"><p className="text-[11px] font-bold text-slate-200">{name}</p><p className="text-[9px] text-slate-500">{detail}</p></div><span className={`text-[8px] font-extrabold tracking-widest ${color}`}>{state}</span>{i<3&&<ArrowDownRight size={12} className="hidden text-slate-700"/>}</div>)}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl border border-amber-300/10 bg-amber-300/[.04] px-3 py-2.5"><span className="text-[9px] font-semibold text-slate-400">A scan result is only as complete as its configured engines and limits.</span><span className="text-[9px] font-extrabold text-amber-200">HONEST VERDICTS</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-700/40 bg-white/[.015] py-6">
        <div className="tf-marketing-container flex flex-wrap items-center justify-between gap-4">
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-slate-600">Built around a practical detection stack</p>
          <div className="flex flex-wrap gap-2"><span className="tf-chip">SHA-256</span><span className="tf-chip">ClamAV</span><span className="tf-chip">YARA</span><span className="tf-chip">FastAPI</span><span className="tf-chip">React</span></div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="tf-marketing-container">
          <div className="max-w-2xl"><p className="tf-eyebrow">Platform capabilities</p><h2 className="mt-4 text-3xl font-extrabold tracking-[-.04em] text-white sm:text-4xl">A clearer path from intake to investigation.</h2><p className="mt-4 text-sm leading-7 text-slate-400">A focused set of security workflows designed to make file scanning and alert review easier to operate.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {capabilities.map(({icon:Icon,code,title,text})=><article key={title} className="tf-marketing-card group p-5 transition hover:-translate-y-1 hover:border-cyan-300/30"><div className="tf-feature-icon"><Icon size={19}/></div><p className="mt-6 text-[9px] font-extrabold tracking-[.17em] text-cyan-300">{code}</p><h3 className="mt-2 text-[15px] font-extrabold text-white">{title}</h3><p className="mt-3 text-xs leading-6 text-slate-400">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="tf-marketing-container">
          <div className="tf-marketing-card relative overflow-hidden p-7 sm:p-10">
            <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-emerald-300/[.07] blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <div className="max-w-2xl"><p className="tf-eyebrow">Start with the console</p><h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Bring your security workflow into focus.</h2><p className="mt-3 text-sm leading-7 text-slate-400">Sign in to review alerts, inspect upload jobs and explore the current detection workflow.</p></div>
              <Link to="/login" className="tf-button flex-none">Open workspace <ArrowUpRight size={16}/></Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingFrame>
  );
}
