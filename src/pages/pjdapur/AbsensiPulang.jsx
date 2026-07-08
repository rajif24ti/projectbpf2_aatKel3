import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

function AbsensiPulang() {
  const [dataAbsensiPulang, setDataAbsensiPulang] = useState([]);
  const [dataKaryawan, setDataKaryawan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // JADWAL SHIFT per divisi
  const jadwalDivisi = {
    Persiapan:  { masuk: "19:00", pulang: "00:00", shift: "19:00 - 00:00" },
    Pengolahan: { masuk: "00:00", pulang: "08:00", shift: "00:00 - 08:00" },
    Pemorsian:  { masuk: "05:00", pulang: "10:00", shift: "05:00 - 10:00" },
    Distribusi: { masuk: "08:00", pulang: "17:00", shift: "08:00 - 17:00" },
    Pencucian:  { masuk: "13:00", pulang: "19:00", shift: "13:00 - 19:00" },
  };

  const [viewMode, setViewMode] = useState("index");
  const [formData, setFormData] = useState({
    id: null,
    tanggal: "",
    karyawan_id: "",
    nama: "",
    divisi: "",
    jam_pulang: "",
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [{ data: absenData, error: err1 }, { data: karData, error: err2 }] =
        await Promise.all([
          supabase
            .from("absensi")
            .select("*")
            .order("tanggal", { ascending: false }),
          supabase
            .from("karyawan")
            .select("*")
            .eq("status_kerja", "Aktif")
            .order("divisi", { ascending: true }),
        ]);

      if (err1) throw err1;
      if (err2) throw err2;

      setDataAbsensiPulang(absenData || []);
      setDataKaryawan(karData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Gagal memuat data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter karyawan berdasarkan divisi yang dipilih di form
  const filteredKaryawan = dataKaryawan.filter(
    (k) => k.divisi === formData.divisi
  );

  // Warna badge status pulang
  const getStatusColor = (status) => {
    switch (status) {
      case "Pulang Tepat Waktu":
        return "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "Pulang Cepat":
        return "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400";
      case "Belum Absen":
        return "bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400";
    }
  };

  // Warna badge status masuk
  const getStatusMasukColor = (status) => {
    switch (status) {
      case "Hadir":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "Terlambat":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "Izin":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "Sakit":
        return "bg-rose-50 text-rose-600 border-rose-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "divisi") {
      setFormData({ ...formData, divisi: value, nama: "", karyawan_id: "" });
      return;
    }
    if (name === "karyawan_id") {
      const karyawan = dataKaryawan.find((k) => k.id === parseInt(value));
      setFormData({
        ...formData,
        karyawan_id: value,
        nama: karyawan ? karyawan.nama : "",
      });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const openCreateMode = () => {
    setFormData({
      id: null,
      tanggal: new Date().toISOString().split("T")[0],
      karyawan_id: "",
      nama: "",
      divisi: "",
      jam_pulang: "",
    });
    setViewMode("create");
  };

  const openEditMode = (item) => {
    setFormData({
      id: item.id,
      tanggal: item.tanggal,
      karyawan_id: item.karyawan_id?.toString() || "",
      nama: item.nama || "",
      divisi: item.divisi || "",
      jam_pulang: item.jam_pulang || "",
    });
    setViewMode("edit");
  };

  const handleSaveData = async (e) => {
    e.preventDefault();

    const batasPulang = jadwalDivisi[formData.divisi]?.pulang;
    let finalStatus = "";
    let keteranganPulang = "";

    if (formData.jam_pulang < batasPulang) {
      finalStatus = "Pulang Cepat";
      keteranganPulang = "Sebelum Jadwal Selesai";
    } else {
      finalStatus = "Pulang Tepat Waktu";
      keteranganPulang = "Sesuai Jadwal Kerja";
    }

    try {
      setSaving(true);

      if (viewMode === "create") {
        // Cek apakah karyawan ini sudah ada absensi pada tanggal tsb
        const { data: existing } = await supabase
          .from("absensi")
          .select("id")
          .eq("karyawan_id", formData.karyawan_id)
          .eq("tanggal", formData.tanggal)
          .single();

        if (existing) {
          // Update record absensi yang sudah ada (isi pulang)
          const { error } = await supabase
            .from("absensi")
            .update({
              jam_pulang: formData.jam_pulang,
              status_pulang: finalStatus,
              keterangan_pulang: keteranganPulang,
              nama: formData.nama,
              divisi: formData.divisi,
            })
            .eq("id", existing.id);
          if (error) throw error;
        } else {
          // Insert record baru
          const { error } = await supabase.from("absensi").insert([{
            tanggal: formData.tanggal,
            karyawan_id: parseInt(formData.karyawan_id),
            nama: formData.nama,
            divisi: formData.divisi,
            jam_masuk: "-",
            jam_pulang: formData.jam_pulang,
            status: "Hadir",
            status_pulang: finalStatus,
            keterangan: "-",
            keterangan_pulang: keteranganPulang,
          }]);
          if (error) throw error;
        }
        alert("Absensi pulang berhasil dicatat!");
      } else {
        const { error } = await supabase
          .from("absensi")
          .update({
            tanggal: formData.tanggal,
            jam_pulang: formData.jam_pulang,
            status_pulang: finalStatus,
            keterangan_pulang: keteranganPulang,
          })
          .eq("id", formData.id);
        if (error) throw error;
        alert("Absensi pulang berhasil diperbarui!");
      }

      setViewMode("index");
      fetchAll();
    } catch (error) {
      console.error("Error saving absensi pulang:", error);
      alert("Gagal menyimpan data: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteData = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data absensi pulang ini?"))
      return;

    try {
      const { error } = await supabase.from("absensi").delete().eq("id", id);
      if (error) throw error;
      alert("Data berhasil dihapus!");
      fetchAll();
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Gagal menghapus data: " + error.message);
    }
  };

  // Ringkasan statistik
  const tepat = dataAbsensiPulang.filter((d) => d.status_pulang === "Pulang Tepat Waktu").length;
  const cepat = dataAbsensiPulang.filter((d) => d.status_pulang === "Pulang Cepat").length;
  const belum = dataAbsensiPulang.filter((d) => !d.status_pulang || d.status_pulang === "Belum Absen").length;

  return (
    <main className="grow">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
              Absensi Pulang Staff SPPG
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Rekap absensi pulang pegawai operasional berdasarkan jadwal kerja masing-masing divisi.
            </p>
          </div>

          {viewMode === "index" && (
            <button
              onClick={openCreateMode}
              className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl shadow-sm shadow-violet-500/10 active:scale-95 transition-all duration-150 whitespace-nowrap"
            >
              <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Tambah Absensi Pulang
            </button>
          )}
        </div>

        {/* STATISTIK RINGKAS */}
        {viewMode === "index" && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/40 rounded-2xl p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Tepat Waktu</p>
              <p className="text-2xl font-bold text-emerald-500">{tepat}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/40 rounded-2xl p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Pulang Cepat</p>
              <p className="text-2xl font-bold text-amber-500">{cepat}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/40 rounded-2xl p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Belum Absen</p>
              <p className="text-2xl font-bold text-sky-500">{belum}</p>
            </div>
          </div>
        )}

        {/* TABEL */}
        {viewMode === "index" && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/40 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold border-b border-gray-100 dark:border-gray-700">
                    <th className="px-4 py-4 text-center">No</th>
                    <th className="px-4 py-4 text-left">Tanggal</th>
                    <th className="px-4 py-4 text-left">Nama Pegawai</th>
                    <th className="px-4 py-4 text-left">Divisi</th>
                    <th className="px-4 py-4 text-center">Status Masuk</th>
                    <th className="px-4 py-4 text-center">Jam Pulang</th>
                    <th className="px-4 py-4 text-center">Status Pulang</th>
                    <th className="px-4 py-4 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="p-8 text-center text-gray-500">
                        Memuat data absensi...
                      </td>
                    </tr>
                  ) : dataAbsensiPulang.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="p-8 text-center text-gray-400 dark:text-gray-500">
                        Belum ada data absensi pulang.
                      </td>
                    </tr>
                  ) : (
                    dataAbsensiPulang.map((item, index) => (
                      <tr
                        key={item.id}
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition"
                      >
                        <td className="px-4 py-3 text-center text-gray-400">{index + 1}</td>
                        <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">{item.tanggal}</td>
                        <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-100">{item.nama || "-"}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{item.divisi || "-"}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusMasukColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center font-mono text-sm font-medium">
                          {item.jam_pulang || "-"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap ${getStatusColor(item.status_pulang || "Belum Absen")}`}>
                            {item.status_pulang || "Belum Absen"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => openEditMode(item)}
                              className="p-1.5 text-violet-500 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-lg transition"
                              title="Ubah Data"
                            >
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteData(item.id)}
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

        {/* FORM CREATE / EDIT */}
        {(viewMode === "create" || viewMode === "edit") && (
          <div className="max-w-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-2xl p-6 transition-all duration-200">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className={`w-2 h-5 rounded-xs mr-2.5 ${viewMode === "create" ? "bg-violet-500" : "bg-amber-500"}`}></span>
              {viewMode === "create"
                ? "Tambah Log Kepulangan Staff SPPG"
                : `Ubah Absensi Pulang: ${formData.nama}`}
            </h2>

            <form onSubmit={handleSaveData} className="space-y-5">
              {/* TANGGAL */}
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

              {/* DIVISI */}
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
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 disabled:opacity-50"
                >
                  <option value="">-- Pilih Divisi --</option>
                  <option value="Persiapan">Persiapan</option>
                  <option value="Pengolahan">Pengolahan</option>
                  <option value="Pemorsian">Pemorsian</option>
                  <option value="Distribusi">Distribusi</option>
                  <option value="Pencucian">Pencucian</option>
                </select>
              </div>

              {/* NAMA PEGAWAI - Dropdown dari Supabase */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Nama Pegawai
                </label>
                {viewMode === "create" ? (
                  <select
                    name="karyawan_id"
                    value={formData.karyawan_id}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.divisi}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 disabled:opacity-50"
                  >
                    <option value="">
                      {formData.divisi ? "-- Pilih Pegawai --" : "Pilih Divisi Terlebih Dahulu"}
                    </option>
                    {filteredKaryawan.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.nama}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData.nama}
                    disabled
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 opacity-60"
                  />
                )}
              </div>

              {/* INFO JADWAL */}
              {formData.divisi && (
                <div className="p-3 bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 rounded-xl">
                  <p className="text-sm text-violet-700 dark:text-violet-300">
                    Jadwal Shift: <strong>{jadwalDivisi[formData.divisi]?.shift}</strong>
                    <span className="ml-3">| Jadwal Kepulangan: <strong>{jadwalDivisi[formData.divisi]?.pulang}</strong></span>
                  </p>
                </div>
              )}

              {/* JAM PULANG */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Jam Pulang
                </label>
                <input
                  type="time"
                  name="jam_pulang"
                  value={formData.jam_pulang}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 font-mono"
                />
                <p className="text-xs text-gray-400 mt-1.5">
                  Status pulang akan ditentukan otomatis berdasarkan jadwal divisi.
                </p>
              </div>

              {/* TOMBOL */}
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
                  disabled={saving}
                  className="px-5 py-2 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-violet-500/10 active:scale-95 transition-all duration-150 disabled:opacity-60"
                >
                  {saving ? "Menyimpan..." : viewMode === "create" ? "Simpan Absensi" : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

export default AbsensiPulang;
