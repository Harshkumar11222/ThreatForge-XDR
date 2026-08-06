import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import PricingCard from "./PricingCard";

const plans = [
  {
    title: "Starter",
    price: "Free",
    description: "Perfect for learning.",
    features: [
      "Dashboard",
      "Basic Alerts",
      "Community Support",
    ],
  },
  {
    title: "Professional",
    price: "₹999/mo",
    description: "Best for small teams.",
    highlighted: true,
    features: [
      "AI Threat Detection",
      "Realtime Monitoring",
      "Unlimited Alerts",
    ],
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "For organizations.",
    features: [
      "SOC Dashboard",
      "24/7 Support",
      "Threat Intelligence",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="py-32">
      <Container>

        <SectionTitle
          badge="Pricing"
          title="Choose Your Security Plan"
          subtitle="Flexible plans for students, professionals and enterprises."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
            />
          ))}
        </div>

      </Container>
    </section>
  );
}