import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const [dataProduksi, setDataProduksi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data: produksiData, error } = await supabase
        .from("produksi")
        .select("*, sekolah(nama)")
        .order("tanggal", { ascending: false });

      if (error) throw error;

      setDataProduksi((produksiData || []).map((p) => ({
        id: p.id,
        tanggal: p.tanggal,
        sekolah: p.sekolah?.nama || "-",
        menu: p.menu,
        jumlah: p.porsi,
        status: "Selesai",
      })));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalProduksi = dataProduksi.reduce((total, item) => total + item.jumlah, 0);
  const produksiSelesai = dataProduksi.filter((item) => item.status === "Selesai").length;
  const produksiProses = dataProduksi.filter((item) => item.status === "Proses").length;

  return (
    <main className="grow">
      <div className="px-4 sm:px-6 lg:px-8 py-8">

        {/* HERO */}
        <div className="rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white shadow-xl mb-8">
          <h1 className="text-3xl font-bold">
            Dashboard Ahli Gizi
          </h1>
          <p className="mt-3 text-emerald-100">
            Monitoring produksi makanan bergizi, variasi menu, dan laporan
            operasional secara real-time.
          </p>
        </div>

        {/* CARD STATISTIK */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Total Produksi</p>
            <h2 className="text-4xl font-bold text-emerald-600 mt-2">
              {totalProduksi.toLocaleString()}
            </h2>
            <p className="text-sm text-gray-400 mt-2">Total porsi harian</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Menu Berbeda</p>
            <h2 className="text-4xl font-bold text-teal-600 mt-2">
              {new Set(dataProduksi.map(p => p.menu)).size}
            </h2>
            <p className="text-sm text-gray-400 mt-2">Variasi menu hari ini</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Produksi Selesai</p>
            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {produksiSelesai}
            </h2>
            <p className="text-sm text-gray-400 mt-2">Batch produksi selesai</p>
          </div>
        </div>

        {/* GRID KONTEN */}
        <div className="grid lg:grid-cols-1 gap-6">
          {/* PRODUKSI */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">Produksi Gizi Hari Ini</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="p-3 text-left">Tanggal</th>
                    <th className="p-3 text-left">Sekolah</th>
                    <th className="p-3 text-left">Menu</th>
                    <th className="p-3 text-center">Porsi</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="5" className="p-4 text-center">Memuat...</td></tr>
                  ) : dataProduksi.map((item) => (
                    <tr key={item.id} className="border-b dark:border-gray-700">
                      <td className="p-3">{item.tanggal}</td>
                      <td className="p-3">{item.sekolah}</td>
                      <td className="p-3">{item.menu}</td>
                      <td className="p-3 text-center">{item.jumlah}</td>
                      <td className="p-3 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
          </div>
        </div>
      </div>
    </main>
  );
}