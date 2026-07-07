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
    <div
      className="relative flex min-h-screen justify-center items-center px-4 sm:px-6 lg:px-8 py-12 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f0f1a 0%, #12102a 50%, #0d1117 100%)" }}
    >
      {/* Animated gradient orbs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(132,112,255,0.25) 0%, transparent 70%)",
          animation: "pulseGlow 4s ease-in-out infinite"
        }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(62,201,114,0.15) 0%, transparent 70%)",
          animation: "pulseGlow 4s ease-in-out infinite 2s"
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 60%)"
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(132,112,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(132,112,255,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Card */}
      <div className="w-full max-w-md relative z-10 animate-fadeInUp">
        {/* Logo Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-2xl shadow-violet-900/50 mb-4">
            <svg className="fill-white w-8 h-8" viewBox="0 0 32 32">
              <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
            </svg>
          </div>
          <h1 className="font-poppins text-3xl font-bold text-white tracking-tight">
            SIMOD<span className="text-violet-400">.</span>
          </h1>
          <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/20 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            Sistem Informasi Pengolahan MBG
          </span>
        </div>

        {/* Login Card */}
        <div
          className="rounded-2xl p-7 shadow-2xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)"
          }}
        >
          <h2 className="text-xl font-semibold text-white mb-1 text-center">Selamat Datang</h2>

          <Outlet />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          © 2026 Sistem Informasi MBG · All rights reserved.
        </p>
      </div>

      <Banner />
    </div>
  );
}