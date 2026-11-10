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
    <div
      className="
        group rounded-3xl
        border border-cyan-300/10
        bg-[#113333]
        p-8
        transition-all duration-300
        hover:-translate-y-2
        hover:border-teal-300/30
        hover:bg-[#123a38]
        hover:shadow-xl
        hover:shadow-teal-400/10
      "
    >
      {/* Icon */}
      <div
        className="
          mb-6 flex h-14 w-14 items-center justify-center
          rounded-2xl
          border border-teal-300/10
          bg-teal-400/10
          text-teal-300
          transition-all duration-300
          group-hover:border-teal-300/20
          group-hover:bg-teal-400
          group-hover:text-[#062222]
          group-hover:shadow-lg
          group-hover:shadow-teal-400/20
        "
      >
        <Icon size={28} />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-white transition-colors group-hover:text-teal-100">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 leading-7 text-slate-400">
        {description}
      </p>

      {/* Learn More */}
      <button
        type="button"
        className="
          mt-8 flex items-center gap-2
          font-medium text-teal-300
          transition-all duration-300
          group-hover:gap-3
          group-hover:text-teal-200
        "
      >
        Learn More
        <ArrowRight size={18} />
      </button>
    </div>
  );
}