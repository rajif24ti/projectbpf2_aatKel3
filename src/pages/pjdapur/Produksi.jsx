import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dataProduksiAwal from "../../data/data-produksi.json";
import dataSekolah from "../../data/data-sekolah.json";

function Produksi() {
  // MODE HALAMAN
  const [viewMode, setViewMode] = useState("index");
  const [dataProduksi, setDataProduksi] = useState(() => {
    const saved = localStorage.getItem("dataProduksi");
    return saved ? JSON.parse(saved) : dataProduksiAwal;
  });

  const [query, setQuery] = useState("");

  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    console.log("Halaman Produksi berhasil dimuat");
  }, []);

  useEffect(() => {
    console.log(`Jumlah data produksi saat ini: ${dataProduksi.length}`);
  }, [dataProduksi]);

  useEffect(() => {
    console.log(`Mode aktif: ${viewMode}`);
  }, [viewMode]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    localStorage.setItem("dataProduksi", JSON.stringify(dataProduksi));
  }, [dataProduksi]);

  useEffect(() => {
    console.log(`Mencari data: ${debouncedQuery}`);
  }, [debouncedQuery]);

  // TOTAL PRODUKSI
  const totalProduksi = dataProduksi.reduce(
    (total, item) => total + Number(item.porsi),
    0,
  );

  const getNamaSekolah = (idSekolah) => {
    const sekolah = dataSekolah.find((item) => item.id === Number(idSekolah));

    return sekolah ? sekolah.nama : "Sekolah tidak ditemukan";
  };

  const filteredProduksi = dataProduksi.filter((item) => {
    const namaSekolah = getNamaSekolah(item.idSekolah);

    return (
      namaSekolah.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      (item.menu ?? "").toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      (item.tanggal ?? "").includes(debouncedQuery)
    );
  });

  return (
    <main className="grow bg-slate-50 dark:bg-slate-900 min-h-screen transition-all">
      <div className="px-6 py-8 max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 text-white p-8 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="inline-flex px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase">
                MBG
              </span>

              <h1 className="mt-3 text-4xl font-bold">
                Data Produksi Distribusi
              </h1>

              <p className="text-violet-100 mt-2">
                {viewMode === "index" &&
                  "Lihat seluruh data produksi makanan harian MBG."}
              </p>
            </div>
          </div>
        </div>

        {/* ================= CARD ================= */}

        {viewMode === "index" && (
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-500 text-sm">Total Produksi</p>

              <h2 className="text-4xl font-bold text-violet-600 mt-2">
                {totalProduksi.toLocaleString("id-ID")}
              </h2>

              <span className="text-gray-500">Porsi</span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-500 text-sm">Sekolah Dilayani</p>

              <h2 className="text-4xl font-bold text-blue-600 mt-2">
                {dataProduksi.length}
              </h2>

              <span className="text-gray-500">Sekolah</span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-500 text-sm">Rata-rata Produksi</p>

              <h2 className="text-4xl font-bold text-emerald-600 mt-2">
                {dataProduksi.length
                  ? Math.round(totalProduksi / dataProduksi.length)
                  : 0}
              </h2>

              <span className="text-gray-500">Porsi/Sekolah</span>
            </div>
          </div>
        )}

        {/* ================= TABEL ================= */}

        {viewMode === "index" && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b">
              <div className="relative">
                <svg
                  className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.2-5.2M11 19A8 8 0 1011 3a8 8 0 000 16z"
                  />
                </svg>

                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari sekolah, menu atau tanggal..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr className="text-xs uppercase text-gray-500">
                    <th className="px-6 py-4">No</th>

                    <th className="px-6 py-4">Tanggal</th>

                    <th className="px-6 py-4">Sekolah</th>

                    <th className="px-6 py-4">Menu</th>

                    <th className="px-6 py-4 text-center">Porsi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {filteredProduksi.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-16 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl">
                            📦
                          </div>

                          <h3 className="font-semibold text-lg">
                            Data Tidak Ditemukan
                          </h3>

                          <p className="text-sm text-gray-400">
                            Coba gunakan kata kunci yang berbeda.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredProduksi.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-violet-50 dark:hover:bg-slate-700 transition-all"
                      >
                        {/* Nomor */}
                        <td className="px-6 py-5 font-semibold text-center">
                          {index + 1}
                        </td>

                        {/* Tanggal */}
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700">
                            {item.tanggal}
                          </span>
                        </td>

                        {/* Sekolah */}
                        <td className="px-6 py-5">
                          <Link
                            to={`/produksi/${item.id}`}
                            className="font-semibold text-violet-600 hover:text-violet-700"
                          >
                            {getNamaSekolah(item.idSekolah)}
                          </Link>
                        </td>

                        {/* Menu */}
                        <td className="px-6 py-5">
                          <div className="font-medium">{item.menu}</div>

                          <div className="text-xs text-gray-400 mt-1">
                            Kalori : {item.kalori} kkal
                          </div>
                        </td>

                        {/* Porsi */}
                        <td className="px-6 py-5 text-center">
                          <span className="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-bold">
                            {item.porsi.toLocaleString("id-ID")} Porsi
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
export default Produksi;
