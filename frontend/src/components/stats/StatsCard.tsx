interface StatsCardProps {
  value: string;
  label: string;
}

export default function StatsCard({
  value,
  label,
}: StatsCardProps) {
  return (
    <div
      className="
        group
        rounded-2xl
        border border-cyan-300/10
        bg-red-600
        p-6
        text-center
        transition-all duration-300
        hover:-translate-y-1
        hover:border-teal-300/30
        hover:bg-[#16403d]
        hover:shadow-xl
        hover:shadow-teal-400/10
      "
    >
      {/* Number */}
      <h3
        className="
          bg-gradient-to-r
          from-teal-300
          via-cyan-300
          to-teal-400
          bg-clip-text
          text-4xl
          font-bold
          text-transparent
        "
      >
        {value}
      </h3>

      {/* Label */}
      <p className="mt-3 text-sm text-slate-400">
        {label}
      </p>
    </div>
  );
}