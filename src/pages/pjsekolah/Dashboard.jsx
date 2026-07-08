import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const [dataSekolah, setDataSekolah] = useState([]);
  const [kotakSaran, setKotakSaran] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [
        { data: sekolahData },
        { data: saranData }
      ] = await Promise.all([
        supabase.from("sekolah").select("*"),
        supabase.from("kotak_saran").select("*").order("tanggal", { ascending: false }).limit(5)
      ]);

      setDataSekolah(sekolahData || []);
      setKotakSaran(saranData || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalSekolah = dataSekolah.length;
  const totalSiswa = dataSekolah.reduce((t, s) => t + (s.jumlah_siswa || s.jumlahSiswa || 0), 0);
  const saranBelumDibaca = kotakSaran.filter(s => s.status === "Belum Dibaca").length;

  return (
    <main className="grow">
      <div className="px-4 sm:px-6 lg:px-8 py-8">

        {/* HERO */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 p-8 text-white shadow-xl mb-8">
          <h1 className="text-3xl font-bold">
            Dashboard PJ Sekolah
          </h1>
          <p className="mt-3 text-sky-100">
            Monitoring data sekolah mitra, jumlah siswa, dan saran atau keluhan dari sekolah penerima.
          </p>
        </div>

        {/* CARD STATISTIK */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Total Sekolah</p>
            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {totalSekolah}
            </h2>
            <p className="text-sm text-gray-400 mt-2">Sekolah mitra aktif</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Total Siswa</p>
            <h2 className="text-4xl font-bold text-sky-600 mt-2">
              {totalSiswa.toLocaleString()}
            </h2>
            <p className="text-sm text-gray-400 mt-2">Penerima manfaat makanan</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Saran Baru</p>
            <h2 className="text-4xl font-bold text-orange-600 mt-2">
              {saranBelumDibaca}
            </h2>
            <p className="text-sm text-gray-400 mt-2">Pesan belum dibaca</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Data Sekolah */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">Sekolah Mitra</h3>
            <div className="space-y-4">
              {loading ? (
                <p className="text-center text-gray-500">Memuat data...</p>
              ) : dataSekolah.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{item.nama}</h4>
                    <p className="text-xs text-gray-500">{item.jenjang}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{item.jumlah_siswa || item.jumlahSiswa} Siswa</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kotak Saran Terbaru */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">Saran Terkini</h3>
            <div className="space-y-4">
              {loading ? (
                <p className="text-center text-gray-500">Memuat saran...</p>
              ) : kotakSaran.length === 0 ? (
                <p className="text-center text-gray-400 text-sm">Tidak ada saran masuk.</p>
              ) : kotakSaran.map((item) => (
                <div key={item.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'Belum Dibaca' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-400">{item.tanggal}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{item.subjek}</h4>
                  <p className="text-xs text-gray-500 mb-2">{item.sekolah_nama}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{item.isi}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}