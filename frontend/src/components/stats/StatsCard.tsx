interface StatsCardProps {
  value: string;
  label: string;
}

export default function StatsCard({
  value,
  label,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111827]/80 p-6 text-center transition-all duration-300 hover:border-cyan-500 hover:-translate-y-1">
      <h3 className="text-4xl font-bold text-cyan-400">
        {value}
      </h3>

      <p className="mt-3 text-slate-400">
        {label}
      </p>
    </div>
  );
}