import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dataProduksiAwal from "../../data/data-produksi.json";
import dataSekolah from "../../data/data-sekolah.json";

function Produksi() {
  // MODE HALAMAN
  const [viewMode, setViewMode] = useState("index");

  const [dataProduksi, setDataProduksi] = useState(() => {
    const saved = localStorage.getItem("dataProduksi");
    return saved ? JSON.parse(saved) : dataProduksiAwal;
  });

  const [query, setQuery] = useState("");

  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [formData, setFormData] = useState({
    id: null,
    tanggal: "",
    idSekolah: "",
    menu: "",
    porsi: "",
    kalori: "",
    protein: "",
    karbohidrat: "",
    lemak: "",
    serat: "",
  });

  useEffect(() => {
    console.log("Halaman Produksi berhasil dimuat");
  }, []);

  useEffect(() => {
    console.log(`Jumlah data produksi saat ini: ${dataProduksi.length}`);
  }, [dataProduksi]);

  useEffect(() => {
    console.log(`Mode aktif: ${viewMode}`);
  }, [viewMode]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    localStorage.setItem("dataProduksi", JSON.stringify(dataProduksi));
  }, [dataProduksi]);

  useEffect(() => {
    console.log(`Mencari data: ${debouncedQuery}`);
  }, [debouncedQuery]);

  // TOTAL PRODUKSI
  const totalProduksi = dataProduksi.reduce(
    (total, item) => total + Number(item.porsi),
    0,
  );

  const getNamaSekolah = (idSekolah) => {
    const sekolah = dataSekolah.find((item) => item.id === Number(idSekolah));

    return sekolah ? sekolah.nama : "Sekolah tidak ditemukan";
  };

  const filteredProduksi = dataProduksi.filter((item) => {
    const namaSekolah = getNamaSekolah(item.idSekolah);

    return (
      namaSekolah.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      (item.menu ?? "").toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      (item.tanggal ?? "").includes(debouncedQuery)
    );
  });

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Navigasi ke Form Tambah Data (Create)
  const openCreateMode = () => {
    const hariIni = new Date().toISOString().split("T")[0];

    setFormData({
      id: null,
      tanggal: hariIni,
      sekolah: "",
      menu: "",
      porsi: 0,
      kalori: 0,
      protein: 0,
      karbohidrat: 0,
      lemak: 0,
      serat: 0,
    });

    setViewMode("create");
  };

  // Navigasi ke Form Ubah Data (Edit)
  const openEditMode = (item) => {
    setFormData({
      id: item.id,
      tanggal: item.tanggal,
      sekolah: item.sekolah,
      menu: item.menu,
      porsi: item.porsi ?? 0,
      kalori: item.kalori ?? 0,
      protein: item.protein ?? 0,
      karbohidrat: item.karbohidrat ?? 0,
      lemak: item.lemak ?? 0,
      serat: item.serat ?? 0,
    });

    setViewMode("edit");
  };

  // Handler Kirim/Simpan Form
  const handleSaveData = (e) => {
    e.preventDefault();

    const payload = {
      id: formData.id || Date.now(),
      tanggal: formData.tanggal,
      idSekolah: Number(formData.idSekolah),
      menu: formData.menu,
      porsi: Number(formData.porsi),
      kalori: Number(formData.kalori),
      protein: Number(formData.protein),
      karbohidrat: Number(formData.karbohidrat),
      lemak: Number(formData.lemak),
      serat: Number(formData.serat),
    };

    if (viewMode === "create") {
      setDataProduksi((prev) => [...prev, payload]);
    } else {
      setDataProduksi((prev) =>
        prev.map((item) => (item.id === payload.id ? payload : item)),
      );
    }

    setViewMode("index");
  };
  // Handler Hapus Data Log Produksi
  const handleDeleteData = (id) => {
    if (
      window.confirm("Apakah Anda yakin ingin menghapus data produksi ini?")
    ) {
      setDataProduksi((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <main className="grow bg-slate-50 dark:bg-slate-900 min-h-screen transition-all">
      <div className="px-6 py-8 max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 text-white p-8 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="inline-flex px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase">
                MBG
              </span>

              <h1 className="mt-3 text-4xl font-bold">
                Data Produksi Distribusi
              </h1>

              <p className="text-violet-100 mt-2">
                {viewMode === "index" &&
                  "Kelola seluruh data produksi makanan harian MBG."}

                {viewMode === "create" && "Tambahkan data produksi baru."}

                {viewMode === "edit" && "Perbarui data produksi."}
              </p>
            </div>

            {viewMode === "index" && (
              <button
                onClick={openCreateMode}
                className="flex items-center gap-2 bg-white text-violet-600 hover:bg-violet-50 px-5 py-3 rounded-xl font-semibold shadow-lg transition hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 5v14m7-7H5"
                  />
                </svg>
                Tambah Produksi
              </button>
            )}
          </div>
        </div>

        {/* ================= CARD ================= */}

        {viewMode === "index" && (
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-500 text-sm">Total Produksi</p>

              <h2 className="text-4xl font-bold text-violet-600 mt-2">
                {totalProduksi.toLocaleString("id-ID")}
              </h2>

              <span className="text-gray-500">Porsi</span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-500 text-sm">Sekolah Dilayani</p>

              <h2 className="text-4xl font-bold text-blue-600 mt-2">
                {dataProduksi.length}
              </h2>

              <span className="text-gray-500">Sekolah</span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-500 text-sm">Rata-rata Produksi</p>

              <h2 className="text-4xl font-bold text-emerald-600 mt-2">
                {dataProduksi.length
                  ? Math.round(totalProduksi / dataProduksi.length)
                  : 0}
              </h2>

              <span className="text-gray-500">Porsi/Sekolah</span>
            </div>
          </div>
        )}

        {/* ================= TABEL ================= */}

        {viewMode === "index" && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b">
              <div className="relative">
                <svg
                  className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.2-5.2M11 19A8 8 0 1011 3a8 8 0 000 16z"
                  />
                </svg>

                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari sekolah, menu atau tanggal..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr className="text-xs uppercase text-gray-500">
                    <th className="px-6 py-4">No</th>

                    <th className="px-6 py-4">Tanggal</th>

                    <th className="px-6 py-4">Sekolah</th>

                    <th className="px-6 py-4">Menu</th>

                    <th className="px-6 py-4 text-center">Porsi</th>

                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {filteredProduksi.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-16 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl">
                            📦
                          </div>

                          <h3 className="font-semibold text-lg">
                            Data Tidak Ditemukan
                          </h3>

                          <p className="text-sm text-gray-400">
                            Coba gunakan kata kunci yang berbeda.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredProduksi.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-violet-50 dark:hover:bg-slate-700 transition-all"
                      >
                        {/* Nomor */}
                        <td className="px-6 py-5 font-semibold text-center">
                          {index + 1}
                        </td>

                        {/* Tanggal */}
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700">
                            {item.tanggal}
                          </span>
                        </td>

                        {/* Sekolah */}
                        <td className="px-6 py-5">
                          <Link
                            to={`/produksi/${item.id}`}
                            className="font-semibold text-violet-600 hover:text-violet-700"
                          >
                            {getNamaSekolah(item.idSekolah)}
                          </Link>
                        </td>

                        {/* Menu */}
                        <td className="px-6 py-5">
                          <div className="font-medium">{item.menu}</div>

                          <div className="text-xs text-gray-400 mt-1">
                            Kalori : {item.kalori} kkal
                          </div>
                        </td>

                        {/* Porsi */}
                        <td className="px-6 py-5 text-center">
                          <span className="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-bold">
                            {item.porsi.toLocaleString("id-ID")} Porsi
                          </span>
                        </td>

                        {/* Aksi */}
                        <td className="px-6 py-5">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => openEditMode(item)}
                              className="w-10 h-10 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-600 transition"
                            >
                              ✏️
                            </button>

                            <button
                              onClick={() => handleDeleteData(item.id)}
                              className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 transition"
                            >
                              🗑️
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

        {(viewMode === "create" || viewMode === "edit") && (
          <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
            {/* Header Form */}
            <div
              className={`px-8 py-6 text-white ${
                viewMode === "create"
                  ? "bg-gradient-to-r from-violet-600 to-indigo-500"
                  : "bg-gradient-to-r from-amber-500 to-orange-500"
              }`}
            >
              <h2 className="text-3xl font-bold">
                {viewMode === "create" ? "Tambah Produksi" : "Edit Produksi"}
              </h2>

              <p className="text-white/80 mt-2">
                Lengkapi seluruh informasi produksi makanan.
              </p>
            </div>

            <form onSubmit={handleSaveData} className="p-8 space-y-8">
              {/* Informasi Umum */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-6">Informasi Produksi</h3>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Tanggal
                    </label>

                    <input
                      type="date"
                      name="tanggal"
                      value={formData.tanggal}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Sekolah
                    </label>

                    <select
                      name="idSekolah"
                      value={formData.idSekolah}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
                    >
                      <option value="">Pilih Sekolah</option>

                      {dataSekolah.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-semibold">
                      Menu
                    </label>

                    <input
                      type="text"
                      name="menu"
                      value={formData.menu}
                      onChange={handleInputChange}
                      placeholder="Contoh : Nasi Ayam Sayur"
                      className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Jumlah Porsi
                    </label>

                    <input
                      type="number"
                      name="porsi"
                      value={formData.porsi}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Informasi Gizi */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-6">Informasi Gizi</h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Kalori (kkal)
                    </label>

                    <input
                      type="number"
                      name="kalori"
                      value={formData.kalori}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Protein (gr)
                    </label>

                    <input
                      type="number"
                      name="protein"
                      value={formData.protein}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Karbohidrat (gr)
                    </label>

                    <input
                      type="number"
                      name="karbohidrat"
                      value={formData.karbohidrat}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Lemak (gr)
                    </label>

                    <input
                      type="number"
                      name="lemak"
                      value={formData.lemak}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Serat (gr)
                    </label>

                    <input
                      type="number"
                      name="serat"
                      value={formData.serat}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border px-4 py-3"
                    />
                  </div>
                </div>
              </div>

              {/* Tombol */}
              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setViewMode("index")}
                  className="px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 font-semibold transition"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className={`px-8 py-3 rounded-xl text-white font-semibold shadow-lg transition hover:scale-105 ${
                    viewMode === "create"
                      ? "bg-violet-600 hover:bg-violet-700"
                      : "bg-amber-500 hover:bg-amber-600"
                  }`}
                >
                  {viewMode === "create"
                    ? "💾 Simpan Data"
                    : "✔ Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
export default Produksi;
