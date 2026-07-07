import React, { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";

import "../css/style.css";
import Banner from "../components/Banner";

export default function AuthLayout() {
  const location = useLocation();

  useEffect(() => {
    const html = document.querySelector("html");
    html.style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    html.style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen bg-gray-100 dark:bg-gray-900 justify-center items-center px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
      
      {/* Ornamen Latar Belakang (Disamakan dengan PageHeader) */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-emerald-500/10 pointer-events-none"></div>
      <div className="absolute -right-10 -top-10 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Container Card Login */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700/60">
          
          {/* Header Identitas */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-poppins font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">
              MBG<span className="text-violet-500">.</span>
            </h1>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300 mt-2 tracking-wide uppercase">
              Sistem Informasi Pengolahan
            </span>
          </div>

          {/* Form Render Outlet */}
          <Outlet />

          {/* Footer Card */}
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700/60">
            © 2026 Sistem Informasi MBG. <br />
            All rights reserved.
          </p>
        </div>
      </div>

      <Banner />
    </div>
  );
}