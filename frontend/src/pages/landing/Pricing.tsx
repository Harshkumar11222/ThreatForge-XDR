import { Check, Layers3, ShieldCheck, Users } from "lucide-react";
import MarketingFrame from "../../components/layout/MarketingFrame";

const tiers = [
  { icon: Layers3, name: "Developer", description: "For local learning and individual testing.", items: ["Local XDR console", "File and folder upload workflow", "SHA-256, ClamAV and YARA integration", "Local alert review"], note: "Project / development use" },
  { icon: Users, name: "SOC team", description: "For a small analyst group evaluating the workflow.", items: ["Shared investigation workflow", "Scan-result review", "Alert triage and analytics", "Deployment and access review"], note: "Pilot scope to be defined" },
  { icon: ShieldCheck, name: "Enterprise", description: "For production requirements and governance planning.", items: ["Deployment architecture review", "Identity and access design", "Retention and audit requirements", "Operational support planning"], note: "Custom scope required" },
];

export default function Pricing() {
  return <MarketingFrame>
    <section className="py-20 sm:py-24">
      <div className="tf-marketing-container">
        <div className="mx-auto max-w-2xl text-center"><p className="tf-eyebrow">Plans / deployment scope</p><h1 className="mt-4 text-4xl font-extrabold tracking-[-.05em] text-white sm:text-5xl">Choose the right operating scope.</h1><p className="mt-5 text-sm leading-7 text-slate-400">ThreatForge is currently presented as a project-stage platform. Commercial prices and production service commitments have not been published for this build.</p></div>
        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
          {tiers.map(({ icon: Icon, name, description, items, note }, index) => <article key={name} className={`tf-marketing-card flex flex-col p-6 ${index === 1 ? "border-cyan-300/30 shadow-[0_0_45px_rgba(75,220,255,.08)]" : ""}`}><span className="tf-feature-icon"><Icon size={19}/></span><h2 className="mt-6 text-xl font-extrabold text-white">{name}</h2><p className="mt-2 min-h-12 text-xs leading-6 text-slate-400">{description}</p><div className="my-6 border-y border-slate-700/50 py-4"><p className="text-sm font-extrabold text-cyan-200">{note}</p><p className="mt-1 text-[10px] text-slate-600">No published subscription price</p></div><ul className="flex-1 space-y-3">{items.map((item) => <li key={item} className="flex gap-2.5 text-xs text-slate-300"><Check size={15} className="mt-0.5 flex-none text-emerald-300"/>{item}</li>)}</ul></article>)}
        </div>
        <p className="mt-7 text-center text-[10px] leading-5 text-slate-600">Feature availability depends on the installed backend, configured rules, scan limits and deployment environment.</p>
      </div>
    </section>
  </MarketingFrame>;
}
