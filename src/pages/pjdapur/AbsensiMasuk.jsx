import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

function Absensi() {
  // 1. STATE UTAMA: Menyimpan data absensi pegawai tim pengolahan
  const [dataAbsensi, setDataAbsensi] = useState([]);
  const [dataKaryawan, setDataKaryawan] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data dari Supabase
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch absensi dengan join ke karyawan sebagai fallback
      const { data: absensiData, error: absensiError } = await supabase
        .from("absensi")
        .select(`
          id, 
          tanggal, 
          karyawan_id,
          nama,
          divisi,
          jam_masuk, 
          status, 
          keterangan,
          karyawan ( nama, divisi )
        `)
        .order("tanggal", { ascending: false });

      if (absensiError) throw absensiError;

      // Gunakan kolom nama/divisi langsung dari absensi, fallback ke join relasi karyawan
      const formattedAbsensi = (absensiData || []).map(item => ({
        id: item.id,
        tanggal: item.tanggal,
        nama: item.nama || item.karyawan?.nama || "-",
        divisi: item.divisi || item.karyawan?.divisi || "-",
        jamMasuk: item.jam_masuk,
        status: item.status,
        keterangan: item.keterangan,
        karyawan_id: item.karyawan_id
      }));
      setDataAbsensi(formattedAbsensi);

      // Fetch karyawan untuk dropdown form
      const { data: karyawanData, error: karyawanError } = await supabase
        .from("karyawan")
        .select("id, nama, divisi, status_kerja")
        .eq("status_kerja", "Aktif");

      if (karyawanError) throw karyawanError;
      setDataKaryawan(karyawanData || []);

    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // JADWAL ABSENSI
  const jadwalDivisi = {
    Persiapan: {
      masuk: "19:00",
      shift: "19:00 - 00:00",
    },
    Pengolahan: {
      masuk: "00:00",
      shift: "00:00 - 08:00",
    },
    Pemorsian: {
      masuk: "05:00",
      shift: "05:00 - 10:00",
    },
    Distribusi: {
      masuk: "08:00",
      shift: "08:00 - 17:00",
    },
    Pencucian: {
      masuk: "13:00",
      shift: "13:00 - 19:00",
    },
  };

  // 2. STATE NAVIGASI INTERNAL: 'index' | 'create' | 'edit'
  const [viewMode, setViewMode] = useState("index");

  // 3. STATE BUFFER: Untuk penampung formulir
  const [formData, setFormData] = useState({
    id: null,
    tanggal: "",
    nama: "",
    divisi: "",
    jamMasuk: "",
    tipeStatus: "Kerja",
  });

  const filteredKaryawan = dataKaryawan.filter(
    (item) => item.divisi === formData.divisi,
  );

  // Fungsi pengondisian warna Badge Status
  const getStatusColor = (status) => {
    switch (status) {
      case "Hadir":
        return "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
      case "Terlambat":
        return "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
      case "Izin":
        return "bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20";
      case "Sakit":
        return "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20";
    }
  };

  // Handler Input Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "divisi") {
      setFormData({
        ...formData,
        divisi: value,
        nama: "",
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Navigasi ke halaman Tambah Data (Create)
  const openCreateMode = () => {
    setFormData({
      id: null,
      tanggal: "",
      nama: "",
      divisi: "",
      jamMasuk: "",
      tipeStatus: "Kerja",
    });
    setViewMode("create");
  };

  // Navigasi ke halaman Ubah Data (Edit)
  const openEditMode = (item) => {
    let tipe = "Kerja";
    if (item.status === "Izin" || item.status === "Sakit") {
      tipe = item.status;
    }
    setFormData({
      ...item,
      tipeStatus: tipe,
      jamMasuk: item.jamMasuk === "-" ? "" : item.jamMasuk,
    });
    setViewMode("edit");
  };

  // Handler Aksi Simpan (Create & Edit)
  const handleSaveData = async (e) => {
    e.preventDefault();

    let finalStatus = formData.tipeStatus;
    let finalJamMasuk = formData.jamMasuk;
    let keterangan = "";

    // VALIDASI KETAT: Jika statusnya adalah 'Kerja', cek format jam inputan
    if (formData.tipeStatus === "Kerja") {
      // Regex untuk memvalidasi format HH:MM (00:00 - 23:59)
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

      if (!timeRegex.test(finalJamMasuk)) {
        alert(
          "Format Jam Tidak Valid! Gunakan format 24 jam standar (Contoh: 00:30, 07:00).",
        );
        return; // Menghentikan fungsi simpan jika tidak valid
      }

      // Logika Otomatisasi Status berdasarkan jam masuk
      const batasMasuk = jadwalDivisi[formData.divisi]?.masuk;

      finalStatus = finalJamMasuk > batasMasuk ? "Terlambat" : "Hadir";

      keterangan =
        finalStatus === "Hadir" ? "Tepat Waktu" : "Melewati Jam Shift";
    } else {
      // Jika statusnya Izin atau Sakit, jam otomatis dikosongkan tanpa validasi
      finalJamMasuk = "-";
    }

    // Cari data karyawan berdasarkan nama yang dipilih
    const selectedKaryawan = dataKaryawan.find(k => k.nama === formData.nama && k.divisi === formData.divisi);
    
    if (!selectedKaryawan && viewMode === "create") {
       alert("Pegawai tidak ditemukan!");
       return;
    }

    const payload = {
      tanggal: formData.tanggal,
      karyawan_id: selectedKaryawan ? selectedKaryawan.id : formData.karyawan_id,
      nama: formData.nama,
      divisi: formData.divisi,
      jam_masuk: finalJamMasuk,
      status: finalStatus,
      keterangan,
    };

    try {
      if (viewMode === "create") {
        const { error } = await supabase.from("absensi").insert([payload]);
        if (error) throw error;
      } else if (viewMode === "edit") {
        const { error } = await supabase
          .from("absensi")
          .update(payload)
          .eq("id", formData.id);
        if (error) throw error;
      }
      
      await fetchData();
      setViewMode("index");
    } catch (error) {
      console.error("Error saving data:", error.message);
      alert("Gagal menyimpan data: " + error.message);
    }
  };

  // Handler Aksi Hapus Data
  const handleDeleteData = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data absensi ini?")) {
      try {
        const { error } = await supabase.from("absensi").delete().eq("id", id);
        if (error) throw error;
        await fetchData();
      } catch (error) {
        console.error("Error deleting data:", error.message);
        alert("Gagal menghapus data: " + error.message);
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
              Absensi Masuk Staff SPPG
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {viewMode === "index" &&
                "Rekap absensi masuk staff operasional berdasarkan divisi dan jadwal kerja."}
              {viewMode === "create" &&
                "Formulir input jam masuk kerja operasional baru."}
              {viewMode === "edit" && "Form pembaruan log absensi kerja."}
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
              Tambah Absensi
            </button>
          )}
        </div>

        {/* ==================== BAGIAN 1: INDEX ==================== */}
        {viewMode === "index" && (
          <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md shadow-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/40 text-gray-500 dark:text-gray-400 text-left text-xs uppercase font-bold tracking-wider border-b border-gray-100 dark:border-gray-700">
                    <th className="p-4 text-center w-12">No</th>
                    <th className="p-4">Tanggal</th>
                    <th className="p-4">Nama Pegawai</th>
                    <th className="p-4">Divisi</th>
                    <th className="p-4">Jam Masuk</th>
                    <th className="p-4">Keterangan</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center w-28">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-sm">
                  {dataAbsensi.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="p-8 text-center text-gray-400 dark:text-gray-500"
                      >
                        Tidak ada catatan Absensi Masuk Staff SPPG hari ini.
                      </td>
                    </tr>
                  ) : (
                    dataAbsensi.map((item, index) => (
                      <tr
                        key={item.id}
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition"
                      >
                        <td className="p-4 text-center text-gray-400">
                          {index + 1}
                        </td>

                        <td className="p-4 font-mono text-xs text-gray-500 dark:text-gray-400">
                          {item.tanggal}
                        </td>

                        <td className="p-4 font-semibold text-gray-800 dark:text-gray-100">
                          {item.nama}
                        </td>
                        <td className="p-4">{item.divisi}</td>
                        <td className="p-4 font-mono text-xs">
                          {item.jamMasuk}
                        </td>
                        <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                          {item.keterangan}
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => openEditMode(item)}
                              className="p-1.5 text-violet-500 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-lg transition"
                              title="Ubah Data"
                            >
                              <svg
                                className="w-4 h-4 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteData(item.id)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition"
                              title="Hapus"
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
                ? "Tambah Log Kehadiran Staff SPPG"
                : `Ubah Data Absensi: ${formData.nama}`}
            </h2>

            <form onSubmit={handleSaveData} className="space-y-5">
              {/* Field: Nama Pegawai */}
              {/* Field: Tanggal Absensi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Tanggal Absensi
                </label>

                <input
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                />
              </div>

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
                  disabled={viewMode === "edit"}
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

              {/* Field: Nama Pegawai */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Nama Pegawai
                </label>

                <select
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.divisi || viewMode === "edit"}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 disabled:opacity-50"
                >
                  <option value="">
                    {formData.divisi
                      ? "-- Pilih Pegawai --"
                      : "Pilih Divisi Terlebih Dahulu"}
                  </option>

                  {filteredKaryawan.map((pegawai, index) => (
                    <option key={index} value={pegawai.nama}>
                      {pegawai.nama}
                    </option>
                  ))}
                </select>
              </div>

              {/* Informasi Shift */}
              {formData.divisi && (
                <div className="p-3 bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 rounded-xl">
                  <p className="text-sm text-violet-700 dark:text-violet-300">
                    Jadwal Kerja:
                    <strong className="ml-1">
                      {jadwalDivisi[formData.divisi]?.shift}
                    </strong>
                  </p>
                </div>
              )}

              {/* Jenis Kategori Absensi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Kategori Kehadiran
                </label>
                <select
                  name="tipeStatus"
                  value={formData.tipeStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                >
                  <option value="Kerja">
                    Absen Kerja (Otomatis Hadir/Terlambat)
                  </option>
                  <option value="Izin">Izin (Manual)</option>
                  <option value="Sakit">Sakit (Manual)</option>
                </select>
                {formData.tipeStatus === "Kerja" && (
                  <p className="text-xs text-amber-500 mt-1.5 font-medium">
                    * Wajib diisi dengan format waktu jam digital (contoh 00:00
                    atau 07:30).
                  </p>
                )}
              </div>

              {/* Baris Input Jam Masuk */}
              {formData.tipeStatus === "Kerja" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Jam Masuk (Format HH:MM)
                    </label>
                    <input
                      type="time"
                      name="jamMasuk"
                      value={formData.jamMasuk}
                      onChange={handleInputChange}
                      placeholder="Contoh: 00:05"
                      maxLength="5"
                      required
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 font-mono"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 dark:bg-gray-700/20 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Jam kerja dinonaktifkan karena pegawai berstatus{" "}
                    <strong>{formData.tipeStatus}</strong>.
                  </p>
                </div>
              )}

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
                    ? "Simpan Absensi"
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

export default Absensi;
