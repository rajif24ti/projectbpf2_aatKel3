import React, { useState } from "react";
import dataSekolahAwal from "../../data/data-sekolah.json";

function DataSekolah() {
  const [dataSekolah, setDataSekolah] = useState(dataSekolahAwal);

  const [viewMode, setViewMode] = useState("index");

  const [formData, setFormData] = useState({
    id: null,
    npsn: "",
    nama: "",
    jenjang: "",
    jumlahSiswa: "",
    alamat: "",
  });

  const resetForm = () => {
    setFormData({
      id: null,
      npsn: "",
      nama: "",
      jenjang: "",
      jumlahSiswa: "",
      alamat: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openCreateMode = () => {
    resetForm();
    setViewMode("create");
  };

  const openEditMode = (item) => {
    setFormData({
      ...item,
      jumlahSiswa: item.jumlahSiswa.toString(),
    });

    setViewMode("edit");
  };

  const handleDeleteData = (id, nama) => {
    const konfirmasi = window.confirm(
      `Apakah Anda yakin ingin menghapus sekolah "${nama}"?`
    );

    if (!konfirmasi) return;

    const dataBaru = dataSekolah.filter((item) => item.id !== id);

    setDataSekolah(dataBaru);
  };

  const handleSaveData = (e) => {
    e.preventDefault();

    if (!formData.npsn || !formData.nama || !formData.jenjang) {
      alert("Semua data wajib diisi");
      return;
    }

    if (Number(formData.jumlahSiswa) <= 0) {
      alert("Jumlah siswa harus lebih dari 0");
      return;
    }

    const npsnSudahAda = dataSekolah.some(
      (item) =>
        item.npsn === formData.npsn &&
        item.id !== formData.id
    );

    if (npsnSudahAda) {
      alert("NPSN sudah digunakan");
      return;
    }

    const payload = {
      id: formData.id ?? Date.now(),
      npsn: formData.npsn.trim(),
      nama: formData.nama.trim(),
      jenjang: formData.jenjang,
      jumlahSiswa: Number(formData.jumlahSiswa),
      alamat: formData.alamat.trim(),
    };

    if (viewMode === "create") {
      setDataSekolah([...dataSekolah, payload]);
    } else {
      setDataSekolah(
        dataSekolah.map((item) =>
          item.id === payload.id ? payload : item
        )
      );
    }

    resetForm();
    setViewMode("index");
  };

  return (
    <main className="grow transition-all duration-200">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              Data Sekolah Mitra
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Manajemen data sekolah penerima distribusi program makanan bergizi
              (MBG).
            </p>
          </div>

          {viewMode === "index" && (
            <button
              onClick={openCreateMode}
              className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-xl font-medium"
            >
              + Tambah Sekolah
            </button>
          )}
        </div>

        {/* TABEL */}
        {viewMode === "index" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">

            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700 text-xs uppercase text-gray-500">
                    <th className="p-4 text-center">No</th>
                    <th className="p-4">NPSN</th>
                    <th className="p-4">Nama Sekolah</th>
                    <th className="p-4 text-center">Jenjang</th>
                    <th className="p-4 text-center">Jumlah Siswa</th>
                    <th className="p-4">Alamat</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {dataSekolah.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-8 text-center text-gray-400"
                      >
                        Tidak ada data sekolah.
                      </td>
                    </tr>
                  ) : (
                    dataSekolah.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-t border-gray-100 dark:border-gray-700"
                      >
                        <td className="p-4 text-center">
                          {index + 1}
                        </td>

                        <td className="p-4 font-mono">
                          {item.npsn}
                        </td>

                        <td className="p-4 font-semibold">
                          {item.nama}
                        </td>

                        <td className="p-4 text-center">
                          <span className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg">
                            {item.jenjang}
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          {item.jumlahSiswa.toLocaleString("id-ID")}
                        </td>

                        <td className="p-4">
                          {item.alamat}
                        </td>

                        <td className="p-4">
                          <div className="flex justify-center gap-2">

                            <button
                              onClick={() => openEditMode(item)}
                              className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDeleteData(
                                  item.id,
                                  item.nama
                                )
                              }
                              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                            >
                              Hapus
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
          <div className="max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">

            <h2 className="text-lg font-bold mb-6">
              {viewMode === "create"
                ? "Tambah Sekolah"
                : "Edit Sekolah"}
            </h2>

            <form
              onSubmit={handleSaveData}
              className="space-y-4"
            >
              <input
                type="text"
                name="npsn"
                value={formData.npsn}
                onChange={handleInputChange}
                placeholder="NPSN"
                maxLength={8}
                required
                className="w-full border border-gray-300 rounded-xl p-3"
              />

              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                placeholder="Nama Sekolah"
                required
                className="w-full border border-gray-300 rounded-xl p-3"
              />

              <select
                name="jenjang"
                value={formData.jenjang}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3"
              >
                <option value="">Pilih Jenjang</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="SMK">SMK</option>
              </select>

              <input
                type="number"
                name="jumlahSiswa"
                value={formData.jumlahSiswa}
                onChange={handleInputChange}
                placeholder="Jumlah Siswa"
                required
                className="w-full border border-gray-300 rounded-xl p-3"
              />

              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                rows="3"
                placeholder="Alamat Sekolah"
                required
                className="w-full border border-gray-300 rounded-xl p-3"
              />

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="px-5 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-xl"
                >
                  Simpan
                </button>

                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setViewMode("index");
                  }}
                  className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl"
                >
                  Batal
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