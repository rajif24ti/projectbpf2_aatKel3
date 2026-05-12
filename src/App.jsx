import React, { useEffect, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./css/style.css";
import "./charts/ChartjsConfig";

// Lazy loading components
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Absensi = React.lazy(() => import("./pages/Absensi"));
const BahanBaku = React.lazy(() => import("./pages/BahanBaku"));
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
      fallback={
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="flex flex-col items-center">
            {/* Spinner sederhana */}
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mb-2"></div>
            <div className="text-gray-500 text-sm font-medium">Memuat Halaman...</div>
          </div>
        </div>
      }
    >
      <Routes>
        {/* Redirect dari root (/) ke login atau dashboard secara otomatis */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Gruping rute Dashboard (MainLayout) */}
        <Route element={<MainLayout />}>
          {/* Perbaikan typo 'lement' menjadi 'element' */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/absensi" element={<Absensi />} />
          <Route path="/bahan-baku" element={<BahanBaku />} />
          <Route path="/produksi" element={<Produksi />} />
          <Route path="/laporan" element={<Laporan />} />
        </Route>

        {/* Gruping rute Auth (AuthLayout) */}
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