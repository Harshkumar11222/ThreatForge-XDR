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
    <section className="py-32">
      <Container>

        <SectionTitle
          badge="Platform Features"
          title="Everything You Need To Defend Your Organization"
          subtitle="ThreatForge combines AI, automation and threat intelligence into one powerful cybersecurity platform."
        />

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </Container>
      <section id="dashboard"></section>
    </section>
  );
}