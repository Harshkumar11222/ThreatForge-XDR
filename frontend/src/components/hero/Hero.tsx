import { ShieldCheck, ArrowRight, PlayCircle } from "lucide-react";
import Button from "../ui/Button";
import Container from "../ui/Container";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0b1f1f] py-24 lg:flex lg:min-h-screen lg:items-center">

      {/* Cyber Grid */}
      <div
        className="
          absolute inset-0 -z-20
          bg-[linear-gradient(rgba(94,234,212,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(94,234,212,0.035)_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />

      {/* Center Teal Glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/10 blur-[120px]" />

      {/* Top Right Glow */}
      <div className="absolute right-20 top-20 -z-10 h-72 w-72 rounded-full bg-cyan-300/5 blur-[110px]" />

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-[-100px] -z-10 h-80 w-80 rounded-full bg-teal-400/5 blur-[120px]" />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-300">
              <ShieldCheck size={18} />
              AI Powered Cyber Defense
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-7xl">

              <span className="text-white">
                AI-Powered
              </span>

              <br />

              {/* Direct Teal color - guaranteed visible */}
              <span className="text-teal-300">
                Cyber Defense
              </span>

              <br />

              <span className="text-white">
                Platform
              </span>

            </h1>

            {/* Description */}
            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
              Detect, investigate and respond to cyber threats from a
              single AI-powered security platform built for modern SOC teams.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-5">

              <Button className="px-8 py-6">
                Get Started
                <ArrowRight className="ml-2" size={18} />
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("dashboard")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <PlayCircle className="mr-2" size={18} />
                Watch Demo
              </Button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">

            {/* Dashboard Glow */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-teal-400/10 blur-3xl" />

            <DashboardPreview />

          </div>

        </div>
      </Container>

    </section>
  );
}