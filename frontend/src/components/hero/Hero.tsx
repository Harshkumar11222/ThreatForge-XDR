import { ShieldCheck, ArrowRight, PlayCircle } from "lucide-react";
import Button from "../ui/Button";
import Container from "../ui/Container";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 lg:min-h-screen lg:flex lg:items-center">

      {/* Cyber Grid */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Top Right Glow */}
      <div className="absolute right-20 top-20 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-400">
              <ShieldCheck size={18} />
              AI Powered Cyber Defense
            </div>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-7xl">
              <span className="text-white">
                AI-Powered
              </span>

              <br />

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Cyber Defense
              </span>

              <br />

              <span className="text-white">
                Platform
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
              Detect, investigate and respond to cyber threats from a
              single AI-powered security platform built for modern SOC teams.
            </p>

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
            <DashboardPreview />
          </div>

        </div>
      </Container>

    </section>
  );
}