import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Menu, ShieldCheck, X } from "lucide-react";

const links = [
  ["Platform", "/features"],
  ["Pricing", "/pricing"],
  ["Documentation", "/docs"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="tf-marketing-nav">
      <div className="tf-marketing-container flex h-[76px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 shadow-[0_0_26px_rgba(75,220,255,.1)]"><ShieldCheck size={22} /></span>
          <span><span className="block text-[14px] font-extrabold tracking-[.13em] text-white">THREATFORGE</span><span className="mt-0.5 block text-[9px] font-extrabold tracking-[.3em] text-cyan-300">EXTENDED DETECTION & RESPONSE</span></span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([label, path]) => <NavLink key={path} to={path} className={({ isActive }) => `text-[12px] font-bold transition ${isActive ? "text-cyan-200" : "text-slate-400 hover:text-white"}`}>{label}</NavLink>)}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login" className="px-3 py-2 text-xs font-extrabold text-slate-300 hover:text-white">Sign in</Link>
          <Link to="/register" className="tf-button">Open console <ArrowUpRight size={15} /></Link>
        </div>

        <button className="rounded-xl border border-slate-700/70 p-2.5 text-slate-300 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {open && <div className="border-t border-slate-700/50 bg-[#0b1422] px-5 py-4 lg:hidden">
        <nav className="mx-auto flex max-w-6xl flex-col gap-1">
          {links.map(([label, path]) => <NavLink key={path} onClick={() => setOpen(false)} to={path} className="rounded-lg px-3 py-3 text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white">{label}</NavLink>)}
          <div className="mt-2 flex gap-2 border-t border-slate-700/50 pt-3"><Link onClick={() => setOpen(false)} to="/login" className="tf-button-secondary flex-1">Sign in</Link><Link onClick={() => setOpen(false)} to="/register" className="tf-button flex-1">Open console</Link></div>
        </nav>
      </div>}
    </header>
  );
}
