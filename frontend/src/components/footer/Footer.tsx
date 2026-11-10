import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="tf-footer py-12">
      <div className="tf-marketing-container">
        <div className="grid gap-10 border-b border-slate-700/50 pb-9 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200"><ShieldCheck size={19}/></span><div><p className="text-xs font-extrabold tracking-[.14em] text-white">THREATFORGE XDR</p><p className="text-[9px] tracking-[.2em] text-slate-500">SECURITY OPERATIONS</p></div></div>
            <p className="mt-4 max-w-sm text-xs leading-6 text-slate-500">A project-stage extended detection and response workspace for file inspection, security alerts and analyst workflows.</p>
          </div>
          <div><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-300">Explore</p><div className="mt-4 grid gap-3 text-xs text-slate-500"><Link className="hover:text-cyan-200" to="/features">Platform features</Link><Link className="hover:text-cyan-200" to="/pricing">Plans</Link><Link className="hover:text-cyan-200" to="/docs">Documentation</Link></div></div>
          <div><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-300">Workspace</p><div className="mt-4 grid gap-3 text-xs text-slate-500"><Link className="hover:text-cyan-200" to="/login">Sign in</Link><Link className="hover:text-cyan-200" to="/register">Create account</Link><Link className="hover:text-cyan-200" to="/about">About ThreatForge</Link></div></div>
        </div>
        <div className="flex flex-col justify-between gap-2 pt-5 text-[10px] text-slate-600 sm:flex-row"><span>© {new Date().getFullYear()} ThreatForge XDR · Project build</span><span>Detect · Investigate · Respond</span></div>
      </div>
    </footer>
  );
}
