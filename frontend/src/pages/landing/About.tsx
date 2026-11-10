import { Activity, Crosshair, Eye, ShieldCheck } from "lucide-react";
import MarketingFrame from "../../components/layout/MarketingFrame";

export default function About() {
  return <MarketingFrame>
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="tf-grid-bg pointer-events-none absolute inset-0" />
      <div className="tf-marketing-container relative">
        <p className="tf-eyebrow">About / ThreatForge XDR</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-[-.05em] text-white sm:text-5xl">Security workflows should show their work.</h1>
        <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-400">ThreatForge XDR is a project-stage security operations platform focused on file inspection, integrity evidence and alert triage. Its goal is to make the inspection path visible: what was uploaded, what was hashed, which engines ran and what each engine reported.</p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {[{icon:Eye,title:"Visibility first",text:"Keep file identity, scan state and alert context available to the analyst."},{icon:Crosshair,title:"Evidence over guesses",text:"Do not treat an extension or a missing scan result as proof of malware."},{icon:ShieldCheck,title:"Layered inspection",text:"Combine signature-based scanning and configured YARA rules with explicit limitations."},{icon:Activity,title:"Operational clarity",text:"Separate findings from errors, skipped files and incomplete work."}].map(({icon:Icon,title,text})=><div key={title} className="tf-marketing-card p-6"><span className="tf-feature-icon"><Icon size={19}/></span><h2 className="mt-5 text-lg font-extrabold text-white">{title}</h2><p className="mt-2 text-xs leading-6 text-slate-400">{text}</p></div>)}
        </div>
      </div>
    </section>
  </MarketingFrame>;
}
