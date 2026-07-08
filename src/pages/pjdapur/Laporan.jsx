import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

function Laporan() {
  // 1. STATE UTAMA: Menyimpan database log rekap laporan pengolahan
  const [dataLaporan, setDataLaporan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLaporan();
  }, []);

  const fetchLaporan = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('laporan')
        .select('*')
        .order('tanggal', { ascending: false });

      if (error) throw error;
      setDataLaporan(data || []);
    } catch (error) {
      console.error('Error fetching laporan:', error);
      alert('Gagal mengambil data laporan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. STATE NAVIGASI INTERNAL: 'index' | 'create' | 'edit'
  const [viewMode, setViewMode] = useState('index');

  // 3. STATE BUFFER FORMULIR LAPORAN
  const [formData, setFormData] = useState({
    id: null,
    tanggal: '',
    jenis: 'Produksi',
    keterangan: '',
    petugas: '',
    status: 'Selesai'
  });

  // Badge Status Penanganan Laporan
  const getStatusColor = (status) => {
    switch (status) {
      case 'Selesai':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400';
      case 'Perlu Tindak Lanjut':
        return 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400';
    }
  };

  // Badge Pewarnaan Berdasarkan Kluster Kategori Laporan
  const getJenisColor = (jenis) => {
    switch (jenis) {
      case 'Produksi':
        return 'bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400';
      case 'Absensi':
        return 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400';
      case 'Bahan Baku':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400';
    }
  };

  // Perhitungan Akumulasi Data Statistik Secara Real-time
  const totalLaporan = dataLaporan.length;
  const laporanProduksi = dataLaporan.filter((item) => item.jenis === 'Produksi').length;
  const laporanAbsensi = dataLaporan.filter((item) => item.jenis === 'Absensi').length;
  const perluTindakLanjut = dataLaporan.filter((item) => item.status === 'Perlu Tindak Lanjut').length;

  // Handler Perubahan Kolom Input Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Navigasi ke Form Tambah Laporan (Create)
  const openCreateMode = () => {
    const hariIni = new Date().toISOString().split('T')[0];
    setFormData({ id: null, tanggal: hariIni, jenis: 'Produksi', keterangan: '', petugas: '', status: 'Selesai' });
    setViewMode('create');
  };

  // Navigasi ke Form Ubah Laporan (Edit)
  const openEditMode = (item) => {
    setFormData(item);
    setViewMode('edit');
  };

  // Handler Aksi Simpan Data
  const handleSaveData = async (e) => {
    e.preventDefault();
    try {
      if (viewMode === 'create') {
        const payload = {
          tanggal: formData.tanggal,
          jenis: formData.jenis,
          keterangan: formData.keterangan,
          petugas: formData.petugas,
          status: formData.status
        };
        const { error } = await supabase.from('laporan').insert([payload]);
        if (error) throw error;
      } else if (viewMode === 'edit') {
        const payload = {
          tanggal: formData.tanggal,
          jenis: formData.jenis,
          keterangan: formData.keterangan,
          petugas: formData.petugas,
          status: formData.status
        };
        const { error } = await supabase.from('laporan').update(payload).eq('id', formData.id);
        if (error) throw error;
      }
      
      alert(viewMode === 'create' ? 'Laporan berhasil ditambahkan!' : 'Laporan berhasil diupdate!');
      setViewMode('index');
      fetchLaporan();
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Gagal menyimpan data: ' + error.message);
    }
  };

  // Handler Aksi Hapus Laporan
  const handleDeleteData = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data rekap laporan ini?")) {
      try {
        const { error } = await supabase.from('laporan').delete().eq('id', id);
        if (error) throw error;
        alert('Laporan berhasil dihapus!');
        fetchLaporan();
      } catch (error) {
        console.error('Error deleting data:', error);
        alert('Gagal menghapus data: ' + error.message);
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
              Laporan Pengolahan
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {viewMode === 'index' && 'Halaman monitoring rekapitulasi performa produksi, manajemen bahan baku, dan log kehadiran kerja.'}
              {viewMode === 'create' && 'Formulir arsip pencatatan laporan berkala atau insiden temuan baru.'}
              {viewMode === 'edit' && 'Formulir perbaikan informasi berkas laporan pengolahan.'}
            </p>
          </div>

          {viewMode === 'index' && (
            <button
              onClick={openCreateMode}
              className="inline-flex items-center justify-center px-4 py-2 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-violet-500/10 active:scale-95 transition-all duration-150"
            >
              <svg className="w-4 h-4 mr-2 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Buat Laporan Baru
            </button>
          )}
        </div>

        {/* KARTU STATISTIK AGREGAT (Hanya Tampil di Mode Utama) */}
        {viewMode === 'index' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/40 rounded-2xl p-5">
              <p className="text-sm font-medium text-gray-400 dark:text-gray-500">Total Laporan</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2 tracking-tight">{totalLaporan}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Seluruh arsip data</p>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/40 rounded-2xl p-5">
              <p className="text-sm font-medium text-gray-400 dark:text-gray-500">Laporan Produksi</p>
              <p className="text-3xl font-bold text-violet-500 mt-2 tracking-tight">{laporanProduksi}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Data log memasak</p>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/40 rounded-2xl p-5">
              <p className="text-sm font-medium text-gray-400 dark:text-gray-500">Laporan Absensi</p>
              <p className="text-3xl font-bold text-blue-500 mt-2 tracking-tight">{laporanAbsensi}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Data rekapan log hadir</p>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/40 rounded-2xl p-5">
              <p className="text-sm font-medium text-gray-400 dark:text-gray-500">Perlu Tindak Lanjut</p>
              <p className="text-3xl font-bold text-amber-500 mt-2 tracking-tight">{perluTindakLanjut}</p>
              <p className="text-xs text-amber-500/70 mt-1">Laporan pending/isu stok</p>
            </div>
          </div>
        )}

        {/* ==================== BAGIAN 1: INDEX ==================== */}
        {viewMode === 'index' && (
          <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md shadow-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/40 text-gray-500 dark:text-gray-400 text-left text-xs uppercase font-bold tracking-wider border-b border-gray-100 dark:border-gray-700">
                    <th className="p-4 text-center w-12">No</th>
                    <th className="p-4">Tanggal</th>
                    <th className="p-4">Kategori Kluster</th>
                    <th className="p-4">Deskripsi Keterangan</th>
                    <th className="p-4">Petugas Pelapor</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center w-28">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-gray-500">
                        Memuat data laporan...
                      </td>
                    </tr>
                  ) : dataLaporan.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-gray-400 dark:text-gray-500">
                        Belum ada dokumen rekaman laporan pengolahan.
                      </td>
                    </tr>
                  ) : (
                    dataLaporan.map((item, index) => (
                      <tr key={item.id} className="text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition">
                        <td className="p-4 text-center text-gray-400">{index + 1}</td>
                        <td className="p-4 font-mono text-xs whitespace-nowrap">{item.tanggal}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getJenisColor(item.jenis)}`}>
                            {item.jenis}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-gray-800 dark:text-gray-100 max-w-sm truncate" title={item.keterangan}>
                          {item.keterangan}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">{item.petugas}</td>
                        <td className="p-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => openEditMode(item)}
                              className="p-1.5 text-violet-500 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-lg transition"
                              title="Ubah Berkas"
                            >
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteData(item.id)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition"
                              title="Hapus Arsip"
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

        {/* ==================== BAGIAN 2 & 3: FORM CREATE / EDIT ==================== */}
        {(viewMode === 'create' || viewMode === 'edit') && (
          <div className="max-w-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-2xl p-6 transition-all duration-200">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className={`w-2 h-5 rounded-xs mr-2.5 ${viewMode === 'create' ? 'bg-violet-500' : 'bg-amber-500'}`}></span>
              {viewMode === 'create' ? 'Arsipkan Berkas Laporan Baru' : `Edit Arsip Dokumen Laporan #${formData.id}`}
            </h2>

            <form onSubmit={handleSaveData} className="space-y-5">
              {/* Baris Grid 1: Tanggal Laporan & Penanggung Jawab */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tanggal Laporan</label>
                  <input
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Petugas / PIC Penanggung Jawab</label>
                  <input
                    type="text"
                    name="petugas"
                    value={formData.petugas}
                    onChange={handleInputChange}
                    placeholder="Nama lengkap petugas pelapor..."
                    required
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              {/* Baris Grid 2: Kategori & Status Tindakan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Kategori Bidang</label>
                  <select
                    name="jenis"
                    value={formData.jenis}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                  >
                    <option value="Produksi">Produksi (Dapur)</option>
                    <option value="Absensi">Absen Kehadiran</option>
                    <option value="Bahan Baku">Bahan Baku (Inventaris)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status Penanganan</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                  >
                    <option value="Selesai">Selesai (Clear)</option>
                    <option value="Perlu Tindak Lanjut">Perlu Tindak Lanjut (Urgent)</option>
                  </select>
                </div>
              </div>

              {/* Field: Isi Narasi Deskripsi Keterangan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Isi Ringkasan Keterangan</label>
                <textarea
                  name="keterangan"
                  rows="3"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                  placeholder="Deskripsikan secara detail isi rekapitulasi harian atau temuan kerusakan bahan baku..."
                  required
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                ></textarea>
              </div>

              {/* Baris Tombol Kontrol Aksi */}
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
                  {viewMode === 'create' ? 'Arsipkan Laporan' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </main>
  );
}

export default Laporan;