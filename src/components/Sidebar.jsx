import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Tailwind v4 Safelist: w-64 -translate-x-64 translate-x-0 opacity-100 opacity-0 pointer-events-none

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const dashboardPath =
    role === "pj_dapur"
      ? "/dashboard-pj-dapur"
      : role === "ahli_gizi"
        ? "/dashboard-ahli-gizi"
        : "/dashboard-pj-sekolah";

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
      isActive
        ? "bg-white/15 text-white shadow-lg shadow-violet-900/20 border border-white/10"
        : "text-gray-300 hover:text-white hover:bg-white/10 border border-transparent"
    }`;

  const iconClass = (isActive) =>
    `shrink-0 w-[18px] h-[18px] transition-all duration-200 ${
      isActive ? "text-violet-300" : "text-gray-400 group-hover:text-violet-300"
    }`;

  const menuItems_pj_dapur = [
    { to: "/absensi-masuk", label: "Absensi Masuk", icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
        <polyline points="9 11 12 14 22 4"/>
      </svg>
    )},
    { to: "/absensi-pulang", label: "Absensi Pulang", icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
        <polyline points="8 12 12 16 16 12"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
      </svg>
    )},
    { to: "/data-karyawan", label: "Data Karyawan", icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    )},
    { to: "/produksi-pj-dapur", label: "Produksi", icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 2h18l-2 7H5L3 2z"/>
        <path d="M5 9l1 11h12l1-11"/>
        <path d="M9 14h6"/>
      </svg>
    )},
    { to: "/pjdapur/data-sekolah", label: "Data Sekolah", icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )},
    { to: "/laporan", label: "Laporan", icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    )},
    { to: "/kotak-saran-pj-dapur", label: "Kotak Saran", icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    )},
  ];

  const menuItems_ahli_gizi = [
    { to: "/produksi-ahli-gizi", label: "Produksi", icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 2h18l-2 7H5L3 2z"/>
        <path d="M5 9l1 11h12l1-11"/>
      </svg>
    )},
  ];

  const menuItems_pj_sekolah = [
    { to: "/pjsekolah/data-sekolah", label: "Data Sekolah", icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )},
    { to: "/kotak-saran-sekolah", label: "Kotak Saran", icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    )},
  ];

  const currentMenuItems =
    role === "pj_dapur"
      ? menuItems_pj_dapur
      : role === "ahli_gizi"
        ? menuItems_ahli_gizi
        : menuItems_pj_sekolah;

  const roleLabel =
    role === "pj_dapur"
      ? "PJ Dapur"
      : role === "ahli_gizi"
        ? "Ahli Gizi"
        : "PJ Sekolah";

  return (
    <div className="min-w-fit">
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-gray-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-auto no-scrollbar shrink-0 p-4 transition-all duration-300 ease-in-out w-64 sidebar-glow ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
        style={{
          background: "linear-gradient(180deg, #0f0f1a 0%, #12102a 40%, #0d1117 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)"
        }}
      >
        {/* Top: Logo & Close button */}
        <div className="flex items-center justify-between mb-8 px-1 pt-1">
          <button
            ref={trigger}
            className="lg:hidden text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>

          <NavLink end to={dashboardPath} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-900/40 group-hover:shadow-violet-500/40 transition-shadow duration-300">
              <svg className="fill-white w-5 h-5" viewBox="0 0 32 32">
                <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
              </svg>
            </div>
            <div>
              <span className="font-poppins text-base font-bold text-white tracking-tight">
                SIMOD<span className="text-violet-400">.</span>
              </span>
              <p className="text-[10px] text-gray-500 leading-none mt-0.5">MBG System</p>
            </div>
          </NavLink>
        </div>

        {/* Role Badge */}
        <div className="mb-5 px-1">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/6">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500/30 to-indigo-500/30 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-violet-300 fill-current" viewBox="0 0 24 24">
                <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 leading-none">Login sebagai</p>
              <p className="text-xs text-violet-300 font-semibold mt-0.5">{roleLabel}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-1">
          {/* Section label */}
          <div className="flex items-center gap-2 mb-3 px-1">
            <span className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">
              Navigasi
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <ul className="space-y-1">
            {/* Dashboard */}
            <li>
              <NavLink to={dashboardPath} className={menuClass}>
                {({ isActive }) => (
                  <>
                    <svg className={iconClass(isActive)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" rx="1"/>
                      <rect x="14" y="3" width="7" height="7" rx="1"/>
                      <rect x="3" y="14" width="7" height="7" rx="1"/>
                      <rect x="14" y="14" width="7" height="7" rx="1"/>
                    </svg>
                    <span>Dashboard</span>
                  </>
                )}
              </NavLink>
            </li>

            {/* Role-based menu items */}
            {currentMenuItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={menuClass}>
                  {({ isActive }) => (
                    <>
                      {item.icon(iconClass(isActive))}
                      <span className="whitespace-nowrap">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 my-4 mx-1" />

        {/* Logout */}
        <div className="px-1 pb-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/15 transition-all duration-200 group"
          >
            <svg
              className="shrink-0 w-[18px] h-[18px] text-gray-500 group-hover:text-red-400 transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
