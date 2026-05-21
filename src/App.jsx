import React, { useEffect, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./css/style.css";
import "./charts/ChartjsConfig";
import KotakSaran from "./pages/KotakSaran";

// Lazy loading components
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

// PERUBAHAN: Lazy import untuk Absensi Masuk dan Absensi Pulang
const AbsensiMasuk = React.lazy(() => import("./pages/AbsensiMasuk"));
const AbsensiPulang = React.lazy(() => import("./pages/AbsensiPulang"));

const DataKaryawan = React.lazy(() => import("./pages/DataKaryawan")); 
const DataSekolah = React.lazy(() => import("./pages/DataSekolah"));   
const KotakPesan = React.lazy(() => import("./pages/KotakSaran"));     
const Produksi = React.lazy(() => import("./pages/Produksi"));
const Laporan = React.lazy(() => import("./pages/Laporan"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const html = document.querySelector("html");
    html.style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    html.style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <Suspense 
      fallback = {
        <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center">
            {/* Spinner interaktif yang serasi */}
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-500 mb-2"></div>
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Memuat Halaman...</div>
          </div>
        </div>
      }
    >
      <Routes>
        {/* Redirect dari root (/) ke login secara otomatis */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Gruping rute Aplikasi Utama (MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* PERUBAHAN: Routing pemisahan Absensi */}
          <Route path="/absensi-masuk" element={<AbsensiMasuk />} />
          <Route path="/absensi-pulang" element={<AbsensiPulang />} />
          
          <Route path="/data-karyawan" element={<DataKaryawan />} />
          <Route path="/data-sekolah" element={<DataSekolah />} />
          <Route path="/kotak-saran" element={<KotakSaran />} />
          <Route path="/produksi" element={<Produksi />} />
          <Route path="/laporan" element={<Laporan />} />
        </Route>

        {/* Gruping rute Autentikasi (AuthLayout) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}