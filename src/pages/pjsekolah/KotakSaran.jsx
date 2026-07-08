import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

function KotakSaran() {
  const [dataPesan, setDataPesan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState("index");

  const [formData, setFormData] = useState({
    id: null,
    sekolah_nama: "",
    kategori: "Saran Pelayanan",
    subjek: "",
    isi: "",
    tanggal: "",
    status: "Belum Dibaca",
  });

  useEffect(() => {
    fetchKotakSaran();
  }, []);

  const fetchKotakSaran = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("kotak_saran")
        .select("*")
        .order("tanggal", { ascending: false });
      if (error) throw error;
      setDataPesan(data || []);
    } catch (error) {
      console.error("Error fetching kotak saran:", error);
      alert("Gagal memuat data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Warna badge kategori
  const getKategoriColor = (kategori) => {
    switch (kategori) {
      case "Saran Pelayanan":
        return "bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400";
      case "Masukan Distribusi":
        return "bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400";
      case "Evaluasi Menu":
        return "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openCreateMode = () => {
    setFormData({
      id: null,
      sekolah_nama: "",
      kategori: "Saran Pelayanan",
      subjek: "",
      isi: "",
      tanggal: new Date().toISOString().split("T")[0],
      status: "Belum Dibaca",
    });
    setViewMode("create");
  };

  const openEditMode = (item) => {
    setFormData({
      id: item.id,
      sekolah_nama: item.sekolah_nama,
      kategori: item.kategori,
      subjek: item.subjek,
      isi: item.isi,
      tanggal: item.tanggal,
      status: item.status,
    });
    setViewMode("edit");
  };

  const openViewMode = async (item) => {
    setFormData(item);
    setViewMode("view");

    // Tandai sudah dibaca jika masih belum dibaca
    if (item.status === "Belum Dibaca") {
      try {
        await supabase
          .from("kotak_saran")
          .update({ status: "Sudah Dibaca" })
          .eq("id", item.id);
        setDataPesan(
          dataPesan.map((p) =>
            p.id === item.id ? { ...p, status: "Sudah Dibaca" } : p
          )
        );
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = {
        sekolah_nama: formData.sekolah_nama,
        kategori: formData.kategori,
        subjek: formData.subjek,
        isi: formData.isi,
        tanggal: formData.tanggal || new Date().toISOString().split("T")[0],
        status: formData.status,
      };

      if (viewMode === "create") {
        const { error } = await supabase.from("kotak_saran").insert([payload]);
        if (error) throw error;
        alert("Saran berhasil dikirim!");
      } else {
        const { error } = await supabase
          .from("kotak_saran")
          .update(payload)
          .eq("id", formData.id);
        if (error) throw error;
        alert("Saran berhasil diperbarui!");
      }

      setViewMode("index");
      fetchKotakSaran();
    } catch (error) {
      console.error("Error saving saran:", error);
      alert("Gagal menyimpan: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus pesan ini?")) return;
    try {
      const { error } = await supabase.from("kotak_saran").delete().eq("id", id);
      if (error) throw error;
      alert("Pesan berhasil dihapus!");
      fetchKotakSaran();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Gagal menghapus: " + error.message);
    }
  };

  const belumDibaca = dataPesan.filter((p) => p.status === "Belum Dibaca").length;

  return (
    <main className="grow transition-all duration-200">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold tracking-tight">
              Kotak Saran Sekolah
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {viewMode === "index" && "Pusat masukan, evaluasi, dan saran dari sekolah penerima layanan MBG/SPPG."}
              {viewMode === "create" && "Kirim saran atau evaluasi baru dari sekolah."}
              {viewMode === "edit" && "Ubah data saran yang sudah ada."}
              {viewMode === "view" && "Membaca detail isi saran sekolah."}
            </p>
          </div>

          {viewMode === "index" && (
            <div className="flex items-center gap-3">
              {belumDibaca > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 text-xs font-bold rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
                  {belumDibaca} Belum Dibaca
                </span>
              )}
              <button
                onClick={openCreateMode}
                className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-violet-500/10 active:scale-95 transition-all duration-150"
              >
                <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Tulis Saran
              </button>
            </div>
          )}
        </div>

        {/* ===== TABEL INDEX ===== */}
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
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-500">
                        Memuat data kotak saran...
                      </td>
                    </tr>
                  ) : dataPesan.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-400 dark:text-gray-500">
                        Kotak masuk kosong. Tidak ada saran saat ini.
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
                            <span className="w-2 h-2 rounded-full bg-violet-500 inline-block animate-pulse"></span>
                          ) : (
                            index + 1
                          )}
                        </td>
                        <td className="p-4 text-gray-800 dark:text-gray-100">
                          <span className="truncate block max-w-[180px]">{item.sekolah_nama}</span>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getKategoriColor(item.kategori)}`}>
                            {item.kategori}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-800 dark:text-gray-200 truncate max-w-md">{item.subjek}</div>
                          <div className="text-xs text-gray-400 font-normal truncate max-w-md">{item.isi}</div>
                        </td>
                        <td className="p-4 text-center font-mono text-xs text-gray-500">{item.tanggal}</td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => openViewMode(item)}
                              className="p-1.5 text-sky-500 hover:text-sky-700 hover:bg-sky-50 dark:hover:bg-sky-500/10 rounded-lg transition"
                              title="Lihat Detail"
                            >
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button
                              onClick={() => openEditMode(item)}
                              className="p-1.5 text-violet-500 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-lg transition"
                              title="Edit"
                            >
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(item.id)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition"
                              title="Hapus"
                            >
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.728-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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

        {/* ===== FORM CREATE / EDIT ===== */}
        {(viewMode === "create" || viewMode === "edit") && (
          <div className="max-w-3xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
              <span className={`w-2 h-6 rounded-full ${viewMode === "create" ? "bg-violet-500" : "bg-amber-500"}`}></span>
              {viewMode === "create" ? "Kirim Saran & Masukan Sekolah" : "Edit Saran Sekolah"}
            </h2>

            <form onSubmit={handleSendMessage} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nama Sekolah</label>
                <input
                  type="text"
                  name="sekolah_nama"
                  value={formData.sekolah_nama}
                  onChange={handleInputChange}
                  placeholder="Contoh: SDN 01 Pekanbaru"
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Kategori Saran</label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                  >
                    <option value="Saran Pelayanan">Saran Pelayanan</option>
                    <option value="Masukan Distribusi">Masukan Distribusi</option>
                    <option value="Evaluasi Menu">Evaluasi Menu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tanggal</label>
                  <input
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Judul Saran</label>
                <input
                  type="text"
                  name="subjek"
                  value={formData.subjek}
                  onChange={handleInputChange}
                  placeholder="Contoh: Keterlambatan Distribusi Makanan"
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Isi Saran / Evaluasi</label>
                <textarea
                  name="isi"
                  value={formData.isi}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Tuliskan kritik, evaluasi, atau saran terkait pelayanan MBG/SPPG..."
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setViewMode("index")}
                  className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl text-sm font-semibold transition text-gray-700 dark:text-gray-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-violet-500 hover:bg-violet-600 text-white rounded-xl text-sm font-semibold transition disabled:opacity-60 active:scale-95"
                >
                  {saving ? "Menyimpan..." : viewMode === "create" ? "Kirim Saran" : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ===== VIEW DETAIL ===== */}
        {viewMode === "view" && (
          <div className="max-w-3xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-2xl p-8">
            <div className="border-b border-gray-100 dark:border-gray-700 pb-5 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border mb-3 ${getKategoriColor(formData.kategori)}`}>
                    {formData.kategori}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 leading-snug">{formData.subjek}</h2>
                  <div className="mt-3 flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>Sekolah: <strong className="ml-1 text-gray-700 dark:text-gray-200">{formData.sekolah_nama}</strong></span>
                    <span>Tanggal: <strong className="ml-1 text-gray-700 dark:text-gray-200">{formData.tanggal}</strong></span>
                    <span>Status: <strong className={`ml-1 ${formData.status === "Belum Dibaca" ? "text-violet-600" : "text-emerald-600"}`}>{formData.status}</strong></span>
                  </div>
                </div>
                <button
                  onClick={() => setViewMode("index")}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/20 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 min-h-[200px]">
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">{formData.isi}</p>
            </div>
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
