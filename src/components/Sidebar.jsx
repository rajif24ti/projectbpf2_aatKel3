import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

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

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);

    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Styling Menu yang dipercantik dengan Shadow, Border, dan Skala Mikro
  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 active:scale-98 text-sm font-medium ${
      isActive
        ? "bg-violet-500 text-white shadow-md shadow-violet-500/20 border border-violet-400/20 dark:bg-violet-600 dark:shadow-violet-600/30"
        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/80 dark:hover:bg-gray-700/50"
    }`;

  // Ikon menyesuaikan warna teks menu (bawaan fill-current)
  const iconClass = (isActive) =>
    `shrink-0 fill-current w-5 h-5 transition-transform duration-200 ${
      isActive ? "text-white scale-105" : "text-gray-400 dark:text-gray-500"
    }`;

  return (
    <div className="min-w-fit">
      {/* Backdrop overlay untuk mobile view */}
      <div
        className={`fixed inset-0 bg-gray-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Kontainer Utama Sidebar dengan sentuhan Glassmorphism */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } ${variant === "v2" ? "border-r border-gray-200/80 dark:border-gray-700/50" : "rounded-r-2xl border-r border-gray-100 dark:border-gray-700/30 shadow-lg shadow-gray-200/20 dark:shadow-none"}`}
      >
        {/* Bagian Atas: Tombol Close Mobile & Logo Dashboard */}
        <div className="flex items-center justify-between mb-8 px-2 pt-2">
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>

          {/* Logo dengan wadah lingkaran gradien estetik */}
          <NavLink
            end
            to={
              role === "pj_dapur"
                ? "/dashboard-pj-dapur"
                : role === "ahli_gizi"
                  ? "/dashboard-ahli-gizi"
                  : "/dashboard-pj-sekolah"
            }
            className="group flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center shadow-md shadow-violet-500/20 group-hover:scale-105 transition duration-200">
              <svg
                className="fill-white"
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                viewBox="0 0 32 32"
              >
                <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
              </svg>
            </div>

            <span className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight lg:hidden lg:sidebar-expanded:block 2xl:block duration-200">
              SIMOD - MBG<span className="text-violet-500">.</span>
            </span>
          </NavLink>
        </div>

        {/* Daftar Navigasi Utama */}
        <div className="space-y-6 flex-1 px-1">
          <div>
            {/* Header Kategori Menu dengan pemisah garis tipis */}
            <div className="flex items-center gap-2 mb-4 px-3">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold whitespace-nowrap lg:hidden lg:sidebar-expanded:block 2xl:block duration-200">
                Menu Utama
              </span>
              <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-700/50"></div>
            </div>

            <ul className="space-y-1.5">
              {/* ================= DASHBOARD ================= */}
              <li>
                <NavLink
                  to={
                    role === "pj_dapur"
                      ? "/dashboard-pj-dapur"
                      : role === "ahli_gizi"
                        ? "/dashboard-ahli-gizi"
                        : "/dashboard-pj-sekolah"
                  }
                  className={menuClass}
                >
                  {({ isActive }) => (
                    <>
                      <svg
                        className={iconClass(isActive)}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3 3h8v8H3V3zm10 0h8v5h-8V3zM3 13h5v8H3v-8zm7-3h11v11H10V10z" />
                      </svg>
                      <span className="lg:hidden lg:sidebar-expanded:block 2xl:block whitespace-nowrap">
                        Dashboard
                      </span>
                    </>
                  )}
                </NavLink>
              </li>

              {/* ================= PENANGGUNG JAWAB DAPUR ================= */}
              {role === "pj_dapur" && (
                <>
                  <li>
                    <NavLink to="/absensi-masuk" className={menuClass}>
                      {({ isActive }) => (
                        <>
                          <svg
                            className={iconClass(isActive)}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                            <path d="M12 12V7" />
                            <path d="M9 10l3-3 3 3" />
                          </svg>
                          <span className="lg:hidden lg:sidebar-expanded:block 2xl:block whitespace-nowrap">Absensi Masuk</span>
                        </>
                      )}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/absensi-pulang" className={menuClass}>
                      {({ isActive }) => (
                        <>
                          <svg
                            className={iconClass(isActive)}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                            <path d="M12 7v5" />
                            <path d="M9 9l3 3 3-3" />
                          </svg>
                          <span className="lg:hidden lg:sidebar-expanded:block 2xl:block whitespace-nowrap">Absensi Pulang</span>
                        </>
                      )}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/data-karyawan" className={menuClass}>
                      {({ isActive }) => (
                        <>
                          <svg
                            className={iconClass(isActive)}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
                          </svg>
                          <span className="lg:hidden lg:sidebar-expanded:block 2xl:block whitespace-nowrap">Data Karyawan</span>
                        </>
                      )}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/produksi-pj-dapur" className={menuClass}>
                      {({ isActive }) => (
                        <>
                          <svg
                            className={iconClass(isActive)}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M4 4h16v4H4zm2 6h12v10H6z" />
                          </svg>
                          <span className="lg:hidden lg:sidebar-expanded:block 2xl:block whitespace-nowrap">Produksi</span>
                        </>
                      )}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/pjdapur/data-sekolah" className={menuClass}>
                      {({ isActive }) => (
                        <>
                          <svg
                            className={iconClass(isActive)}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 3L2 8v2h20V8L12 3zm-7 9h2v7H5zm4 0h2v7H9zm4 0h2v7h-2zm4 0h2v7h-2zM2 21h20v2H2z" />
                          </svg>
                          <span className="lg:hidden lg:sidebar-expanded:block 2xl:block whitespace-nowrap">Data Sekolah</span>
                        </>
                      )}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/laporan" className={menuClass}>
                      {({ isActive }) => (
                        <>
                          <svg
                            className={iconClass(isActive)}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M6 2h9l5 5v15H6z" />
                            <path d="M15 2v5h5" />
                          </svg>
                          <span className="lg:hidden lg:sidebar-expanded:block 2xl:block whitespace-nowrap">Laporan</span>
                        </>
                      )}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/kotak-saran-pj-dapur" className={menuClass}>
                      {({ isActive }) => (
                        <>
                          <svg
                            className={iconClass(isActive)}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                          </svg>
                          <span className="lg:hidden lg:sidebar-expanded:block 2xl:block whitespace-nowrap">Kotak Saran</span>
                        </>
                      )}
                    </NavLink>
                  </li>
                </>
              )}

              {/* ================= AHLI GIZI ================= */}
              {role === "ahli_gizi" && (
                <>
                  <li>
                    <NavLink to="/produksi-ahli-gizi" className={menuClass}>
                      {({ isActive }) => (
                        <>
                          <svg
                            className={iconClass(isActive)}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M4 4h16v4H4zm2 6h12v10H6z" />
                          </svg>
                          <span className="lg:hidden lg:sidebar-expanded:block 2xl:block whitespace-nowrap">Produksi</span>
                        </>
                      )}
                    </NavLink>
                  </li>
                </>
              )}

              {/* ================= PENANGGUNG JAWAB SEKOLAH ================= */}
              {role === "pj_sekolah" && (
                <>
                  <li>
                    <NavLink to="/pjsekolah/data-sekolah" className={menuClass}>
                      {({ isActive }) => (
                        <>
                          <svg
                            className={iconClass(isActive)}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 3L2 8v2h20V8L12 3zm-7 9h2v7H5zm4 0h2v7H9zm4 0h2v7h-2zm4 0h2v7h-2zM2 21h20v2H2z" />
                          </svg>
                          <span className="lg:hidden lg:sidebar-expanded:block 2xl:block whitespace-nowrap">Data Sekolah</span>
                        </>
                      )}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/kotak-saran-sekolah" className={menuClass}>
                      {({ isActive }) => (
                        <>
                          <svg
                            className={iconClass(isActive)}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                          </svg>
                          <span className="lg:hidden lg:sidebar-expanded:block 2xl:block whitespace-nowrap">Kotak Saran</span>
                        </>
                      )}
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* Kategori Keluar */}
            <div className="flex items-center gap-2 mt-6 mb-3 px-3">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold whitespace-nowrap lg:hidden lg:sidebar-expanded:block 2xl:block duration-200">
                Sesi
              </span>
              <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-700/50"></div>
            </div>

            <ul>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-all duration-150 active:scale-98 text-sm font-medium"
                >
                  <svg
                    className="shrink-0 fill-current text-red-400 dark:text-red-500 w-5 h-5"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9h-2v4H3V3h8v4h2V3a2 2 0 0 0-2-2Zm2.5 6H7v2h6.5l-2 2 1.4 1.4 4.3-4.4-4.3-4.4-1.4 1.4 2 2Z" />
                  </svg>
                  <span className="lg:hidden lg:sidebar-expanded:block 2xl:block whitespace-nowrap">
                    Logout
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bagian Bawah: Tombol Collapse (Kecilkan/Lebarkan Sidebar) */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 bg-gray-50 dark:bg-gray-700/30 w-8 h-8 rounded-lg flex items-center justify-center border border-gray-100 dark:border-gray-700/50 shadow-xs transition"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180 w-4 h-4"
                viewBox="0 0 16 16"
              >
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
