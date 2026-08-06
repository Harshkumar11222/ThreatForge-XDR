import Container from "../ui/Container";
import DashboardHeader from "./DashboardHeader";
import ThreatStats from "./ThreatStats";
import ActivityFeed from "./ActivityFeed";

export default function DashboardShowcase() {
  return (
    <section className="py-32">
      <Container>

        <div className="rounded-3xl border border-slate-800 bg-[#111827]/80 p-8">

          <DashboardHeader />

          <ThreatStats />

          <ActivityFeed />

        </div>

      </Container>
    </section>
  );
}