import React, { useState } from "react";

function KotakSaran() {
  // 1. STATE UTAMA: Menyimpan data pesan masuk / keluar
  const [dataPesan, setDataPesan] = useState([
    {
      id: 1,
      sekolah: "SDN 01 Menteng",
      kategori: "Saran Pelayanan",
      subjek: "Kualitas Kemasan Makanan",
      isi: "Mohon kemasan makanan diperkuat karena beberapa kotak makanan mengalami kerusakan saat diterima siswa.",
      tanggal: "20-05-2026",
      status: "Belum Dibaca",
    },

    {
      id: 2,
      sekolah: "SMP Negeri 03 Jakarta",
      kategori: "Masukan Distribusi",
      subjek: "Pengiriman Terlambat",
      isi: "Distribusi makanan hari ini datang lebih lambat sekitar 20 menit dari jadwal biasanya.",
      tanggal: "20-05-2026",
      status: "Sudah Dibaca",
    },

    {
      id: 3,
      sekolah: "SMAN 05 Jakarta",
      kategori: "Evaluasi Menu",
      subjek: "Variasi Menu Mingguan",
      isi: "Siswa berharap terdapat variasi menu tambahan agar tidak monoton setiap minggunya.",
      tanggal: "19-05-2026",
      status: "Sudah Dibaca",
    },
  ]);
  // 2. STATE NAVIGASI INTERNAL: 'index' | 'create' | 'view'
  const [viewMode, setViewMode] = useState("index");

  // 3. STATE BUFFER: Penampung data formulir kirim pesan baru / detail baca pesan
  const [formData, setFormData] = useState({
    id: null,
    sekolah: "Sistem Admin", // Default pengirim saat admin mengirim pesan baru
    kategori: "Operasional",
    subjek: "",
    isi: "",
    tanggal: "",
    status: "Belum Dibaca",
  });

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

  // Handler Input Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Navigasi ke Tulis Pesan Baru (Create)
  const openCreateMode = () => {
    setFormData({
      id: null,
      Sekolah: "",
      kategori: "Operasional",
      subjek: "",
      isi: "",
      tanggal: "",
      status: "Belum Dibaca",
    });
    setViewMode("create");
  };

  // Navigasi ke Detail Pesan (Read/View) & Sekaligus Mengubah Status Menjadi "Sudah Dibaca"
  const openViewMode = (item) => {
    setFormData(item);
    setViewMode("view");

    // Otomatis tandai sudah dibaca jika statusnya masih baru
    if (item.status === "Belum Dibaca") {
      setDataPesan(
        dataPesan.map((p) =>
          p.id === item.id ? { ...p, status: "Sudah Dibaca" } : p,
        ),
      );
    }
  };

  // Handler Kirim / Simpan Pesan Baru (Create)
  const handleSendMessage = (e) => {
    e.preventDefault();

    const hariIni = new Date();
    const tanggalFormat = `${String(hariIni.getDate()).padStart(2, "0")}-${String(hariIni.getMonth() + 1).padStart(2, "0")}-${hariIni.getFullYear()}`;

    const payload = {
      id: Date.now(),
      sekolah: formData.pengirim,
      kategori: formData.kategori,
      subjek: formData.subjek,
      isi: formData.isi,
      tanggal: tanggalFormat,
      status: "Belum Dibaca",
    };

    setDataPesan([payload, ...dataPesan]); // Menambahkan pesan baru di paling atas
    setViewMode("index");
  };

  // Handler Hapus Pesan (Delete)
  const handleDeleteMessage = (id) => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus pesan ini dari arsip kotak masuk?",
      )
    ) {
      setDataPesan(dataPesan.filter((item) => item.id !== id));
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
              {viewMode === "index" &&
                "Pusat masukan, evaluasi, dan saran dari sekolah penerima layanan MBG/SPPG."}
              {viewMode === "create" &&
                "Kirim pesan pengumuman atau instruksi logistik baru."}
              {viewMode === "view" && "Membaca detail isi lembar pesan masuk."}
            </p>
          </div>

          {viewMode === "index" && (
            <button
              onClick={openCreateMode}
              className="inline-flex items-center justify-center px-4 py-2 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-violet-500/10 active:scale-95 transition-all duration-150"
            >
              <svg
                className="w-4 h-4 mr-2 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Tulis Pesan
            </button>
          )}
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
                            <button
                              onClick={() => handleDeleteMessage(item.id)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition"
                              title="Hapus Pesan"
                            >
                              <svg
                                className="w-4 h-4 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.728-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
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

        {/* ==================== BAGIAN CREATE ==================== */}
        {viewMode === "create" && (
          <div className="max-w-3xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-2xl p-8">
            {/* HEADER */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
                <span className="w-2 h-6 rounded-full bg-violet-500"></span>
                Tambah Saran & Masukan Sekolah
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Formulir ini digunakan sekolah untuk memberikan evaluasi,
                kritik, dan saran terhadap pelayanan MBG/SPPG.
              </p>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-6">
              {/* IDENTITAS SEKOLAH */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Nama Sekolah
                </label>

                <input
                  type="text"
                  name="sekolah"
                  value={formData.sekolah}
                  onChange={handleInputChange}
                  placeholder="Contoh: SDN 01 Menteng"
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm"
                />
              </div>

              {/* KATEGORI */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Kategori Saran
                </label>

                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm"
                >
                  <option value="Saran Pelayanan">Saran Pelayanan</option>

                  <option value="Masukan Distribusi">Masukan Distribusi</option>

                  <option value="Evaluasi Menu">Evaluasi Menu</option>
                </select>
              </div>

              {/* SUBJEK */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Judul Saran
                </label>

                <input
                  type="text"
                  name="subjek"
                  value={formData.subjek}
                  onChange={handleInputChange}
                  placeholder="Contoh: Keterlambatan Distribusi Makanan"
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm"
                />
              </div>

              {/* ISI SARAN */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Isi Saran / Evaluasi
                </label>

                <textarea
                  name="isi"
                  value={formData.isi}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Tuliskan kritik, evaluasi, atau saran terkait pelayanan MBG/SPPG..."
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm resize-none"
                ></textarea>
              </div>

              {/* BUTTON */}
              <div className="pt-5 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setViewMode("index")}
                  className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl text-sm font-semibold transition"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-violet-500 hover:bg-violet-600 text-white rounded-xl text-sm font-semibold transition"
                >
                  Simpan Saran
                </button>
              </div>
            </form>
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
