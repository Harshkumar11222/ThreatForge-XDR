interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
}

export default function SectionTitle({
  badge,
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="max-w-3xl">

      {badge && (
        <span className="inline-flex px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
          {badge}
        </span>
      )}

      <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-5 text-slate-400 text-lg leading-8">
          {subtitle}
        </p>
      )}

    </div>
  );
}