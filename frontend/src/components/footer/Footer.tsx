import {
  ShieldCheck,
  Mail,
  Globe,
} from "lucide-react";
import Container from "../ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#030712] py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-4">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-cyan-400" size={28} />

              <div>
                <h2 className="text-xl font-bold text-white">
                  ThreatForge
                </h2>

                <p className="text-sm text-slate-400">
                  AI Powered XDR
                </p>
              </div>
            </div>

            <p className="mt-6 leading-7 text-slate-400">
              Modern AI-powered cybersecurity platform built for monitoring,
              detection and incident response.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white">
              Product
            </h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>Features</li>
              <li>Dashboard</li>
              <li>Pricing</li>
              <li>Documentation</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white">
              Resources
            </h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>Blog</li>
              <li>FAQ</li>
              <li>Support</li>
              <li>Community</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white">
              Connect
            </h3>

            <div className="mt-5 flex gap-4">

<Globe className="cursor-pointer text-slate-400 hover:text-white" />
              {/* <Linkedin className="cursor-pointer text-slate-400 hover:text-white" /> */}

              <Mail className="cursor-pointer text-slate-400 hover:text-white" />

            </div>

            <p className="mt-6 text-slate-500 text-sm">
              © 2026 ThreatForge. All Rights Reserved.
            </p>

          </div>

        </div>
      </Container>
    </footer>
  );
}