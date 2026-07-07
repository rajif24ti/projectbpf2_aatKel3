import React, { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom"; // Tambahkan Outlet di sini

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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar tetap ada di setiap halaman dashboard */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <PageHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          title="Sistem Informasi Pengolahan MBG"
          description="Ringkasan data produksi, stok bahan, absensi pegawai, dan laporan operasional bagian pengolahan."
          badge="MBG"
        />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* PENTING: <Outlet /> akan merender komponen Dashboard, Absensi, dll. 
               sesuai dengan rute yang aktif di App.jsx 
            */}
            <Outlet />
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}