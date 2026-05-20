import React, { useState } from "react";

function DataSekolah() {
  // 1. STATE UTAMA: Menyimpan data master sekolah/mitra pengiriman MBG
  const [dataSekolah, setDataSekolah] = useState([
    {
      id: 1,
      npsn: "20103211",
      nama: "SDN 01 Pekanbaru",
      jenjang: "SD",
      akreditasi: "A",
      jumlahSiswa: 340,
      alamat: "Jl. Pemuda No. 10, Pekanbaru",
    },
    {
      id: 2,
      npsn: "20104562",
      nama: "SDN 05 Merdeka",
      jenjang: "SD",
      akreditasi: "A",
      jumlahSiswa: 210,
      alamat: "Jl. Merdeka Barat No. 45, Jakarta Pusat",
    },
    {
      id: 3,
      npsn: "20108923",
      nama: "SD Swasta Kartika",
      jenjang: "SD",
      akreditasi: "B",
      jumlahSiswa: 185,
      alamat: "Jl. Jend. Sudirman Kav. 21, Jakarta Selatan",
    },
    {
      id: 4,
      npsn: "20107741",
      nama: "SMPN 12 Jakarta",
      jenjang: "SMP",
      akreditasi: "A",
      jumlahSiswa: 520,
      alamat: "Jl. Wijaya Kebayoran Baru, Jakarta Selatan",
    },
  ]);

  // 2. STATE NAVIGASI INTERNAL: 'index' | 'create' | 'edit'
  const [viewMode, setViewMode] = useState("index");

  // 3. STATE BUFFER: Penampung data formulir tambah/ubah
  const [formData, setFormData] = useState({
    id: null,
    npsn: "",
    nama: "",
    jenjang: "",
    akreditasi: "A",
    jumlahSiswa: "",
    alamat: "",
  });

  // Fungsi pengondisian warna Badge Akreditasi
  const getBadgeAkreditasi = (akreditasi) => {
    switch (akreditasi) {
      case "A":
        return "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
      case "B":
        return "bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20";
      case "C":
        return "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20";
    }
  };

  // Handler Input Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Navigasi ke mode Tambah (Create)
  const openCreateMode = () => {
    setFormData({
      id: null,
      npsn: "",
      nama: "",
      akreditasi: "A",
      jumlahSiswa: "",
      alamat: "",
    });
    setViewMode("create");
  };

  // Navigasi ke mode Ubah (Edit)
  const openEditMode = (item) => {
    setFormData({ ...item });
    setViewMode("edit");
  };

  // Handler Simpan Data (Create & Edit)
  const handleSaveData = (e) => {
    e.preventDefault();

    // Validasi input angka jumlah siswa
    if (isNaN(formData.jumlahSiswa) || formData.jumlahSiswa <= 0) {
      alert("Jumlah siswa harus berupa angka valid dan lebih dari 0!");
      return;
    }

    const payload = {
      id: formData.id || Date.now(),
      npsn: formData.npsn,
      nama: formData.nama,
      jenjang: formData.jenjang,
      akreditasi: formData.akreditasi,
      jumlahSiswa: parseInt(formData.jumlahSiswa, 10),
      alamat: formData.alamat,
    };

    if (viewMode === "create") {
      // Validasi NPSN duplikat
      if (dataSekolah.some((sch) => sch.npsn === formData.npsn)) {
        alert("NPSN Sekolah sudah terdaftar di dalam sistem!");
        return;
      }
      setDataSekolah([...dataSekolah, payload]);
    } else if (viewMode === "edit") {
      setDataSekolah(
        dataSekolah.map((item) => (item.id === formData.id ? payload : item)),
      );
    }
    setViewMode("index");
  };

  // Handler Hapus Data
  const handleDeleteData = (id, nama) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus data "${nama}"? Tindakan ini tidak dapat dibatalkan.`,
      )
    ) {
      setDataSekolah(dataSekolah.filter((item) => item.id !== id));
    }
  };

  return (
    <main className="grow transition-all duration-200">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* HEADER HALAMAN */}
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold tracking-tight">
              Data Sekolah Mitra
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {viewMode === "index" &&
                "Manajemen data sekolah penerima distribusi program makanan bergizi (MBG)."}
              {viewMode === "create" &&
                "Registrasi profile dan kuota data sekolah mitra baru."}
              {viewMode === "edit" &&
                "Pembaruan data kuota siswa atau akreditasi sekolah."}
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
                  strokeWidth="2.5"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Tambah Sekolah
            </button>
          )}
        </div>

        {/* ==================== BAGIAN 1: INDEX (TABEL) ==================== */}
        {viewMode === "index" && (
          <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md shadow-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/40 text-gray-500 dark:text-gray-400 text-left text-xs uppercase font-bold tracking-wider border-b border-gray-100 dark:border-gray-700">
                    <th className="p-4 text-center w-12">No</th>
                    <th className="p-4 w-32">NPSN</th>
                    <th className="p-4">Nama Sekolah</th>
                    <th className="p-4 text-center w-24">Jenjang</th>
                    <th className="p-4 text-center w-28">Akreditasi</th>
                    <th className="p-4 text-center w-36">Jumlah Siswa</th>
                    <th className="p-4">Alamat Sekolah</th>
                    <th className="p-4 text-center w-28">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-sm">
                  {dataSekolah.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-8 text-center text-gray-400 dark:text-gray-500"
                      >
                        Tidak ada data sekolah mitra yang tercatat.
                      </td>
                    </tr>
                  ) : (
                    dataSekolah.map((item, index) => (
                      <tr
                        key={item.id}
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition"
                      >
                        <td className="p-4 text-center text-gray-400">
                          {index + 1}
                        </td>
                        <td className="p-4 font-mono text-xs font-semibold text-gray-600 dark:text-gray-400">
                          {item.npsn}
                        </td>
                        <td className="p-4 font-bold text-gray-800 dark:text-gray-100">
                          {item.nama}
                        </td>
                        <td className="p-4 text-center">
                          <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-600">
                            {item.jenjang}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeAkreditasi(item.akreditasi)}`}
                          >
                            {item.akreditasi}
                          </span>
                        </td>
                        <td className="p-4 text-center font-medium text-gray-800 dark:text-gray-200">
                          {item.jumlahSiswa.toLocaleString("id-ID")}{" "}
                          <span className="text-xs text-gray-400 font-normal">
                            Anak
                          </span>
                        </td>
                        <td
                          className="p-4 text-gray-500 dark:text-gray-400 truncate max-w-xs"
                          title={item.alamat}
                        >
                          {item.alamat}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => openEditMode(item)}
                              className="p-1.5 text-violet-500 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-lg transition"
                              title="Ubah Data Sekolah"
                            >
                              <svg
                                className="w-4 h-4 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteData(item.id, item.nama)
                              }
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition"
                              title="Hapus Sekolah"
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

        {/* ==================== BAGIAN 2 & 3: FORM CREATE / EDIT ==================== */}
        {(viewMode === "create" || viewMode === "edit") && (
          <div className="max-w-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-2xl p-6 transition-all duration-200">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span
                className={`w-2 h-5 rounded-xs mr-2.5 ${viewMode === "create" ? "bg-violet-500" : "bg-amber-500"}`}
              ></span>
              {viewMode === "create"
                ? "Registrasi Sekolah Baru"
                : `Ubah Profil Sekolah: ${formData.nama}`}
            </h2>

            <form onSubmit={handleSaveData} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field: NPSN */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    NPSN (Nomor Pokok Sekolah Nasional)
                  </label>
                  <input
                    type="text"
                    name="npsn"
                    value={formData.npsn}
                    onChange={handleInputChange}
                    placeholder="Contoh: 2010xxxx"
                    maxLength="8"
                    required
                    disabled={viewMode === "edit"}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 font-mono disabled:opacity-60"
                  />
                </div>

                {/* Field: Nama Sekolah */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Nama Instansi Sekolah
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama resmi sekolah..."
                    required
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Jenjang Sekolah
                </label>

                <select
                  name="jenjang"
                  value={formData.jenjang}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                >
                  <option value="">Pilih Jenjang</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="SMK">SMK</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field: Akreditasi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Peringkat Akreditasi
                  </label>
                  <select
                    name="akreditasi"
                    value={formData.akreditasi}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                  >
                    <option value="A">Terakreditasi A</option>
                    <option value="B">Terakreditasi B</option>
                    <option value="C">Terakreditasi C</option>
                    <option value="Belum Terakreditasi">
                      Belum Terakreditasi
                    </option>
                  </select>
                </div>

                {/* Field: Jumlah Siswa */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Jumlah Siswa Aktif (Kuota Porsi)
                  </label>
                  <input
                    type="number"
                    name="jumlahSiswa"
                    value={formData.jumlahSiswa}
                    onChange={handleInputChange}
                    placeholder="Contex: 250"
                    required
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              {/* Field: Alamat Lengkap */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Alamat Lengkap Distribusi
                </label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Tulis alamat jalan, nomor gedung, kecamatan, kota..."
                  required
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 resize-none"
                ></textarea>
              </div>

              {/* Catatan Bisnis Logistik */}
              <div className="p-4 bg-amber-50/60 dark:bg-amber-500/5 border border-dashed border-amber-200 dark:border-amber-500/20 rounded-xl">
                <p className="text-xs text-amber-600 dark:text-amber-400 leading-relaxed">
                  ⚠️ <strong>Penting:</strong> Data <em>Jumlah Siswa Aktif</em>{" "}
                  digunakan langsung oleh sistem produksi untuk menentukan kuota
                  takaran bahan masakan porsi harian otomatis.
                </p>
              </div>

              {/* Grup Tombol Aksi */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-700/60">
                <button
                  type="button"
                  onClick={() => setViewMode("index")}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-violet-500/10 active:scale-95 transition-all duration-150"
                >
                  {viewMode === "create"
                    ? "Simpan Sekolah"
                    : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

export default DataSekolah;
