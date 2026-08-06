import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group rounded-3xl border border-slate-800 bg-[#111827]/80 p-8  transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10">

      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-white">
        <Icon size={28} />
      </div>

      <h3 className="text-2xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-400">
        {description}
      </p>

      <button className="mt-8 flex items-center gap-2 text-cyan-400 transition-all group-hover:gap-3">
        Learn More
        <ArrowRight size={18} />
      </button>

    </div>
  );
}