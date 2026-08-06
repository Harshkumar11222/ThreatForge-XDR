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
    <div className="rounded-3xl border border-slate-800 bg-[#111827]/80 p-8 hover:border-cyan-500 transition-all duration-300">

      <div className="flex gap-1 text-yellow-400">
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
      </div>

      <p className="mt-6 text-slate-300 leading-7">
        "{quote}"
      </p>

      <div className="mt-8">
        <h3 className="font-semibold text-white">
          {name}
        </h3>

        <p className="text-slate-400 text-sm">
          {role}
        </p>
      </div>

    </div>
  );
}