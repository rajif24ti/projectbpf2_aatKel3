import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const [dataKaryawan, setDataKaryawan] = useState([]);
  const [dataSekolah, setDataSekolah] = useState([]);
  const [dataProduksi, setDataProduksi] = useState([]);
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [
        { data: karyawanData },
        { data: absensiData },
        { data: sekolahData },
        { data: produksiData },
        { data: laporanData }
      ] = await Promise.all([
        supabase.from("karyawan").select("*").eq("status_kerja", "Aktif"),
        supabase.from("absensi").select("*").order("tanggal", { ascending: false }),
        supabase.from("sekolah").select("*"),
        supabase.from("produksi").select("*").order("tanggal", { ascending: false }),
        supabase.from("laporan").select("*").order("tanggal", { ascending: false }).limit(5)
      ]);

      const processedKaryawan = (karyawanData || []).map((k) => {
        const absen = (absensiData || []).find((a) => a.karyawan_id === k.id);
        return {
          id: k.id,
          nama: k.nama,
          status: absen ? absen.status : "Belum Hadir"
        };
      });
      setDataKaryawan(processedKaryawan);

      setDataSekolah((sekolahData || []).map((s) => ({
        id: s.id,
        nama: s.nama,
        jumlahSiswa: s.jumlah_siswa || s.jumlahSiswa || 0,
      })));

      setDataProduksi((produksiData || []).map((p) => ({
        id: p.id,
        tanggal: p.tanggal,
        menu: p.menu,
        jumlah: p.porsi,
        status: "Selesai",
      })));

      setLaporan(laporanData || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalKaryawan = dataKaryawan.length;

  const hadir = dataKaryawan.filter(
    (item) => item.status === "Hadir"
  ).length;

  const izin = dataKaryawan.filter(
    (item) => item.status === "Izin"
  ).length;

  const sakit = dataKaryawan.filter(
    (item) => item.status === "Sakit"
  ).length;

  const totalSekolah = dataSekolah.length;

  const totalProduksi = dataProduksi.reduce(
    (total, item) => total + item.jumlah,
    0
  );

  const produksiSelesai = dataProduksi.filter(
    (item) => item.status === "Selesai"
  ).length;

  const produksiProses = dataProduksi.filter(
    (item) => item.status === "Proses"
  ).length;

  const laporanSelesai = laporan.filter(
    (item) => item.status === "Selesai"
  ).length;

  const totalDistribusi = dataSekolah.reduce(
    (total, item) => total + item.jumlahSiswa,
    0
  );

  return (
    <main className="grow">
      <div className="px-4 sm:px-6 lg:px-8 py-8">

        {/* HERO */}
        <div className="rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-8 text-white shadow-xl mb-8">
          <h1 className="text-3xl font-bold">
            Dashboard Penanggung Jawab Dapur
          </h1>

          <p className="mt-3 text-violet-100">
            Monitoring produksi makanan bergizi, absensi
            karyawan, distribusi sekolah, dan laporan
            operasional secara real-time.
          </p>
        </div>

        {/* CARD STATISTIK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">
              Produksi Hari Ini
            </p>

            <h2 className="text-4xl font-bold text-violet-600 mt-2">
              {totalProduksi.toLocaleString()}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Total porsi makanan
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">
              Karyawan Hadir
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {hadir}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              dari {totalKaryawan} karyawan
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">
              Sekolah Mitra
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {totalSekolah}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Sekolah aktif
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">
              Laporan Selesai
            </p>

            <h2 className="text-4xl font-bold text-orange-600 mt-2">
              {laporanSelesai}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Dokumen selesai
            </p>
          </div>

        </div>

        {/* GRID KONTEN */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* PRODUKSI */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">
              Produksi Hari Ini
            </h3>

            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-3 text-left">Menu</th>
                  <th className="p-3 text-center">Porsi</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {dataProduksi.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b dark:border-gray-700"
                  >
                    <td className="p-3">
                      {item.menu}
                    </td>

                    <td className="p-3 text-center">
                      {item.jumlah}
                    </td>

                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Selesai"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ABSENSI */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">
              Absensi Hari Ini
            </h3>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Hadir</span>
                <span className="font-semibold text-green-600">
                  {hadir}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Izin</span>
                <span className="font-semibold text-yellow-600">
                  {izin}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Sakit</span>
                <span className="font-semibold text-red-600">
                  {sakit}
                </span>
              </div>

            </div>
          </div>

          {/* DISTRIBUSI */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">
              Distribusi Sekolah
            </h3>

            <div className="space-y-3">
              {dataSekolah.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-2"
                >
                  <span>{item.nama}</span>

                  <span className="font-semibold">
                    {item.jumlahSiswa}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t font-bold flex justify-between">
              <span>Total Porsi</span>
              <span>{totalDistribusi}</span>
            </div>
          </div>

          {/* STATUS PRODUKSI */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">
              Status Produksi
            </h3>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Selesai</span>
                <span className="text-green-600 font-bold">
                  {produksiSelesai}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Proses</span>
                <span className="text-yellow-600 font-bold">
                  {produksiProses}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}