interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  highlighted,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 ${
        highlighted
          ? "border-cyan-500 bg-cyan-500/10"
          : "border-slate-800 bg-[#111827]/80"
      }`}
    >
      <h3 className="text-2xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-4 text-5xl font-extrabold text-cyan-400">
        {price}
      </p>

      <p className="mt-3 text-slate-400">
        {description}
      </p>

      <ul className="mt-8 space-y-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="text-slate-300"
          >
            ✔ {feature}
          </li>
        ))}
      </ul>

      <button className="mt-8 w-full rounded-xl bg-blue-600 py-3 text-white transition hover:bg-blue-500">
        Get Started
      </button>
    </div>
  );
}