import CountUp from "react-countup";
import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
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
    <div
      className="
        group
        rounded-3xl
        border border-teal-300/15
        bg-[#16403d]
        p-6
        transition-all duration-300
        hover:-translate-y-1
        hover:border-teal-300/40
        hover:bg-[#1a4945]
        hover:shadow-xl
        hover:shadow-teal-400/10
      "
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-300">
            {title}
          </p>

          <h2 className="mt-2 bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent">
            {typeof value === "number" ? (
              <CountUp end={value} duration={1.5} />
            ) : (
              value
            )}
          </h2>

          <div className="mt-3 flex items-center gap-2">

            {trend === "up" ? (
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-400/10">
                <ArrowUpRight
                  className="text-emerald-300"
                  size={16}
                />
              </span>
            ) : (
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-400/10">
                <ArrowDownRight
                  className="text-rose-300"
                  size={16}
                />
              </span>
            )}

            <span className="text-sm text-slate-400">
              {subtitle}
            </span>

          </div>
        </div>

        <div
          className={`
            rounded-2xl
            border border-white/5
            p-4
            transition-all duration-300
            group-hover:scale-105
            ${color}
          `}
        >
          <Icon
            size={32}
            className="text-white"
          />
        </div>

      </div>
    </div>
  );
}