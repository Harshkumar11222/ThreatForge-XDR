
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import FAQItem from "./FAQItem";

const faqs = [
  {
    question: "What is ThreatForge XDR?",
    answer:
      "ThreatForge is an AI-powered Extended Detection and Response platform designed to monitor, detect and respond to cyber threats.",
  },
  {
    question: "Does it support cloud environments?",
    answer:
      "Yes. The platform is designed to monitor cloud infrastructure, endpoints and network activity.",
  },
  {
    question: "Is AI used for threat detection?",
    answer:
      "Yes. AI assists with threat analysis, prioritization and investigation workflows.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#0b1f1f] py-12 text-white lg:py-16"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-400/5 blur-[120px]" />

      <Container>
        <div className="relative z-10">
          <SectionTitle
            badge="FAQ"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about ThreatForge."
          />

          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
