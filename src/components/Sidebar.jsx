import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  variant = 'default',
}) {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
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

  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-lg transition duration-150 ${
      isActive
        ? "bg-violet-100 text-violet-600 font-semibold dark:bg-violet-500/20 dark:text-violet-400"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700"
    }`;

  const iconClass = (isActive) =>
    `shrink-0 fill-current ${
      isActive
        ? "text-violet-600 dark:text-violet-400"
        : "text-gray-400 dark:text-gray-500"
    }`;

  return (
    <div className="min-w-fit">

      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-xs'}`}
      >

        <div className="flex justify-between mb-10 pr-3 sm:px-2">

          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>

          <NavLink end to="/" className="block">
            <svg className="fill-violet-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
              <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
            </svg>
          </NavLink>

        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Menu MBG
              </span>
            </h3>

            <ul className="mt-3 space-y-2">

              <li>
                <NavLink end to="/dashboard" className={menuClass}>
                  {({ isActive }) => (
                    <>
                      <svg className={iconClass(isActive)} width="16" height="16" viewBox="0 0 16 16">
                        <path d="M2 2h6v6H2V2Zm0 8h6v4H2v-4Zm8-8h4v4h-4V2Zm0 6h4v6h-4V8Z" />
                      </svg>
                      <span className="text-sm font-medium ml-1 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Dashboard
                      </span>
                    </>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink to="/absensi" className={menuClass}>
                  {({ isActive }) => (
                    <>
                      <svg className={iconClass(isActive)} width="16" height="16" viewBox="0 0 16 16">
                        <path d="M8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.31 0-6 1.79-6 4v1h12v-1c0-2.21-2.69-4-6-4Z" />
                      </svg>
                      <span className="text-sm font-medium ml-1 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Absensi
                      </span>
                    </>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink to="/bahan-baku" className={menuClass}>
                  {({ isActive }) => (
                    <>
                      <svg className={iconClass(isActive)} width="16" height="16" viewBox="0 0 16 16">
                        <path d="M2 1h12v3H2V1Zm1 5h10l-1 9H4L3 6Z" />
                      </svg>
                      <span className="text-sm font-medium ml-1 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Bahan Baku
                      </span>
                    </>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink to="/produksi" className={menuClass}>
                  {({ isActive }) => (
                    <>
                      <svg className={iconClass(isActive)} width="16" height="16" viewBox="0 0 16 16">
                        <path d="M4 1h8v3H4V1Zm-1 5h10v9H3V6Zm3 2v5h2V8H6Zm4 0v5h2V8h-2Z" />
                      </svg>
                      <span className="text-sm font-medium ml-1 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Produksi
                      </span>
                    </>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink to="/laporan" className={menuClass}>
                  {({ isActive }) => (
                    <>
                      <svg className={iconClass(isActive)} width="16" height="16" viewBox="0 0 16 16">
                        <path d="M3 1h8l3 3v11H3V1Zm7 1.5V5h2.5L10 2.5ZM5 8h6V7H5v1Zm0 3h6v-1H5v1Zm0 3h4v-1H5v1Z" />
                      </svg>
                      <span className="text-sm font-medium ml-1 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Laporan
                      </span>
                    </>
                  )}
                </NavLink>
              </li>

            </ul>
          </div>
        </div>

        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180" width="16" height="16" viewBox="0 0 16 16">
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