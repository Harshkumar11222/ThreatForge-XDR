import Container from "../ui/Container";
import StatsCard from "./StatsCard";

const stats = [
  {
    value: "250+",
    label: "Protected Endpoints",
  },
  {
    value: "99.9%",
    label: "Threat Detection Accuracy",
  },
  {
    value: "24/7",
    label: "AI Monitoring",
  },
  {
    value: "18+",
    label: "Countries Covered",
  },
];

export default function Stats() {
  return (
    <section className="py-24">
      <Container>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item) => (
            <StatsCard
              key={item.label}
              value={item.value}
              label={item.label}
            />
          ))}

        </div>

      </Container>
    </section>
  );
}