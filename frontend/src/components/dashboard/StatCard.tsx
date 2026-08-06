import CountUp from "react-countup";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number | string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  trend: "up" | "down";
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
}: Props) {
  return (
    <div className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {typeof value === "number" ? (
              <CountUp end={value} duration={1.5} />
            ) : (
              value
            )}

          </h2>

          <div className="mt-3 flex items-center gap-2">

            {trend === "up" ? (
              <ArrowUpRight className="text-emerald-400" size={18} />
            ) : (
              <ArrowDownRight className="text-red-400" size={18} />
            )}

            <span className="text-sm text-slate-400">
              {subtitle}
            </span>

          </div>

        </div>

        <div
          className={`rounded-2xl p-4 ${color}`}
        >
          <Icon size={32} className="text-white" />
        </div>

      </div>

    </div>
  );
}