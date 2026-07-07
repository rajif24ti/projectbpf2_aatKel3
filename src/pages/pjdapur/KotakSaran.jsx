import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

function KotakSaran() {
  // 1. STATE UTAMA: Menyimpan data pesan masuk / keluar
  const [dataPesan, setDataPesan] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. STATE NAVIGASI INTERNAL: 'index' | 'create' | 'view'
  const [viewMode, setViewMode] = useState("index");

  // 3. STATE BUFFER: Penampung data formulir kirim pesan baru / detail baca pesan
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchSaran();
  }, []);

  const fetchSaran = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("kotak_saran")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const formatted = (data || []).map(item => ({
        id: item.id,
        sekolah: item.sekolah_nama,
        kategori: item.kategori,
        subjek: item.subjek,
        isi: item.isi,
        tanggal: item.tanggal,
        status: item.status
      }));
      setDataPesan(formatted);
    } catch (error) {
      console.error("Error fetching saran:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi pengondisian warna Badge Kategori Pesan
  const getKategoriColor = (kategori) => {
    switch (kategori) {
      case "Saran Pelayanan":
        return "bg-violet-50 text-violet-600 border-violet-200";
      case "Masukan Distribusi":
        return "bg-sky-50 text-sky-600 border-sky-200";
      case "Evaluasi Menu":
        return "bg-amber-50 text-amber-600 border-amber-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  // Navigasi ke Detail Pesan (Read/View) & Sekaligus Mengubah Status Menjadi "Sudah Dibaca"
  const openViewMode = async (item) => {
    setFormData(item);
    setViewMode("view");

    // Otomatis tandai sudah dibaca jika statusnya masih baru
    if (item.status === "Belum Dibaca") {
      try {
        const { error } = await supabase
          .from("kotak_saran")
          .update({ status: "Sudah Dibaca" })
          .eq("id", item.id);
          
        if (error) throw error;
        
        setDataPesan(
          dataPesan.map((p) =>
            p.id === item.id ? { ...p, status: "Sudah Dibaca" } : p,
          ),
        );
      } catch (error) {
        console.error("Error updating status:", error.message);
      }
    }
  };

  return (
    <main className="grow transition-all duration-200">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* HEADER HALAMAN */}
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold tracking-tight">
              Kotak Saran Sekolah
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Halaman ini digunakan untuk melihat saran dan masukan dari sekolah
              penerima layanan MBG.
            </p>
          </div>
        </div>

        {/* ==================== BAGIAN 1: INDEX (LIST KOTAK MASUK) ==================== */}
        {viewMode === "index" && (
          <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md shadow-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/40 text-gray-500 dark:text-gray-400 text-left text-xs uppercase font-bold tracking-wider border-b border-gray-100 dark:border-gray-700">
                    <th className="p-4 text-center w-12">No</th>
                    <th className="p-4 w-56">Sekolah</th>
                    <th className="p-4 w-40">Kategori</th>
                    <th className="p-4">Subjek Pesan</th>
                    <th className="p-4 text-center w-32">Tanggal</th>
                    <th className="p-4 text-center w-28">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-sm">
                  {dataPesan.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-8 text-center text-gray-400 dark:text-gray-500"
                      >
                        Kotak masuk kosong. Tidak ada pesan saat ini.
                      </td>
                    </tr>
                  ) : (
                    dataPesan.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition ${item.status === "Belum Dibaca" ? "bg-violet-50/30 dark:bg-violet-500/5 font-semibold" : ""}`}
                      >
                        <td className="p-4 text-center text-gray-400">
                          {item.status === "Belum Dibaca" ? (
                            <span className="w-2 h-2 rounded-full bg-violet-500 inline-block"></span>
                          ) : (
                            index + 1
                          )}
                        </td>
                        <td className="p-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                          <span className="truncate">{item.sekolah}</span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getKategoriColor(item.kategori)}`}
                          >
                            {item.kategori}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-800 dark:text-gray-200 truncate max-w-md">
                            {item.subjek}
                          </div>
                          <div className="text-xs text-gray-400 font-normal truncate max-w-md">
                            {item.isi}
                          </div>
                        </td>
                        <td className="p-4 text-center font-mono text-xs text-gray-500">
                          {item.tanggal}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => openViewMode(item)}
                              className="p-1.5 text-violet-500 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-lg transition"
                              title="Baca Pesan"
                            >
                              <svg
                                className="w-4 h-4 fill-none stroke-current"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== BAGIAN VIEW ==================== */}
        {viewMode === "view" && (
          <div className="max-w-3xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-2xl p-8">
            {/* HEADER */}
            <div className="border-b border-gray-100 dark:border-gray-700 pb-5 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border mb-3 ${getKategoriColor(formData.kategori)}`}
                  >
                    {formData.kategori}
                  </span>

                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 leading-snug">
                    {formData.subjek}
                  </h2>

                  <div className="mt-3 flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      Sekolah:
                      <strong className="ml-1 text-gray-700 dark:text-gray-200">
                        {formData.sekolah}
                      </strong>
                    </span>

                    <span>
                      Tanggal:
                      <strong className="ml-1 text-gray-700 dark:text-gray-200">
                        {formData.tanggal}
                      </strong>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setViewMode("index")}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* ISI */}
            <div className="bg-gray-50 dark:bg-gray-700/20 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 min-h-[200px]">
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {formData.isi}
              </p>
            </div>

            {/* FOOTER */}
            <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setViewMode("index")}
                className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl text-sm font-semibold transition"
              >
                Kembali
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default KotakSaran;
