import React, { useState } from 'react';

function KotakSaran() {
  // 1. STATE UTAMA: Menyimpan data pesan masuk / keluar
  const [dataPesan, setDataPesan] = useState([
    { id: 1, pengirim: 'Dewi Kartika (Karyawan)', kategori: 'Absensi / Izin', subjek: 'Permohonan Izin Sakit', isi: 'Selamat pagi Supervisor, hari ini saya izin tidak masuk kerja karena harus berobat ke dokter. Surat sakit menyusul.', tanggal: '20-05-2026', status: 'Belum Dibaca' },
    { id: 2, pengirim: 'SDN 01 Menteng', kategori: 'Logistik MBG', subjek: 'Konfirmasi Jumlah Porsi', isi: 'Mohon info untuk pengiriman makanan bergizi hari ini apakah ada penambahan 10 porsi untuk siswa pindahan baru?', tanggal: '20-05-2026', status: 'Sudah Dibaca' },
    { id: 3, pengirim: 'Rina Lestari (QC)', kategori: 'Operasional', subjek: 'Laporan Mutu Bahan Pengolahan', isi: 'Bahan masakan untuk kloter dini hari sudah dicek dan siap didistribusikan ke sekolah mitra.', tanggal: '19-05-2026', status: 'Sudah Dibaca' },
  ]);

  // 2. STATE NAVIGASI INTERNAL: 'index' | 'create' | 'view'
  const [viewMode, setViewMode] = useState('index');

  // 3. STATE BUFFER: Penampung data formulir kirim pesan baru / detail baca pesan
  const [formData, setFormData] = useState({
    id: null,
    pengirim: 'Sistem Admin', // Default pengirim saat admin mengirim pesan baru
    kategori: 'Operasional',
    subjek: '',
    isi: '',
    tanggal: '',
    status: 'Belum Dibaca'
  });

  // Fungsi pengondisian warna Badge Kategori Pesan
  const getKategoriColor = (kategori) => {
    switch (kategori) {
      case 'Absensi / Izin':
        return 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
      case 'Logistik MBG':
        return 'bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20';
      default:
        return 'bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20';
    }
  };

  // Handler Input Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Navigasi ke Tulis Pesan Baru (Create)
  const openCreateMode = () => {
    setFormData({ id: null, pengirim: 'Admin Tim Pengolahan', kategori: 'Operasional', subjek: '', isi: '', tanggal: '', status: 'Belum Dibaca' });
    setViewMode('create');
  };

  // Navigasi ke Detail Pesan (Read/View) & Sekaligus Mengubah Status Menjadi "Sudah Dibaca"
  const openViewMode = (item) => {
    setFormData(item);
    setViewMode('view');
    
    // Otomatis tandai sudah dibaca jika statusnya masih baru
    if (item.status === 'Belum Dibaca') {
      setDataPesan(dataPesan.map((p) => (p.id === item.id ? { ...p, status: 'Sudah Dibaca' } : p)));
    }
  };

  // Handler Kirim / Simpan Pesan Baru (Create)
  const handleSendMessage = (e) => {
    e.preventDefault();

    const hariIni = new Date();
    const tanggalFormat = `${String(hariIni.getDate()).padStart(2, '0')}-${String(hariIni.getMonth() + 1).padStart(2, '0')}-${hariIni.getFullYear()}`;

    const payload = {
      id: Date.now(),
      pengirim: formData.pengirim,
      kategori: formData.kategori,
      subjek: formData.subjek,
      isi: formData.isi,
      tanggal: tanggalFormat,
      status: 'Belum Dibaca'
    };

    setDataPesan([payload, ...dataPesan]); // Menambahkan pesan baru di paling atas
    setViewMode('index');
  };

  // Handler Hapus Pesan (Delete)
  const handleDeleteMessage = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pesan ini dari arsip kotak masuk?")) {
      setDataPesan(dataPesan.filter(item => item.id !== id));
    }
  };

  return (
    <main className="grow transition-all duration-200">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        
        {/* HEADER HALAMAN */}
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold tracking-tight">
              Kotak Pesan & Koordinasi
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {viewMode === 'index' && 'Pusat notifikasi masuk, koordinasi sekolah mitra MBG, serta pesan izin absensi karyawan.'}
              {viewMode === 'create' && 'Kirim pesan pengumuman atau instruksi logistik baru.'}
              {viewMode === 'view' && 'Membaca detail isi lembar pesan masuk.'}
            </p>
          </div>

          {viewMode === 'index' && (
            <button
              onClick={openCreateMode}
              className="inline-flex items-center justify-center px-4 py-2 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-violet-500/10 active:scale-95 transition-all duration-150"
            >
              <svg className="w-4 h-4 mr-2 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Tulis Pesan
            </button>
          )}
        </div>

        {/* ==================== BAGIAN 1: INDEX (LIST KOTAK MASUK) ==================== */}
        {viewMode === 'index' && (
          <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md shadow-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/40 text-gray-500 dark:text-gray-400 text-left text-xs uppercase font-bold tracking-wider border-b border-gray-100 dark:border-gray-700">
                    <th className="p-4 text-center w-12">No</th>
                    <th className="p-4 w-48">Pengirim</th>
                    <th className="p-4 w-40">Kategori</th>
                    <th className="p-4">Subjek Pesan</th>
                    <th className="p-4 text-center w-32">Tanggal</th>
                    <th className="p-4 text-center w-28">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-sm">
                  {dataPesan.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-400 dark:text-gray-500">
                        Kotak masuk kosong. Tidak ada pesan saat ini.
                      </td>
                    </tr>
                  ) : (
                    dataPesan.map((item, index) => (
                      <tr 
                        key={item.id} 
                        className={`text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition ${item.status === 'Belum Dibaca' ? 'bg-violet-50/30 dark:bg-violet-500/5 font-semibold' : ''}`}
                      >
                        <td className="p-4 text-center text-gray-400">
                          {item.status === 'Belum Dibaca' ? (
                            <span className="w-2 h-2 rounded-full bg-violet-500 inline-block"></span>
                          ) : index + 1}
                        </td>
                        <td className="p-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                          <span className="truncate">{item.pengirim}</span>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getKategoriColor(item.kategori)}`}>
                            {item.kategori}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-800 dark:text-gray-200 truncate max-w-md">{item.subjek}</div>
                          <div className="text-xs text-gray-400 font-normal truncate max-w-md">{item.isi}</div>
                        </td>
                        <td className="p-4 text-center font-mono text-xs text-gray-500">{item.tanggal}</td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => openViewMode(item)}
                              className="p-1.5 text-violet-500 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-lg transition"
                              title="Baca Pesan"
                            >
                              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(item.id)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition"
                              title="Hapus Pesan"
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

        {/* ==================== BAGIAN 2: TULIS PESAN BARU (CREATE) ==================== */}
        {viewMode === 'create' && (
          <div className="max-w-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className="w-2 h-5 rounded-xs mr-2.5 bg-violet-500"></span>
              Kirim Surat / Koordinasi Baru
            </h2>

            <form onSubmit={handleSendMessage} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field: Pengirim */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Identitas Pengirim</label>
                  <input
                    type="text"
                    name="pengirim"
                    value={formData.pengirim}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                  />
                </div>

                {/* Field: Kategori */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Kategori Kepentingan</label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                  >
                    <option value="Operasional">Operasional Umum</option>
                    <option value="Logistik MBG">Logistik MBG (Sekolah)</option>
                    <option value="Absensi / Izin">Absensi / Izin Karyawan</option>
                  </select>
                </div>
              </div>

              {/* Field: Subjek */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subjek / Perihal Pesan</label>
                <input
                  type="text"
                  name="subjek"
                  value={formData.subjek}
                  onChange={handleInputChange}
                  placeholder="Contoh: Pemberitahuan Keterlambatan Pengiriman Logistik"
                  required
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100"
                />
              </div>

              {/* Field: Isi Pesan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Isi Pesan Surat</label>
                <textarea
                  name="isi"
                  value={formData.isi}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Ketik rincian isi pesan koordinasi di sini..."
                  required
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition text-sm text-gray-800 dark:text-gray-100 resize-none"
                ></textarea>
              </div>

              {/* Grup Tombol */}
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
                  className="inline-flex items-center px-5 py-2 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-sm active:scale-95 transition-all duration-150"
                >
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ==================== BAGIAN 3: BACA PESAN DETAIL (VIEW) ==================== */}
        {viewMode === 'view' && (
          <div className="max-w-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-2xl p-6">
            <div className="flex justify-between items-start border-b border-gray-100 dark:border-gray-700/60 pb-4 mb-4">
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-2 ${getKategoriColor(formData.kategori)}`}>
                  {formData.kategori}
                </span>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{formData.subjek}</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Dari: <span className="text-gray-600 dark:text-gray-300 font-semibold">{formData.pengirim}</span> &bull; Tanggal: {formData.tanggal}
                </p>
              </div>
              <button
                onClick={() => setViewMode('index')}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Isi Konten Surat */}
            <div className="bg-gray-50 dark:bg-gray-700/20 rounded-xl p-5 border border-gray-100 dark:border-gray-700/40 min-h-[150px]">
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {formData.isi}
              </p>
            </div>

            {/* Tombol Kembali */}
            <div className="pt-5 mt-5 flex justify-end border-t border-gray-100 dark:border-gray-700/60">
              <button
                onClick={() => setViewMode('index')}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-xl transition"
              >
                Kembali ke Kotak Masuk
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default KotakSaran;