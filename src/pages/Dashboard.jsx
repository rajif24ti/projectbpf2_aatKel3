import React, { useState } from 'react';
import FilterButton from '../components/extract/DropdownFilter';
import Datepicker from '../components/extract/Datepicker';

// Import komponen visualisasi dashboard bawaan template Anda
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';

export default function Dashboard() {
  // 1. DATABASE KUMPULAN DATA (Diselaraskan dari modul-modul sebelumnya)
  const [dataBahan] = useState([
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

  const [dataProduksi] = useState([
    { id: 1, tanggal: '2025-01-01', menu: 'Nasi Ayam Sayur', jumlah: 1200, status: 'Selesai' },
    { id: 2, tanggal: '2025-01-02', menu: 'Nasi Telur Balado', jumlah: 1150, status: 'Selesai' },
    { id: 13, tanggal: '2025-01-13', menu: 'Nasi Tempe Sayur', jumlah: 1125, status: 'Proses' },
    { id: 14, tanggal: '2025-01-14', menu: 'Nasi Ayam Goreng', jumlah: 1260, status: 'Selesai' },
    { id: 15, tanggal: '2025-01-15', menu: 'Nasi Ikan Balado', jumlah: 1185, status: 'Proses' },
  ]);

  const [dataLaporan] = useState([
    { id: 1, jenis: 'Produksi', status: 'Selesai' },
    { id: 2, jenis: 'Absensi', status: 'Selesai' },
    { id: 5, jenis: 'Bahan Baku', status: 'Perlu Tindak Lanjut' },
    { id: 8, jenis: 'Bahan Baku', status: 'Perlu Tindak Lanjut' },
    { id: 15, jenis: 'Bahan Baku', status: 'Perlu Tindak Lanjut' },
  ]);

  // Simulasi database absensi karyawan (Mencatat total pegawai aktif & yang hadir)
  const [dataAbsensi] = useState({
    totalPegawai: 15,
    hadir: 13, 
    izin: 1,
    sakit: 1
  });

  // 2. LOGIKA AGREGASI METRIK SECARA DINAMIS
  // Total akumulasi volume porsi dari modul produksi
  const totalVolumeProduksi = dataProduksi.reduce((acc, item) => acc + item.jumlah, 0);
  
  // Total item jenis komoditas bahan baku unik
  const totalJenisBahan = dataBahan.length; 
  
  // Jumlah laporan terkunci yang berstatus 'Perlu Tindak Lanjut'
  const laporanIsuPending = dataLaporan.filter(item => item.status === 'Perlu Tindak Lanjut').length;

  return (
    <>
      {/* Tombol Aksi Global Dashboard */}
      <div className="sm:flex sm:justify-end sm:items-center mb-8">
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Komponen Filter & Pengontrol Kalender */}
          <FilterButton align="right" />
          <Datepicker align="right" />
          
          {/* Tombol Tambah Quick-Action */}
          <button className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white text-white text-sm font-semibold rounded-xl shadow-sm transition active:scale-95 duration-150">
            <svg className="fill-current shrink-0 mr-2" width="16" height="16" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span>Tambah Data</span>
          </button>
        </div>
      </div>

      {/* METRIC CARD GRID SYSTEM */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        
        {/* KARTU 1: METRIK PRODUKSI (Diambil dari Jumlah Akumulasi Porsi) */}
        <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-5 border border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total Volume Produksi</h2>
            <div className="p-1.5 bg-violet-50 dark:bg-violet-500/10 text-violet-500 rounded-lg">
              <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline mt-1">
            <div className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 font-mono tracking-tight">
              {totalVolumeProduksi.toLocaleString('id-ID')}
            </div>
            <span className="text-xs font-semibold text-gray-400 ml-1">porsi</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Akumulasi log porsi makanan dapur</div>
        </div>

        {/* KARTU 2: METRIK BAHAN BAKU (Diambil dari Total Inventaris Unik) */}
        <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-5 border border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Inventaris Bahan</h2>
            <div className="p-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-lg">
              <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline mt-1">
            <div className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 font-mono tracking-tight">{totalJenisBahan}</div>
            <span className="text-xs font-semibold text-gray-400 ml-1">komoditas</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Jenis bahan baku terdaftar</div>
        </div>

        {/* KARTU 3: METRIK ABSENSI PEGAWAI (Diambil dari Rasio Log Kehadiran) */}
        <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-5 border border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Kehadiran Pegawai</h2>
            <div className="p-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-lg">
              <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center mt-1">
            <div className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 font-mono tracking-tight">{dataAbsensi.hadir}</div>
            <div className="text-sm font-semibold text-emerald-500 ml-2">/ {dataAbsensi.totalPegawai} Staff</div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Sakit/Izin: <span className="font-semibold text-amber-500">{dataAbsensi.sakit + dataAbsensi.izin} orang</span> hari ini
          </div>
        </div>

        {/* KARTU 4: METRIK LAPORAN PENDING (Diambil dari Temuan Perlu Tindak Lanjut) */}
        <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-5 border border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Isu Tindak Lanjut</h2>
            <div className="p-1.5 bg-amber-50 dark:bg-amber-500/10 text-amber-500 rounded-lg">
              <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline mt-1">
            <div className={`text-3xl font-extrabold font-mono tracking-tight ${laporanIsuPending > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-800'}`}>
              {laporanIsuPending}
            </div>
            <span className="text-xs font-semibold text-gray-400 ml-1">dokumen</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Laporan operasional berstatus pending</div>
        </div>

      </div>

      {/* GRAPHICS & VISUALIZATION PANELS (Bar Chart, Recent Activity, dll) */}
      {/* <div className="grid grid-cols-12 gap-6">
        <DashboardCard10 />
        <DashboardCard12 da/>
        <DashboardCard13 />
      </div> */}
    </>
  );
}