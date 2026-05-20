import React, { useState } from 'react';
import FilterButton from '../components/extract/DropdownFilter';
import Datepicker from '../components/extract/Datepicker';

export default function Dashboard() {
  // 1. DATABASE LOCAL DASHBOARD (Sinkron 100% dengan ekosistem file pada gambar)
  
  // Data Representasi dari DataKaryawan.jsx & Absensi.jsx
  const [dataKaryawan] = useState([
    { id: 1, nama: 'Siti Aminah', divisi: 'Dapur Utama', statusKehadiran: 'Hadir' },
    { id: 2, nama: 'Budi Santoso', divisi: 'Logistik', statusKehadiran: 'Hadir' },
    { id: 3, nama: 'Rina Lestari', divisi: 'Administrasi', statusKehadiran: 'Izin' },
    { id: 4, nama: 'Agus Pratama', divisi: 'Dapur Utama', statusKehadiran: 'Hadir' },
    { id: 5, nama: 'Dewi Kartika', divisi: 'Quality Control', statusKehadiran: 'Sakit' },
  ]);

  // Data Representasi dari Produksi.jsx
  const [dataProduksi] = useState([
    { id: 1, tanggal: '2026-05-18', menu: 'Nasi Ayam Sayur', jumlah: 1200, status: 'Selesai' },
    { id: 2, tanggal: '2026-05-19', menu: 'Nasi Telur Balado', jumlah: 1150, status: 'Selesai' },
    { id: 3, tanggal: '2026-05-20', menu: 'Nasi Ayam Goreng', jumlah: 1260, status: 'Proses' },
  ]);

  // Data Representasi dari DataSekolah.jsx (Kemitraan/Instansi Magang)
  const [dataSekolah] = useState([
    { id: 1, namaSekolah: 'SMKN 1 Pekanbaru', jumlahSiswaMagang: 4, statusKemitraan: 'Aktif' },
    { id: 2, namaSekolah: 'SMKN 2 Pekanbaru', jumlahSiswaMagang: 2, statusKemitraan: 'Aktif' },
    { id: 3, namaSekolah: 'SMKN 5 Pekanbaru', jumlahSiswaMagang: 0, statusKemitraan: 'Selesai' },
  ]);

  // Data Representasi dari KotakSaran.jsx & Laporan.jsx
  const [dataLaporan] = useState([
    { id: 1, jenis: 'Produksi', status: 'Selesai', keterangan: 'Produksi batch aman' },
    { id: 2, jenis: 'Absensi', status: 'Selesai', keterangan: 'Presensi aman' },
    { id: 3, jenis: 'Kotak Saran', status: 'Perlu Tindak Lanjut', keterangan: 'Aduan fasilitas AC' },
    { id: 4, jenis: 'Data Sekolah', status: 'Selesai', keterangan: 'Sinkronisasi data SMK' },
    { id: 5, jenis: 'Kotak Saran', status: 'Perlu Tindak Lanjut', keterangan: 'Mesin pendingin rusak' },
  ]);

  // 2. LOGIKA AGREGASI METRIK SECARA DINAMIS (Koneksi Lintas Modul)
  
  // Modul Karyawan & Absensi
  const totalKaryawan = dataKaryawan.length;
  const karyawanHadir = dataKaryawan.filter(k => k.statusKehadiran === 'Hadir').length;

  // Modul Produksi
  const totalVolumeProduksi = dataProduksi.reduce((acc, item) => acc + item.jumlah, 0);

  // Modul Data Sekolah
  const totalSiswaMagang = dataSekolah.reduce((acc, school) => acc + school.jumlahSiswaMagang, 0);

  // Modul Kotak Saran / Laporan Isu Pending
  const laporanIsuPending = dataLaporan.filter(item => item.status === 'Perlu Tindak Lanjut').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-9xl mx-auto">
      
      {/* HEADER DASHBOARD */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold tracking-tight">
            Dashboard Utama
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Ringkasan data operasional terintegrasi seluruh berkas sistem.
          </p>
        </div>
        
        {/* Kontrol Aksi Global */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2 mt-4 sm:mt-0">
          <FilterButton align="right" />
          <Datepicker align="right" />
        </div>
      </div>

      {/* SYSTEM METRIC CARD GRID (4 Modul Utama) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        
        {/* KARTU 1: MODUL PRODUKSI (Produksi.jsx) */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-5 border border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total Output Produksi</h2>
            <div className="p-1.5 bg-violet-50 dark:bg-violet-500/10 text-violet-500 rounded-lg">
              <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 114 0v2m-4 0h4m-4 0H5m12 0h2" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline mt-1">
            <div className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 font-mono tracking-tight">
              {totalVolumeProduksi.toLocaleString('id-ID')}
            </div>
            <span className="text-xs font-semibold text-gray-400 ml-1">porsi</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Data log aktivitas dapur harian</div>
        </div>

        {/* KARTU 2: MODUL ABSENSI & KARYAWAN (Absensi.jsx / DataKaryawan.jsx) */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-5 border border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Kehadiran Karyawan</h2>
            <div className="p-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-lg">
              <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline mt-1">
            <div className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 font-mono tracking-tight">{karyawanHadir}</div>
            <span className="text-sm font-semibold text-emerald-500 ml-1">/ {totalKaryawan} Aktif</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Rasio absensi internal staff</div>
        </div>

        {/* KARTU 3: MODUL DATA SEKOLAH (DataSekolah.jsx) */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-5 border border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Siswa Magang / PKL</h2>
            <div className="p-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-lg">
              <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline mt-1">
            <div className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 font-mono tracking-tight">{totalSiswaMagang}</div>
            <span className="text-xs font-semibold text-gray-400 ml-1">siswa</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Kemitraan aktif dari {dataSekolah.filter(s => s.statusKemitraan === 'Aktif').length} SMK</div>
        </div>

        {/* KARTU 4: MODUL KOTAK SARAN & LAPORAN (KotakSaran.jsx / Laporan.jsx) */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-5 border border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Aduan / Masalah Pending</h2>
            <div className="p-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-lg">
              <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline mt-1">
            <div className={`text-3xl font-extrabold font-mono tracking-tight ${laporanIsuPending > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-gray-800'}`}>
              {laporanIsuPending}
            </div>
            <span className="text-xs font-semibold text-gray-400 ml-1">perlu respons</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Log Kotak Saran belum terselesaikan</div>
        </div>

      </div>

      {/* PANEL MONITORING RINGKASAN PRODUKSI TERBARU */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4 uppercase tracking-wider">
          Status Live Produksi Modul
        </h3>
        <div className="space-y-3">
          {dataProduksi.map((prod) => (
            <div key={prod.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl text-sm">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{prod.menu}</p>
                <p className="text-xs text-gray-400 font-mono">{prod.tanggal}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-gray-700 dark:text-gray-300">{prod.jumlah} Porsi</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  prod.status === 'Selesai' 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                    : 'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  {prod.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}