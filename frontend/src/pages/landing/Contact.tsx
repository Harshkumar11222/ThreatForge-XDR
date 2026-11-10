import { ArrowUpRight, BookOpen, Code2, ShieldCheck } from "lucide-react";
import MarketingFrame from "../../components/layout/MarketingFrame";

export default function Contact() {
  return <MarketingFrame>
    <section className="py-20 sm:py-24">
      <div className="tf-marketing-container grid gap-12 lg:grid-cols-[1fr_.85fr]">
        <div><p className="tf-eyebrow">Contact / project workspace</p><h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-[-.05em] text-white sm:text-5xl">Let’s make the security workflow clearer.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">This project build does not include a connected contact-form backend. For technical questions, use the local API documentation or the repository and project maintainer channels configured for your deployment.</p>
          <a href="http://127.0.0.1:8000/docs" target="_blank" rel="noreferrer" className="tf-button mt-8">Open local API docs <ArrowUpRight size={15}/></a>
        </div>
        <div className="tf-marketing-card p-6 sm:p-8"><div className="space-y-6">{[{icon:BookOpen,title:"API documentation",text:"Review the available FastAPI routes and request schemas."},{icon:Code2,title:"Development setup",text:"Run the frontend and backend locally to test the current project build."},{icon:ShieldCheck,title:"Security notes",text:"Treat scan results according to the engine output and its configured limits."}].map(({icon:Icon,title,text})=><div key={title} className="flex gap-4"><span className="tf-feature-icon flex-none"><Icon size={18}/></span><div><h2 className="text-sm font-extrabold text-white">{title}</h2><p className="mt-1 text-xs leading-6 text-slate-400">{text}</p></div></div>)}</div></div>
      </div>
    </section>
  </MarketingFrame>;
}
