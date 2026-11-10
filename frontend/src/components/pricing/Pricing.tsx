
export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "For learning and small security environments.",
      features: [
        "Basic Threat Detection",
        "Security Dashboard",
        "Alert Monitoring",
        "Basic Reports",
      ],
    },
    {
      name: "Professional",
      price: "$49",
      description: "For growing security teams and SOC environments.",
      features: [
        "Advanced Threat Detection",
        "Real-Time Monitoring",
        "AI Threat Analysis",
        "Security Analytics",
        "Priority Support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations requiring advanced security operations.",
      features: [
        "Enterprise XDR",
        "Advanced Analytics",
        "Custom Integrations",
        "SOC Workflows",
        "Dedicated Support",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#0b1f1f] px-6 py-12 text-white lg:py-16"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-400/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-teal-300/20 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-300">
            Pricing
          </span>

          <h2 className="mt-6 text-4xl font-extrabold md:text-5xl">
            Security that scales with
            <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              {" "}your team
            </span>
          </h2>

          <p className="mt-5 text-slate-400">
            Choose the security plan that fits your environment.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border p-8 transition duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? "border-teal-300/40 bg-[#113b38] shadow-2xl shadow-teal-400/10"
                  : "border-cyan-300/10 bg-[#113333] hover:border-teal-300/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute right-6 top-6 rounded-full bg-teal-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#062222]">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-white">
                {plan.name}
              </h3>

              <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-400">
                {plan.description}
              </p>

              <div className="mt-8">
                <span className="text-4xl font-extrabold text-white">
                  {plan.price}
                </span>

                {plan.price !== "Custom" && (
                  <span className="ml-2 text-sm text-slate-500">
                    /month
                  </span>
                )}
              </div>

              <button
                type="button"
                className={`mt-8 w-full rounded-xl py-3 font-semibold transition ${
                  plan.popular
                    ? "bg-teal-400 text-[#062222] hover:bg-teal-300"
                    : "border border-teal-300/20 bg-teal-400/5 text-teal-300 hover:bg-teal-400/10"
                }`}
              >
                Get Started
              </button>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-400/10 text-xs text-teal-300">
                      ✓
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
