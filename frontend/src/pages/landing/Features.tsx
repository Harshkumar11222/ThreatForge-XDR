import { Activity, Fingerprint, FolderUp, ScanSearch, ShieldAlert, SlidersHorizontal } from "lucide-react";
import MarketingFrame from "../../components/layout/MarketingFrame";

const features = [
  { icon: FolderUp, title: "Chunked file intake", tag: "INGESTION", text: "Prepare individual files or directory manifests for upload. The upload API enforces a combined 12 GB job limit and accepts sequential chunks." },
  { icon: Fingerprint, title: "SHA-256 identity", tag: "INTEGRITY", text: "Calculate file fingerprints using a streaming read, avoiding the need to load an entire large file into memory." },
  { icon: ShieldAlert, title: "ClamAV inspection", tag: "SIGNATURES", text: "Run the local ClamAV engine against its configured signature database and preserve scan errors or limit alerts as distinct outcomes." },
  { icon: ScanSearch, title: "YARA rule matching", tag: "PATTERNS", text: "Compile local YARA rules and record the names of matching rules. A rule match is treated as suspicious, not automatic proof of malware." },
  { icon: Activity, title: "Alert triage", tag: "OPERATIONS", text: "Present scanner findings with severity, risk score, file name and source so analysts can prioritize review." },
  { icon: SlidersHorizontal, title: "Explicit scan states", tag: "VISIBILITY", text: "Separate Clean, Suspicious, Malicious, Scan Error and Not Scanned outcomes instead of treating incomplete scans as clean." },
];

export default function Features() {
  return <MarketingFrame>
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="tf-grid-bg pointer-events-none absolute inset-0" />
      <div className="tf-marketing-container relative">
        <p className="tf-eyebrow">Platform / capabilities</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-[-.05em] text-white sm:text-5xl">The building blocks of a focused XDR workflow.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">ThreatForge brings together file intake, integrity checks, signature scanning, rule matching and alert review. Each engine reports its own result so the analyst can see what actually ran.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map(({ icon: Icon, title, tag, text }, index) => <article key={title} className="tf-marketing-card p-6"><div className="flex items-start justify-between"><span className="tf-feature-icon"><Icon size={19}/></span><span className="text-[10px] font-extrabold tracking-[.18em] text-slate-600">0{index + 1}</span></div><p className="mt-6 text-[9px] font-extrabold tracking-[.18em] text-cyan-300">{tag}</p><h2 className="mt-2 text-lg font-extrabold text-white">{title}</h2><p className="mt-3 text-xs leading-6 text-slate-400">{text}</p></article>)}
        </div>
      </div>
    </section>
  </MarketingFrame>;
}
