import React, { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";

import "../css/style.css";
import "../charts/ChartjsConfig";

import Sidebar from "../components/Sidebar";
import PageHeader from "../components/PageHeader";
import Banner from "../components/Banner";

export default function MainLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html.style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    html.style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <PageHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          title="Sistem Informasi Pengolahan MBG"
          description="Ringkasan data produksi, stok bahan, absensi pegawai, dan laporan operasional bagian pengolahan."
          badge="MBG"
        />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-9xl mx-auto">
            <Outlet />
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}