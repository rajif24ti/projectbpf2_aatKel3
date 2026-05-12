import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Import CSS yang sama agar styling konsisten
import "../css/style.css";
import Banner from "../components/Banner";

export default function AuthLayout() {
  const location = useLocation();

  // Efek scroll to top yang sama dengan MainLayout
  useEffect(() => {
    const html = document.querySelector("html");
    html.style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    html.style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Konten Utama */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        
        <main className="grow">
          <div className="flex flex-col min-h-screen justify-center items-center px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            
            {/* Card Container yang mirip dengan gaya template */}
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
              {/* Logo / Brand Section */}
              <div className="flex items-center justify-center mb-6">
                <h1 className="text-4xl font-poppins font-extrabold text-gray-800">
                  <span className="text-black">MBG</span>
                  <span className="text-green-500">.</span>
                </h1>
              </div>

              {/* Tempat Form Login / Register (Outlet) */}
              <Outlet />

              {/* Footer di dalam card */}
              <p className="text-center text-sm text-gray-400 mt-6 pt-6 border-t border-gray-100">
                © 2026 Sistem Informasi MBG Admin Dashboard. <br />
                All rights reserved.
              </p>
            </div>

          </div>
        </main>

        {/* Banner jika ingin ditampilkan di halaman auth juga */}
        <Banner />
      </div>
    </div>
  );
}