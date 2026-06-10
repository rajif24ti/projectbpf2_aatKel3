import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dataProduksiAwal from "../data/data-produksi.json";

function Produksi() {
  // MODE HALAMAN
  const [viewMode, setViewMode] = useState("index");

  const [dataProduksi, setDataProduksi] = useState(dataProduksiAwal);

  const [query, setQuery] = useState("");

  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [formData, setFormData] = useState({
    id: null,

    tanggal: "",
    sekolah: "",
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
    console.log(`Mencari data: ${debouncedQuery}`);
  }, [debouncedQuery]);

  // TOTAL PRODUKSI
  const totalProduksi = dataProduksi.reduce(
    (total, item) => total + item.porsi,
    0,
  );

  const filteredProduksi = dataProduksi.filter((item) => {
  return (
    item.sekolah
      .toLowerCase()
      .includes(debouncedQuery.toLowerCase()) ||

    item.menu
      .toLowerCase()
      .includes(debouncedQuery.toLowerCase()) ||

    item.tanggal.includes(debouncedQuery)
  );
});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Navigasi ke Form Tambah Data (Create)
  const openCreateMode = () => {
    const hariIni = new Date().toISOString().split("T")[0];

    setFormData({
      id: null,
      tanggal: hariIni,
      sekolah: "",
      menu: "",
      porsi: "",
    });

    setViewMode("create");
  };

  // Navigasi ke Form Ubah Data (Edit)
  const openEditMode = (item) => {
    setFormData(item);
    setViewMode("edit");
  };

  // Handler Kirim/Simpan Form
  const handleSaveData = (e) => {
    e.preventDefault();

    const payload = {
      id: formData.id || Date.now(),

      tanggal: formData.tanggal,
      sekolah: formData.sekolah,
      menu: formData.menu,
      porsi: Number(formData.porsi),

      kalori: Number(formData.kalori),
      protein: Number(formData.protein),
      karbohidrat: Number(formData.karbohidrat),
      lemak: Number(formData.lemak),
      serat: Number(formData.serat),
    };

    if (viewMode === "create") {
      setDataProduksi([...dataProduksi, payload]);
    } else if (viewMode === "edit") {
      setDataProduksi(
        dataProduksi.map((item) => (item.id === formData.id ? payload : item)),
      );
    }

    setViewMode("index");
  };

  // Handler Hapus Data Log Produksi
  const handleDeleteData = (id) => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus catatan produksi makanan ini?",
      )
    ) {
      setDataProduksi(dataProduksi.filter((item) => item.id !== id));
    }
  };

  return (
    <main className="grow transition-all duration-200">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* HEADER HALAMAN */}
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold tracking-tight">
              Data Produksi Distribusi
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {viewMode === "index" &&
                "Manajemen data produksi dan distribusi makanan harian MBG/SPPG."}
              {viewMode === "create" &&
                "Formulir penambahan data produksi makanan untuk sekolah penerima MBG."}
              {viewMode === "edit" &&
                "Formulir pembaruan data produksi makanan yang telah tercatat."}{" "}
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
              Tambah Produksi
            </button>
          )}
        </div>

        {/* KARTU STATISTIK (Hanya Tampil di Mode Tabel Utama) */}
        {viewMode === "index" && (
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/40 rounded-2xl p-5">
            <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
              Total Sekolah
            </p>

            <div className="flex items-baseline mt-2 gap-1">
              <span className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
                {dataProduksi.length}
              </span>

              <span className="text-xs font-semibold text-gray-400">
                sekolah
              </span>
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Penerima distribusi MBG/SPPG
            </p>
          </div>
        )}

        {/* ==================== BAGIAN 1: INDEX ==================== */}
        {viewMode === "index" && (
          <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md shadow-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6">
            <div className="mb-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari sekolah, menu, atau tanggal..."
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/40 text-gray-500 dark:text-gray-400 text-left text-xs uppercase font-bold tracking-wider border-b border-gray-100 dark:border-gray-700">
                    <th className="p-4 text-center w-12">No</th>

                    <th className="p-4">Tgl</th>

                    <th className="p-4">Sekolah</th>

                    <th className="p-4">Menu</th>

                    <th className="p-4 text-center">Porsi</th>

                    <th className="p-4 text-center w-28">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-sm">
                  {filteredProduksi.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-8 text-center text-gray-400 dark:text-gray-500"
                      >
                        Tidak ditemukan data produksi yang sesuai dengan
                        pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredProduksi.map((item, index) => (
                      <tr
                        key={item.id}
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition"
                      >
                        <td className="p-4 text-center text-gray-400">
                          {index + 1}
                        </td>

                        <td className="p-4 font-mono text-sm whitespace-nowrap">
                          {item.tanggal}
                        </td>

                        <td className="p-4">
                          <Link
                            to={`/produksi/${item.id}`}
                            className="font-semibold text-violet-600 hover:text-violet-700 hover:underline"
                          >
                            {item.sekolah}
                          </Link>
                        </td>

                        <td className="p-4">{item.menu}</td>

                        <td className="p-4 text-center">
                          <span className="inline-flex items-center justify-center px-3 py-1 bg-violet-50 text-violet-700 rounded-lg text-sm font-semibold">
                            {item.porsi.toLocaleString("id-ID")} Porsi
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => openEditMode(item)}
                              className="p-1.5 text-violet-500 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition"
                            >
                              ✏️
                            </button>

                            <button
                              onClick={() => handleDeleteData(item.id)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
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

        {/* ==================== BAGIAN 2 & 3: FORM CREATE / EDIT ==================== */}
        {(viewMode === "create" || viewMode === "edit") && (
          <div className="max-w-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-2xl p-6 transition-all duration-200">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span
                className={`w-2 h-5 rounded-xs mr-2.5 ${viewMode === "create" ? "bg-violet-500" : "bg-amber-500"}`}
              ></span>
              {viewMode === "create"
                ? "Tambah Produksi Harian"
                : "Edit Produksi Harian"}
            </h2>

            <form onSubmit={handleSaveData} className="space-y-5">
              {/* Baris Grid 1: Tanggal & Nama Menu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tanggal */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Tanggal
                  </label>

                  <input
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>

                {/* Sekolah */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Sekolah
                  </label>

                  <input
                    type="text"
                    name="sekolah"
                    value={formData.sekolah}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama sekolah..."
                    required
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
              </div>

              {/* Menu */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Menu</label>

                <input
                  type="text"
                  name="menu"
                  value={formData.menu}
                  onChange={handleInputChange}
                  placeholder="Contoh: Nasi Ayam Sayur"
                  required
                  className="w-full px-4 py-2 border rounded-xl"
                />
              </div>

              {/* Porsi */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Jumlah Porsi
                </label>

                <input
                  type="number"
                  name="porsi"
                  value={formData.porsi}
                  onChange={handleInputChange}
                  placeholder="Masukkan jumlah porsi..."
                  required
                  className="w-full px-4 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Kalori (kkal)
                  </label>

                  <input
                    type="number"
                    name="kalori"
                    value={formData.kalori}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Protein (gr)
                  </label>

                  <input
                    type="number"
                    name="protein"
                    value={formData.protein}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Karbohidrat (gr)
                  </label>

                  <input
                    type="number"
                    name="karbohidrat"
                    value={formData.karbohidrat}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Lemak (gr)
                  </label>

                  <input
                    type="number"
                    name="lemak"
                    value={formData.lemak}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1.5">
                    Serat (gr)
                  </label>

                  <input
                    type="number"
                    name="serat"
                    value={formData.serat}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
              </div>

              {/* Grup Tombol Pengendali Form */}
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
                  {viewMode === "create" ? "Simpan Data" : "Simpan Perubahan"}
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
