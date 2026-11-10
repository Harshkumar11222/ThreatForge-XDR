import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "../footer/Footer";

export default function MarketingFrame({ children }: { children: ReactNode }) {
  return <div className="tf-marketing min-h-screen"><Navbar /><main>{children}</main><Footer /></div>;
}
