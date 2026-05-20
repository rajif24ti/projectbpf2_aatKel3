import React, { useState } from 'react';

function BahanBaku() {
  // 1. STATE UTAMA: Menyimpan daftar data bahan baku (pindahan dari array statis)
  const [dataBahan, setDataBahan] = useState([
    { id: 1, nama: 'Beras', stok: 120, satuan: 'kg' },
    { id: 2, nama: 'Ayam', stok: 65, satuan: 'kg' },
    { id: 3, nama: 'Telur', stok: 300, satuan: 'butir' },
    { id: 4, nama: 'Wortel', stok: 35, satuan: 'kg' },
    { id: 5, nama: 'Kentang', stok: 40, satuan: 'kg' },
    { id: 6, nama: 'Kol', stok: 20, satuan: 'kg' },
    { id: 7, nama: 'Buncis', stok: 18, satuan: 'kg' },
    { id: 8, nama: 'Minyak Goreng', stok: 45, satuan: 'liter' },
    { id: 9, nama: 'Garam', stok: 15, satuan: 'kg' },
    { id: 10, nama: 'Gula', stok: 25, satuan: 'kg' },
    { id: 11, nama: 'Bawang Merah', stok: 12, satuan: 'kg' },
    { id: 12, nama: 'Bawang Putih', stok: 10, satuan: 'kg' },
    { id: 13, nama: 'Ikan', stok: 55, satuan: 'kg' },
    { id: 14, nama: 'Tahu', stok: 200, satuan: 'pcs' },
    { id: 15, nama: 'Tempe', stok: 180, satuan: 'pcs' },
  ]);

  // 2. STATE NAVIGASI INTERNAL: 'index' | 'create' | 'edit'
  const [viewMode, setViewMode] = useState('index');

  // 3. STATE BUFFER: Untuk menampung data form sementara
  const [formData, setFormData] = useState({ id: null, nama: '', stok: '', satuan: 'kg' });

  // Fungsi pengondisian status berdasarkan ambang batas kuantitas stok
  const getStatus = (stok) => {
    if (stok <= 15) return { label: 'Menipis', color: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400' };
    if (stok <= 30) return { label: 'Cukup', color: 'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400' };
    return { label: 'Aman', color: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-500/10 dark:text-green-400' };
  };

  // Handler Perubahan Input Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Navigasi ke Form Tambah Data (Create)
  const openCreateMode = () => {
    setFormData({ id: null, nama: '', stok: '', satuan: 'kg' });
    setViewMode('create');
  };

  // Navigasi ke Form Ubah Data (Edit)
  const openEditMode = (item) => {
    setFormData(item);
    setViewMode('edit');
  };

  // Handler Aksi Simpan Data (Create & Edit)
  const handleSaveData = (e) => {
    e.preventDefault();

    const payload = {
      id: formData.id || Date.now(), // ID unik berbasis timestamp jika data baru
      nama: formData.nama,
      stok: Number(formData.stok), // Konversi paksa string input menjadi angka numeric
      satuan: formData.satuan
    };

    if (viewMode === 'create') {
      setDataBahan([...dataBahan, payload]);
    } else if (viewMode === 'edit') {
      setDataBahan(dataBahan.map((item) => (item.id === formData.id ? payload : item)));
    }
    
    setViewMode('index'); // Kembali ke tabel utama
  };

  // Handler Aksi Hapus Data
  const handleDeleteData = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data bahan baku ini?")) {
      setDataBahan(dataBahan.filter((item) => item.id !== id));
    }
  };

  return (
    <main className="grow transition-all duration-200">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

        {/* HEADER HALAMAN */}
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold tracking-tight">
              Manajemen Bahan Baku
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {viewMode === 'index' && 'Halaman untuk memantau stok, memperbarui kuantitas bahan, dan mengelola kebutuhan dapur.'}
              {viewMode === 'create' && 'Formulir pencatatan inventaris komoditas bahan baku baru.'}
              {viewMode === 'edit' && 'Formulir penyesuaian/opname stok bahan baku.'}
            </p>
          </div>

          {/* Tombol Tambah hanya tampil di halaman Utama */}
          {viewMode === 'index' && (
            <button
              onClick={openCreateMode}
              className="inline-flex items-center justify-center px-4 py-2 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-violet-500/10 active:scale-95 transition-all duration-150"
            >
              <svg className="w-4 h-4 mr-2 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Tambah Bahan
            </button>
          )}
        </div>

        {/* ==================== BAGIAN 1: INDEX (LIST VIEW) ==================== */}
        {viewMode === 'index' && (
          <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md shadow-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/40 text-gray-500 dark:text-gray-400 text-left text-xs uppercase font-bold tracking-wider border-b border-gray-100 dark:border-gray-700">
                    <th className="p-4 text-center w-12">No</th>
                    <th className="p-4">Nama Bahan</th>
                    <th className="p-4">Kuantitas Stok</th>
                    <th className="p-4">Satuan Ukur</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center w-28">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-sm">
                  {dataBahan.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-400 dark:text-gray-500">
                        Tidak ada data stok bahan baku saat ini.
                      </td>
                    </tr>
                  ) : (
                    dataBahan.map((item, index) => {
                      const status = getStatus(item.stok);
                      return (
                        <tr key={item.id} className="text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition">
                          <td className="p-4 text-center text-gray-400">{index + 1}</td>
                          <td className="p-4 font-semibold text-gray-800 dark:text-gray-100">{item.nama}</td>
                          <td className="p-4 font-mono font-semibold">{item.stok}</td>
                          <td className="p-4 text-gray-500">{item.satuan}</td>
                          <td className="p-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${status.color}`}>
                              {status.label}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                              <button
                                onClick={() => openEditMode(item)}
                                className="p-1.5 text-violet-500 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-lg transition"
                                title="Ubah Stok"
                              >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteData(item.id)}
                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition"
                                title="Hapus Bahan"
                              >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.728-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== BAGIAN 2 & 3: FORM CREATE / EDIT ==================== */}
        {(viewMode === 'create' || viewMode === 'edit') && (
          <div className="max-w-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-2xl p-6 transition-all duration-200">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className={`w-2 h-5 rounded-xs mr-2.5 ${viewMode === 'create' ? 'bg-violet-500' : 'bg-amber-500'}`}></span>
              {viewMode === 'create' ? 'Tambah Stok Bahan Baku Baru' : `Sesuaikan Kuantitas: ${formData.nama}`}
            </h2>

            <form onSubmit={handleSaveData} className="space-y-5">
              {/* Field: Nama Bahan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nama Komoditas Bahan</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Contoh: Bawang Bombay, Daging Sapi..."
                  required
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                />
              </div>

              {/* Baris Grid: Kuantitas & Satuan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Jumlah Stok tersedia</label>
                  <input
                    type="number"
                    name="stok"
                    min="0"
                    value={formData.stok}
                    onChange={handleInputChange}
                    placeholder="Masukkan kuantitas angka..."
                    required
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Satuan Ukuran</label>
                  <select
                    name="satuan"
                    value={formData.satuan}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                  >
                    <option value="kg">kg (Kilogram)</option>
                    <option value="liter">liter (Liter)</option>
                    <option value="butir">butir</option>
                    <option value="pcs">pcs (Pieces)</option>
                    <option value="pack">pack</option>
                  </select>
                </div>
              </div>

              {/* Grup Tombol Pengendali (Batal / Simpan) */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-700/60">
                <button
                  type="button"
                  onClick={() => setViewMode('index')}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-violet-500/10 active:scale-95 transition-all duration-150"
                >
                  {viewMode === 'create' ? 'Simpan Bahan' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </main>
  );
}

export default BahanBaku;