import { Link } from "react-router-dom";
import { ShieldCheck, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-800 bg-[#030712]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
            <ShieldCheck size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              ThreatForge
            </h1>

            <p className="text-xs text-cyan-400">
              XDR Platform
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 lg:flex">
          <a
            href="#features"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            Pricing
          </a>

          <a
            href="#docs"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            Docs
          </a>

          <a
            href="#about"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            Contact
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 transition hover:border-cyan-400">
            <Search size={18} className="text-slate-300" />
          </button>

          <Link
            to="/login"
            className="text-slate-300 transition hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-500"
          >
            Get Started
          </Link>

        </div>
      </div>
    </header>
  );
}