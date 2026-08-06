import Navbar from "../../components/layout/Navbar";
import PageWrapper from "../../components/layout/PageWrapper";
import Hero from "../../components/hero";
import TrustedCompanies from "../../components/trusted-companies";
import Stats from "../../components/stats";
import Features from "../../components/features";
import DashboardShowcase from "../../components/dashboard";
import Testimonials from "../../components/testimonials";
import FAQ from "../../components/faq";
import Footer from "../../components/footer";
import Pricing from "../../components/pricing";

export default function Home() {
  return (
    <PageWrapper>
      <Navbar />
      <Hero />
      <TrustedCompanies />
      <Stats />
      <Features />
      <DashboardShowcase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </PageWrapper>
  );
}