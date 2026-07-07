import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import users from "./data/users";

import "./css/style.css";
import "./charts/ChartjsConfig";

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

/* AUTH */
const Login = React.lazy(() => import("./pages/auth/Login"));

/* DASHBOARD */
const DashboardPJDapur = React.lazy(() => import("./pages/pjdapur/Dashboard"));

const DashboardAhliGizi = React.lazy(
  () => import("./pages/ahligizi/Dashboard"),
);

const DashboardPJSekolah = React.lazy(
  () => import("./pages/pjsekolah/Dashboard"),
);

/* PJ DAPUR */
const DataKaryawan = React.lazy(() => import("./pages/pjdapur/DataKaryawan"));

const AbsensiMasuk = React.lazy(() => import("./pages/pjdapur/AbsensiMasuk"));

const AbsensiPulang = React.lazy(() => import("./pages/pjdapur/AbsensiPulang"));

const ProduksiPJDapur = React.lazy(() => import("./pages/pjdapur/Produksi"));

const GiziProduksiPJDapur = React.lazy(
  () => import("./pages/pjdapur/GiziProduksi"),
);

const DataSekolahPJDapur = React.lazy(
  () => import("./pages/pjdapur/DataSekolah"),
);

const KotakSaranPJDapur = React.lazy(
  () => import("./pages/pjdapur/KotakSaran"),
);

const Laporan = React.lazy(() => import("./pages/pjdapur/Laporan"));

/* AHLI GIZI */
const ProduksiAhliGizi = React.lazy(() => import("./pages/ahligizi/Produksi"));

const GiziProduksiAhliGizi = React.lazy(
  () => import("./pages/ahligizi/GiziProduksi"),
);

/* PJ SEKOLAH */
const DataSekolahPJSekolah = React.lazy(
  () => import("./pages/pjsekolah/DataSekolah"),
);

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

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* MAIN */}
        <Route element={<MainLayout />}>
          {/* DASHBOARD */}
          <Route path="/dashboard-pj-dapur" element={<DashboardPJDapur />} />

          <Route path="/dashboard-ahli-gizi" element={<DashboardAhliGizi />} />

          <Route
            path="/dashboard-pj-sekolah"
            element={<DashboardPJSekolah />}
          />

          {/* PJ DAPUR */}
          <Route path="/absensi-masuk" element={<AbsensiMasuk />} />

          <Route path="/absensi-pulang" element={<AbsensiPulang />} />

          <Route path="/data-karyawan" element={<DataKaryawan />} />

          <Route path="/produksi-pj-dapur" element={<ProduksiPJDapur />} />

          <Route path="/produksi/:id" element={<GiziProduksiPJDapur />} />

          <Route
            path="/pjdapur/data-sekolah"
            element={<DataSekolahPJDapur />}
          />

          <Route path="/laporan" element={<Laporan />} />

          <Route path="/kotak-saran-pj-dapur" element={<KotakSaranPJDapur />} />

          {/* AHLI GIZI */}
          <Route path="/produksi-ahli-gizi" element={<ProduksiAhliGizi />} />

          <Route path="/produksi/:id" element={<GiziProduksiAhliGizi />} />

          {/* PJ SEKOLAH */}
          <Route
            path="/pjsekolah/data-sekolah"
            element={<DataSekolahPJSekolah />}
          />

          <Route path="/kotak-saran-sekolah" element={<KotakSaranSekolah />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
