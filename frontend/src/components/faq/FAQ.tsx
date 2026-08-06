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
    <section className="py-32">
      <Container>
        <SectionTitle
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about ThreatForge."
        />

        <div className="mt-16 space-y-6">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </Container>
    </section>
  );
}