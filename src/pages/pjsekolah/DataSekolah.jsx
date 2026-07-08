import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

function DataSekolah() {
  const [dataSekolah, setDataSekolah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState("index");

  const [formData, setFormData] = useState({
    id: null,
    npsn: "",
    nama: "",
    jenjang: "",
    jumlah_siswa: "",
    alamat: "",
  });

  useEffect(() => {
    fetchDataSekolah();
  }, []);

  const fetchDataSekolah = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("sekolah")
        .select("*")
        .order("nama", { ascending: true });

      if (error) throw error;
      setDataSekolah(data || []);
    } catch (error) {
      console.error("Error fetching data sekolah:", error);
      alert("Gagal mengambil data sekolah: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      npsn: "",
      nama: "",
      jenjang: "",
      jumlah_siswa: "",
      alamat: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openCreateMode = () => {
    resetForm();
    setViewMode("create");
  };

  const openEditMode = (item) => {
    setFormData({
      id: item.id,
      npsn: item.npsn,
      nama: item.nama,
      jenjang: item.jenjang,
      jumlah_siswa: item.jumlah_siswa?.toString() || "",
      alamat: item.alamat || "",
    });
    setViewMode("edit");
  };

  const handleDeleteData = async (id, nama) => {
    const konfirmasi = window.confirm(
      `Apakah Anda yakin ingin menghapus sekolah "${nama}"?`
    );
    if (!konfirmasi) return;

    try {
      const { error } = await supabase.from("sekolah").delete().eq("id", id);
      if (error) throw error;
      alert("Data sekolah berhasil dihapus!");
      fetchDataSekolah();
    } catch (error) {
      console.error("Error deleting sekolah:", error);
      alert("Gagal menghapus data: " + error.message);
    }
  };

  const handleSaveData = async (e) => {
    e.preventDefault();

    if (!formData.npsn || !formData.nama || !formData.jenjang) {
      alert("Semua data wajib diisi");
      return;
    }

    if (Number(formData.jumlah_siswa) <= 0) {
      alert("Jumlah siswa harus lebih dari 0");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        npsn: formData.npsn.trim(),
        nama: formData.nama.trim(),
        jenjang: formData.jenjang,
        jumlah_siswa: Number(formData.jumlah_siswa),
        alamat: formData.alamat.trim(),
      };

      if (viewMode === "create") {
        const { error } = await supabase.from("sekolah").insert([payload]);
        if (error) throw error;
        alert("Sekolah berhasil ditambahkan!");
      } else {
        const { error } = await supabase
          .from("sekolah")
          .update(payload)
          .eq("id", formData.id);
        if (error) throw error;
        alert("Data sekolah berhasil diperbarui!");
      }

      resetForm();
      setViewMode("index");
      fetchDataSekolah();
    } catch (error) {
      console.error("Error saving sekolah:", error);
      alert("Gagal menyimpan data: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const totalSiswa = dataSekolah.reduce(
    (sum, item) => sum + (item.jumlah_siswa || 0),
    0
  );

  return (
    <main className="grow transition-all duration-200">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
              Data Sekolah Mitra
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manajemen data sekolah penerima distribusi program makanan bergizi (MBG).
            </p>
          </div>

          {viewMode === "index" && (
            <div className="flex items-center gap-3">
              <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/40 rounded-xl px-4 py-2 text-center">
                <p className="text-xs text-gray-400">Total Sekolah</p>
                <p className="text-xl font-bold text-blue-600">{dataSekolah.length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/40 rounded-xl px-4 py-2 text-center">
                <p className="text-xs text-gray-400">Total Siswa</p>
                <p className="text-xl font-bold text-violet-600">{totalSiswa.toLocaleString("id-ID")}</p>
              </div>
              <button
                onClick={openCreateMode}
                className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl shadow-sm shadow-violet-500/10 active:scale-95 transition-all duration-150"
              >
                <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
                Tambah Sekolah
              </button>
            </div>
          )}
        </div>

        {/* TABEL */}
        {viewMode === "index" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/40 text-xs uppercase text-gray-500 dark:text-gray-400 tracking-wider border-b border-gray-100 dark:border-gray-700">
                    <th className="p-4 text-center">No</th>
                    <th className="p-4">NPSN</th>
                    <th className="p-4">Nama Sekolah</th>
                    <th className="p-4 text-center">Jenjang</th>
                    <th className="p-4 text-center">Jumlah Siswa</th>
                    <th className="p-4">Alamat</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-gray-500">
                        Memuat data sekolah...
                      </td>
                    </tr>
                  ) : dataSekolah.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-gray-400 dark:text-gray-500">
                        Tidak ada data sekolah.
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

                        <td className="p-4 font-mono text-xs">
                          {item.npsn}
                        </td>

                        <td className="p-4 font-semibold text-gray-800 dark:text-gray-100">
                          {item.nama}
                        </td>

                        <td className="p-4 text-center">
                          <span className="px-2 py-1 text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 rounded-lg">
                            {item.jenjang}
                          </span>
                        </td>

                        <td className="p-4 text-center font-medium text-gray-800 dark:text-gray-100">
                          {(item.jumlah_siswa || 0).toLocaleString("id-ID")}
                          <span className="text-xs text-gray-400 font-normal ml-1">siswa</span>
                        </td>

                        <td className="p-4 text-gray-500 dark:text-gray-400 truncate max-w-xs" title={item.alamat}>
                          {item.alamat}
                        </td>

                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => openEditMode(item)}
                              className="p-1.5 text-violet-500 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-lg transition"
                              title="Edit Data"
                            >
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteData(item.id, item.nama)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition"
                              title="Hapus Data"
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
          <div className="max-w-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className={`w-2 h-5 rounded-xs mr-2.5 ${viewMode === "create" ? "bg-violet-500" : "bg-amber-500"}`}></span>
              {viewMode === "create" ? "Tambah Sekolah Mitra Baru" : `Edit Data Sekolah: ${formData.nama}`}
            </h2>

            <form onSubmit={handleSaveData} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">NPSN</label>
                  <input
                    type="text"
                    name="npsn"
                    value={formData.npsn}
                    onChange={handleInputChange}
                    placeholder="Contoh: 20103211"
                    maxLength={8}
                    required
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Jenjang</label>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nama Sekolah</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Contoh: SDN 01 Pekanbaru"
                  required
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Jumlah Siswa</label>
                <input
                  type="number"
                  name="jumlah_siswa"
                  value={formData.jumlah_siswa}
                  onChange={handleInputChange}
                  placeholder="Contoh: 350"
                  min="1"
                  required
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Alamat Sekolah</label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Alamat lengkap sekolah..."
                  required
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-700/60">
                <button
                  type="button"
                  onClick={() => { resetForm(); setViewMode("index"); }}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-violet-500/10 active:scale-95 transition-all duration-150 disabled:opacity-60"
                >
                  {saving ? "Menyimpan..." : viewMode === "create" ? "Tambah Sekolah" : "Simpan Perubahan"}
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