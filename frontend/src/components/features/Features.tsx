
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import FeatureCard from "./FeatureCard";

import {
  Shield,
  Brain,
  Cloud,
  Activity,
  Globe,
  Monitor,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "AI Threat Detection",
    description:
      "Detect malware, ransomware and suspicious activity using AI-powered analysis.",
  },
  {
    icon: Globe,
    title: "Threat Intelligence",
    description:
      "Stay ahead with real-time threat intelligence and global attack insights.",
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    description:
      "Protect cloud workloads, identities and infrastructure from modern threats.",
  },
  {
    icon: Activity,
    title: "SOAR Automation",
    description:
      "Automate security response and reduce incident response time.",
  },
  {
    icon: Brain,
    title: "AI Security Analyst",
    description:
      "Receive intelligent recommendations and investigation summaries instantly.",
  },
  {
    icon: Monitor,
    title: "Endpoint Protection",
    description:
      "Monitor and secure all connected endpoints from a unified dashboard.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#0b1f1f] py-12 text-white lg:py-16"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-400/5 blur-[120px]" />

      <Container>
        <div className="relative z-10">
          <SectionTitle
            badge="Platform Features"
            title="Everything You Need To Defend Your Organization"
            subtitle="ThreatForge combines AI, automation and threat intelligence into one powerful cybersecurity platform."
          />

          {/* Feature Cards */}
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                {...feature}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
