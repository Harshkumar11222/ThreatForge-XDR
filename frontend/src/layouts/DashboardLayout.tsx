import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="tf-main-column">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="tf-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
