import { useEffect, useState } from "react";
import { Check, Database, KeyRound, MonitorCog, Save, Server, ShieldCheck, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

interface Preferences { compactTables: boolean; reduceMotion: boolean; }
const defaults: Preferences = { compactTables: false, reduceMotion: false };

export default function Settings() {
  const [preferences, setPreferences] = useState<Preferences>(defaults);
  const [saved, setSaved] = useState(false);
  const apiBase = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tf-preferences");
      if (stored) setPreferences({ ...defaults, ...JSON.parse(stored) });
    } catch { /* Defaults are safe when local settings are unreadable. */ }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("tf-compact-tables", preferences.compactTables);
    document.documentElement.classList.toggle("tf-reduce-motion", preferences.reduceMotion);
  }, [preferences]);

  function toggle(key: keyof Preferences) {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
    setSaved(false);
  }

  function save() {
    localStorage.setItem("tf-preferences", JSON.stringify(preferences));
    setSaved(true);
    toast.success("Browser preferences saved.");
  }

  return <div className="space-y-6">
    <div className="tf-page-head"><div><p className="tf-eyebrow">Workspace / configuration</p><h1 className="tf-title mt-2">Settings</h1><p className="tf-subtitle mt-2">Manage this browser’s console preferences and view the local API configuration.</p></div><button className="tf-button" onClick={save}><Save size={14}/> Save preferences</button></div>

    <section className="tf-section p-5 sm:p-6">
      <div className="flex items-center gap-3"><span className="tf-feature-icon"><MonitorCog size={18}/></span><div><h2 className="text-sm font-extrabold text-white">Interface preferences</h2><p className="mt-1 text-[10px] text-slate-500">These options apply to this browser only.</p></div></div>
      <div className="mt-5 divide-y divide-slate-700/50">
        {[{key:"compactTables" as const,title:"Compact table density",text:"Reduce row spacing in alert and scan-history tables.",icon:Database},{key:"reduceMotion" as const,title:"Reduce interface motion",text:"Disable most transitions and animations across the console.",icon:Sparkles}].map(({key,title,text,icon:Icon})=><div key={key} className="flex items-center justify-between gap-5 py-4"><div className="flex items-start gap-3"><Icon size={16} className="mt-0.5 text-slate-400"/><div><p className="text-xs font-bold text-slate-200">{title}</p><p className="mt-1 text-[10px] text-slate-500">{text}</p></div></div><button role="switch" aria-checked={preferences[key]} onClick={() => toggle(key)} className={`relative h-6 w-11 flex-none rounded-full border transition ${preferences[key] ? "border-cyan-300/40 bg-cyan-300/20" : "border-slate-600 bg-slate-800"}`}><span className={`absolute top-0.5 h-4 w-4 rounded-full transition ${preferences[key] ? "left-[22px] bg-cyan-200" : "left-0.5 bg-slate-500"}`}/></button></div>)}
      </div>
      {saved && <p className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-200"><Check size={14}/> Saved in this browser.</p>}
    </section>

    <section className="tf-section p-5 sm:p-6">
      <div className="flex items-center gap-3"><span className="tf-feature-icon"><Server size={18}/></span><div><h2 className="text-sm font-extrabold text-white">Connection information</h2><p className="mt-1 text-[10px] text-slate-500">Values used by this frontend build.</p></div></div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4"><p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-600">API base URL</p><p className="tf-mono mt-2 break-all text-xs text-cyan-100">{apiBase}</p></div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4"><p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-600">Authentication</p><p className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-200"><KeyRound size={14} className="text-emerald-200"/> Bearer token from local sign-in</p></div>
      </div>
    </section>

    <div className="flex gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[.035] p-4"><ShieldCheck size={16} className="mt-0.5 flex-none text-amber-200"/><p className="text-[10px] leading-5 text-slate-400">This page controls visual preferences only. It does not change server-side security policy, ClamAV configuration, YARA rules or account permissions.</p></div>
  </div>;
}
