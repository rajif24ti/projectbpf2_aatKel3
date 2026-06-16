import React, { useState } from "react";

function AbsensiPulang() {
  // DATA ABSENSI PULANG
  const [dataAbsensiPulang, setDataAbsensiPulang] = useState([
    {
      id: 1,
      tanggal: "2026-05-21",
      nama: "Siti Aminah",
      divisi: "Pengolahan",
      jamPulang: "08:00",
      status: "Pulang Tepat Waktu",
      keterangan: "Sesuai Jadwal Kerja",
    },

    {
      id: 2,
      tanggal: "2026-05-21",
      nama: "Budi Santoso",
      divisi: "Pengolahan",
      jamPulang: "08:00",
      status: "Pulang Tepat Waktu",
      keterangan: "Sesuai Jadwal Kerja",
    },

    {
      id: 3,
      tanggal: "2026-05-21",
      nama: "Rina Lestari",
      divisi: "Pemorsian",
      jamPulang: "09:30",
      status: "Pulang Cepat",
      keterangan: "Sebelum Jadwal Selesai",
    },

    {
      id: 4,
      tanggal: "2026-05-21",
      nama: "Agus Pratama",
      divisi: "Distribusi",
      jamPulang: "17:00",
      status: "Pulang Tepat Waktu",
      keterangan: "Sesuai Jadwal Kerja",
    },

    {
      id: 5,
      tanggal: "2026-05-21",
      nama: "Rahmat Hidayat",
      divisi: "Persiapan",
      jamPulang: "00:00",
      status: "Pulang Tepat Waktu",
      keterangan: "Sesuai Jadwal Kerja",
    },

    {
      id: 6,
      tanggal: "2026-05-21",
      nama: "Dewi Kartika",
      divisi: "Pencucian",
      jamPulang: "-",
      status: "Belum Absen",
      keterangan: "Belum Melakukan Absensi Pulang",
    },
  ]);

  // JADWAL SHIFT
  const jadwalDivisi = {
    Persiapan: {
      masuk: "19:00",
      pulang: "00:00",
      shift: "19:00 - 00:00",
    },

    Pengolahan: {
      masuk: "00:00",
      pulang: "08:00",
      shift: "00:00 - 08:00",
    },

    Pemorsian: {
      masuk: "05:00",
      pulang: "10:00",
      shift: "05:00 - 10:00",
    },

    Distribusi: {
      masuk: "08:00",
      pulang: "17:00",
      shift: "08:00 - 17:00",
    },

    Pencucian: {
      masuk: "13:00",
      pulang: "19:00",
      shift: "13:00 - 19:00",
    },
  };

  // DATA KARYAWAN
  const dataKaryawan = [
    {
      nama: "Rahmat Hidayat",
      divisi: "Persiapan",
    },
    {
      nama: "Nur Aisyah",
      divisi: "Persiapan",
    },
    {
      nama: "Siti Aminah",
      divisi: "Pengolahan",
    },
    {
      nama: "Budi Santoso",
      divisi: "Pengolahan",
    },
    {
      nama: "Rina Lestari",
      divisi: "Pemorsian",
    },
    {
      nama: "Agus Pratama",
      divisi: "Distribusi",
    },
    {
      nama: "Dewi Kartika",
      divisi: "Pencucian",
    },
  ];

  const [viewMode, setViewMode] = useState("index");

  const [formData, setFormData] = useState({
    id: null,
    tanggal: "",
    nama: "",
    divisi: "",
    jamPulang: "",
  });

  const filteredKaryawan = dataKaryawan.filter(
    (item) => item.divisi === formData.divisi,
  );

  // WARNA STATUS
  const getStatusColor = (status) => {
    switch (status) {
      case "Pulang Tepat Waktu":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";

      case "Pulang Cepat":
        return "bg-amber-50 text-amber-600 border-amber-200";

      case "Belum Absen":
        return "bg-sky-50 text-sky-600 border-sky-200";

      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  // HANDLE INPUT
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

  // MODE CREATE
  const openCreateMode = () => {
    setFormData({
      id: null,
      tanggal: new Date().toISOString().split("T")[0],
      nama: "",
      divisi: "",
      jamPulang: "",
    });

    setViewMode("create");
  };

  // MODE EDIT
  const openEditMode = (item) => {
    setFormData(item);
    setViewMode("edit");
  };

  // SIMPAN DATA
  const handleSaveData = (e) => {
    e.preventDefault();

    const batasPulang = jadwalDivisi[formData.divisi]?.pulang;

    let finalStatus = "";
    let keterangan = "";

    if (formData.jamPulang < batasPulang) {
      finalStatus = "Pulang Cepat";
      keterangan = "Sebelum Jadwal Selesai";
    } else {
      finalStatus = "Pulang Tepat Waktu";
      keterangan = "Sesuai Jadwal Kerja";
    }

    const payload = {
      id: formData.id || Date.now(),
      tanggal: formData.tanggal,
      nama: formData.nama,
      divisi: formData.divisi,
      jamPulang: formData.jamPulang,
      status: finalStatus,
      keterangan,
    };

    if (viewMode === "create") {
      setDataAbsensiPulang([...dataAbsensiPulang, payload]);
    } else {
      setDataAbsensiPulang(
        dataAbsensiPulang.map((item) =>
          item.id === formData.id ? payload : item,
        ),
      );
    }

    setViewMode("index");
  };

  // HAPUS DATA
  const handleDeleteData = (id) => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus data absensi pulang ini?",
      )
    ) {
      setDataAbsensiPulang(dataAbsensiPulang.filter((item) => item.id !== id));
    }
  };

  return (
    <main className="grow">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Absensi Pulang Staff SPPG
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Rekap absensi pulang pegawai operasional berdasarkan jadwal kerja
              masing-masing divisi.
            </p>
          </div>

          {viewMode === "index" && (
            <button
              onClick={openCreateMode}
              className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl"
            >
              Tambah Absensi Pulang
            </button>
          )}
        </div>

        {/* TABEL */}
        {viewMode === "index" && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold border-b">
                  <th className="px-6 py-4 text-left">No</th>
                  <th className="px-6 py-4 text-left">Tanggal</th>
                  <th className="px-6 py-4 text-left">Nama Pegawai</th>
                  <th className="px-6 py-4 text-left">Divisi</th>
                  <th className="px-6 py-4 text-left">Jam Pulang</th>
                  <th className="px-6 py-4 text-left">Keterangan</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {dataAbsensiPulang.map((item, index) => (
                  <tr
                    key={item.id}
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition"
                  >
                    <td className="p-4 text-center text-gray-400">
                      {index + 1}
                    </td>

                    <td className="p-4 px-6 text-xs text-gray-500 whitespace-nowrap">
                      {item.tanggal}
                    </td>

                    <td className="p-4 px-6 font-semibold text-gray-800">
                      {item.nama}
                    </td>

                    <td className="p-4 px-6 text-gray-600 whitespace-nowrap">
                      {item.divisi}
                    </td>

                    <td className="p-4 px-6 font-mono text-sm font-medium text-gray-700">
                      {item.jamPulang}
                    </td>

                    <td className="p-4 px-6 text-sm text-gray-500">
                      {item.keterangan}
                    </td>

                    <td className="p-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(item.status)}`}
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
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ==================== FORM CREATE / EDIT ==================== */}
        {(viewMode === "create" || viewMode === "edit") && (
          <div className="max-w-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-2xl p-6 transition-all duration-200">
            {/* HEADER FORM */}
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span
                className={`w-2 h-5 rounded-xs mr-2.5 ${
                  viewMode === "create" ? "bg-violet-500" : "bg-amber-500"
                }`}
              ></span>

              {viewMode === "create"
                ? "Tambah Log Kepulangan Staff SPPG"
                : `Ubah Absensi Pulang: ${formData.nama}`}
            </h2>

            {/* FORM */}
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

              {/* NAMA PEGAWAI */}
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

              {/* INFORMASI JAM KERJA */}
              {formData.divisi && (
                <div className="p-3 bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 rounded-xl">
                  <p className="text-sm text-violet-700 dark:text-violet-300">
                    Jadwal Kepulangan:
                    <strong className="ml-1">
                      {jadwalDivisi[formData.divisi]?.pulang}
                    </strong>
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
                  name="jamPulang"
                  value={formData.jamPulang}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 font-mono"
                />

                <p className="text-xs text-gray-400 mt-1.5">
                  Gunakan format jam digital otomatis.
                </p>
              </div>

              {/* BUTTON */}
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

export default AbsensiPulang;
