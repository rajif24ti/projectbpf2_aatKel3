import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import users from "./data/users";

import "./css/style.css";
import "./charts/ChartjsConfig";

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

const Login = React.lazy(() => import("./pages/auth/Login"));

/* Dashboard */
const DashboardPJDapur = React.lazy(() => import("./pages/pjdapur/Dashboard"));
const DashboardAhliGizi = React.lazy(
  () => import("./pages/ahligizi/Dashboard"),
);
const DashboardPJSekolah = React.lazy(
  () => import("./pages/pjsekolah/Dashboard"),
);

/* PJ Dapur */
const DataKaryawan = React.lazy(() => import("./pages/pjdapur/DataKaryawan"));
const AbsensiMasuk = React.lazy(() => import("./pages/pjdapur/AbsensiMasuk"));
const AbsensiPulang = React.lazy(() => import("./pages/pjdapur/AbsensiPulang"));
const Produksi = React.lazy(() => import("./pages/pjdapur/Produksi"));
const GiziProduksi = React.lazy(() => import("./pages/pjdapur/GiziProduksi"));
const KotakSaran = React.lazy(() => import("./pages/pjdapur/KotakSaran"));
const Laporan = React.lazy(() => import("./pages/pjdapur/Laporan"));

/* PJ Sekolah */
const DataSekolah = React.lazy(() => import("./pages/pjsekolah/DataSekolah"));
const KotakSaranSekolah = React.lazy(
  () => import("./pages/pjsekolah/KotakSaran"),
);

const NotFound = React.lazy(() => import("./pages/NotFound"));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");

    html.style.scrollBehavior = "auto";

    window.scrollTo(0, 0);

    html.style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/dashboard-pj-dapur" element={<DashboardPJDapur />} />

          <Route path="/dashboard-ahli-gizi" element={<DashboardAhliGizi />} />

          <Route
            path="/dashboard-pj-sekolah"
            element={<DashboardPJSekolah />}
          />

          <Route path="/absensi-masuk" element={<AbsensiMasuk />} />

          <Route path="/absensi-pulang" element={<AbsensiPulang />} />

          <Route path="/data-karyawan" element={<DataKaryawan />} />

          <Route path="/produksi" element={<Produksi />} />

          <Route path="/produksi/:id" element={<GiziProduksi />} />

          <Route path="/laporan" element={<Laporan />} />

          <Route path="/kotak-saran" element={<KotakSaran />} />

          <Route path="/data-sekolah" element={<DataSekolah />} />

          <Route path="/kotak-saran-sekolah" element={<KotakSaranSekolah />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
