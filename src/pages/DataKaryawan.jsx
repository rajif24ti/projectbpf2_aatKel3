import React, { useState } from "react";

function DataKaryawan() {
  // 1. STATE UTAMA: Menyimpan data profil karyawan tim pengolahan
  const [dataKaryawan, setDataKaryawan] = useState([
    {
      id: 1,
      nip: "NIP1001",
      nama: "Rahmat Hidayat",
      divisi: "Persiapan",
      statusKerja: "Aktif",
    },
    {
      id: 2,
      nip: "NIP1002",
      nama: "Siti Aminah",
      divisi: "Pengolahan",
      statusKerja: "Aktif",
    },
    {
      id: 3,
      nip: "NIP1003",
      nama: "Budi Santoso",
      divisi: "Pengolahan",
      statusKerja: "Aktif",
    },
    {
      id: 4,
      nip: "NIP1004",
      nama: "Rina Lestari",
      divisi: "Pemorsian",
      statusKerja: "Aktif",
    },
    {
      id: 5,
      nip: "NIP1005",
      nama: "Agus Pratama",
      divisi: "Distribusi",
      statusKerja: "Aktif",
    },
    {
      id: 6,
      nip: "NIP1006",
      nama: "Dewi Kartika",
      divisi: "Pencucian",
      statusKerja: "Aktif",
    },
  ]);

  // 2. STATE NAVIGASI INTERNAL: 'index' | 'create' | 'edit'
  const [viewMode, setViewMode] = useState("index");

  // 3. STATE BUFFER: Untuk penampung formulir tambah/ubah data
  const [formData, setFormData] = useState({
    id: null,
    nip: "",
    nama: "",
    divisi: "",
    statusKerja: "Aktif",
  });

  // Fungsi pengondisian warna Badge Status Kerja Karyawan
  const getStatusKerjaColor = (status) => {
    return status === "Aktif"
      ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
      : "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20";
  };

  // Handler Input Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Navigasi ke halaman Tambah Data Karyawan (Create)
  const openCreateMode = () => {
    setFormData({
      id: null,
      nip: "",
      nama: "",
      divisi: "",
      statusKerja: "Aktif",
    });
    setViewMode("create");
  };

  // Navigasi ke halaman Ubah Data Karyawan (Edit)
  const openEditMode = (item) => {
    setFormData({ ...item });
    setViewMode("edit");
  };

  // Handler Aksi Simpan (Create & Edit)
  const handleSaveData = (e) => {
    e.preventDefault();

    const payload = {
      id: formData.id || Date.now(),
      nip: formData.nip,
      nama: formData.nama,
      divisi: formData.divisi,
      statusKerja: formData.statusKerja,
    };

    if (viewMode === "create") {
      // Validasi NIP duplikat sederhana
      if (dataKaryawan.some((emp) => emp.nip === formData.nip)) {
        alert("NIP sudah terdaftar di sistem!");
        return;
      }
      setDataKaryawan([...dataKaryawan, payload]);
    } else if (viewMode === "edit") {
      setDataKaryawan(
        dataKaryawan.map((item) => (item.id === formData.id ? payload : item)),
      );
    }
    setViewMode("index");
  };

  // Handler Aksi Hapus Data Karyawan
  const handleDeleteData = (id, nama) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus data karyawan "${nama}"? Semua log absensi tersambung akan diarsipkan.`,
      )
    ) {
      setDataKaryawan(dataKaryawan.filter((item) => item.id !== id));
    }
  };

  return (
    <main className="grow transition-all duration-200">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* HEADER HALAMAN */}
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold tracking-tight">
              Data Karyawan SPPG
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {viewMode === "index" &&
                "Manajemen data pegawai operasional dan sinkronisasi absensi berdasarkan divisi kerja."}
              {viewMode === "create" &&
                "Pendaftaran data profil karyawan operasional baru."}
              {viewMode === "edit" &&
                "Pembaruan informasi divisi kerja karyawan."}
            </p>
          </div>

          {viewMode === "index" && (
            <button
              onClick={openCreateMode}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-violet-500/10 active:scale-95 transition-all duration-150"
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
              Tambah Karyawan
            </button>
          )}
        </div>

        {/* ==================== BAGIAN 1: INDEX (TABEL) ==================== */}
        {viewMode === "index" && (
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl overflow-hidden">
            {" "}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <tr className="bg-gray-50 dark:bg-gray-700/30 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                  {" "}
                  <th className="px-6 py-4 text-center w-12">No</th>
                  <th className="px-6 py-4 text-center">NIP</th>
                  <th className="px-6 py-4 text-center">Nama Lengkap</th>
                  <th className="px-6 py-4 whitespace-nowrap">Divisi </th>
                  <th className="px-6 py-4 text-center">Status Kerja</th>
                  <th className="px-6 py-4 text-center w-28">Aksi</th>
                </tr>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-sm">
                  {dataKaryawan.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50/70 dark:hover:bg-gray-700/20 transition"
                    >
                      {/* NOMOR */}
                      <td className="w-16 px-6 py-5 text-center text-gray-500 font-medium">
                        {index + 1}
                      </td>

                      {/* NIP */}
                      <td className="w-44 px-6 py-5 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-mono text-sm text-gray-500 dark:text-gray-400 tracking-wide">
                            {item.nip}
                          </span>
                        </div>
                      </td>

                      {/* NAMA */}
                      <td className="w-[280px] px-6 py-5 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <span className="font-semibold text-gray-800 dark:text-gray-100 leading-tight">
                            {item.nama}
                          </span>
                        </div>
                      </td>

                      {/* DIVISI */}
                      <td className="w-56 px-6 py-5 text-center">
                        <span className="inline-flex items-center justify-center min-w-[120px] px-3 py-1.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                          {item.divisi}
                        </span>
                      </td>

                      {/* STATUS KERJA */}
                      <td className="w-48 px-6 py-5 text-center">
                        <span
                          className={`inline-flex items-center justify-center min-w-[80px] px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${getStatusKerjaColor(
                            item.statusKerja,
                          )}`}
                        >
                          {item.statusKerja}
                        </span>
                      </td>

                      {/* AKSI */}
                      <td className="w-32 px-6 py-5 text-center">
                        <div className="flex justify-center items-center gap-4">
                          {/* BUTTON EDIT */}
                          <button
                            onClick={() => openEditMode(item)}
                            className="p-2 text-violet-500 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-xl transition"
                            title="Ubah Profil"
                          >
                            <svg
                              className="w-4 h-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>

                          {/* BUTTON DELETE */}
                          <button
                            onClick={() => handleDeleteData(item.id, item.nama)}
                            className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition"
                            title="Hapus Karyawan"
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
                  ))}
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
                ? "Registrasi Karyawan Baru"
                : `Ubah Data Master: ${formData.nama}`}
            </h2>

            <form onSubmit={handleSaveData} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field: NIP */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Nomor Induk Pegawai (NIP)
                  </label>
                  <input
                    type="text"
                    name="nip"
                    value={formData.nip}
                    onChange={handleInputChange}
                    placeholder="Contoh: NIP1006"
                    required
                    disabled={viewMode === "edit"}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 font-mono disabled:opacity-60"
                  />
                </div>

                {/* Field: Nama */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama sesuai KTP..."
                    required
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field: Divisi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Divisi Kerja
                  </label>
                  <select
                    name="divisi"
                    value={formData.divisi}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                  >
                    <option value="">-- Pilih Divisi --</option>
                    <option value="Persiapan">Persiapan</option>
                    <option value="Pengolahan">Pengolahan</option>
                    <option value="Pemorsian">Pemorsian</option>
                    <option value="Distribusi">Distribusi</option>
                    <option value="Pencucian">Pencucian</option>
                  </select>
                </div>
              </div>

              {/* Status Kerja */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Status Kontrak Kerja
                </label>
                <select
                  name="statusKerja"
                  value={formData.statusKerja}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                >
                  <option value="Aktif">Aktif Bekerja</option>
                  <option value="Non-Aktif">Non-Aktif / Resign</option>
                </select>
              </div>

              {/* Informasi Tambahan Hubungan Sistem */}
              <div className="p-4 bg-violet-50/50 dark:bg-violet-500/5 border border-dashed border-violet-100 dark:border-violet-500/20 rounded-xl">
                <p className="text-xs text-violet-600 dark:text-violet-400 leading-relaxed">
                  💡 <strong>Informasi Sistem:</strong> Nama karyawan yang
                  didaftarkan di sini akan otomatis disinkronisasikan dan dapat
                  dipilih langsung pada menu <strong>Absensi</strong> harian.
                </p>
              </div>

              {/* Grup Tombol Pengendali */}
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
                    ? "Daftarkan Karyawan"
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

export default DataKaryawan;
