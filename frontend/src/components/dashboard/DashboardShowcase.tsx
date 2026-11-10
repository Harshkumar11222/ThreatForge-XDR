import Container from "../ui/Container";
import DashboardHeader from "./DashboardHeader";
import ThreatStats from "./ThreatStats";
import ActivityFeed from "./ActivityFeed";

export default function DashboardShowcase({
  onScanComplete = () => {},
}: {
  onScanComplete?: () => void;
}) {  return (
    <section className="relative overflow-hidden bg-[#0b1f1f] py-12 text-white lg:py-16">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/5 blur-[130px]" />

      <Container>
        <div
          className="
            relative z-10
            rounded-3xl
            border border-cyan-300/10
            bg-[#113333]
            p-6
            shadow-2xl shadow-teal-400/5
            transition-all duration-300
            hover:border-teal-300/20
            sm:p-8
          "
        >

          <DashboardHeader onScanComplete={onScanComplete} />
          
          <ThreatStats />

          <ActivityFeed />

        </div>
      </Container>

    </section>
  );
}