import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import useIsMobile from "../hooks/useIsMobile";

function DashboardLayout() {
  // Two different jobs, one boolean each:
  // - mobileOpen: on small screens the sidebar is an off-canvas drawer
  //   that slides in over the page content. Starts closed.
  // - collapsed: on large screens the sidebar is always visible, but can
  //   be shrunk to an icon-only rail to leave more room for the page.
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isMobile = useIsMobile();

  // Same hamburger button in the Navbar drives both behaviours — which
  // one depends on the current screen size, so the user never has to
  // think about "which toggle does what".
  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 overflow-x-hidden">
      <Navbar onMenuClick={handleToggleSidebar} />

      <div className="flex">
        {/* Sidebar drawer for mobile and fixed/sticky menu for desktop */}
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          collapsed={collapsed}
        />

        {/* Main page content area */}
        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
