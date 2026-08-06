import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Alex Morgan",
    role: "SOC Manager (Demo)",
    quote:
      "ThreatForge provides a clean and modern interface for monitoring security events.",
  },
  {
    name: "Sarah Wilson",
    role: "Security Analyst (Demo)",
    quote:
      "The dashboard is intuitive and gives excellent visibility into security operations.",
  },
  {
    name: "David Lee",
    role: "Blue Team Engineer (Demo)",
    quote:
      "The AI-driven workflow has great potential for faster incident response.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-32">
      <Container>

        <SectionTitle
          badge="Testimonials"
          title="What Security Professionals Think"
          subtitle="Illustrative demo testimonials showcasing the intended user experience."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (
            <TestimonialCard
              key={item.name}
              {...item}
            />
          ))}

        </div>

      </Container>
    </section>
  );
}