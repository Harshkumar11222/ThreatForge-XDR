
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
    <section className="relative overflow-hidden bg-[#0b1f1f] py-12 text-white lg:py-16">
      <div className="pointer-events-none absolute left-1/2 top-20 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-400/5 blur-[120px]" />

      <Container>
        <div className="relative z-10">
          <SectionTitle
            badge="Testimonials"
            title="What Security Professionals Think"
            subtitle="Illustrative demo testimonials showcasing the intended user experience."
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
