import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
}

export default function TestimonialCard({
  name,
  role,
  quote,
}: TestimonialCardProps) {
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
      {/* Stars */}
      <div className="flex gap-1 text-amber-300">
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
      </div>

      {/* Quote */}
      <p className="mt-6 leading-7 text-slate-300">
        "{quote}"
      </p>

      {/* User */}
      <div className="mt-8">
        <h3 className="font-semibold text-white transition-colors group-hover:text-teal-200">
          {name}
        </h3>

        <p className="mt-1 text-sm text-teal-300/80">
          {role}
        </p>
      </div>
    </div>
  );
}