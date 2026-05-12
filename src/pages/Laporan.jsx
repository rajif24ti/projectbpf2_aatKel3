import React from 'react';

function Laporan() {
  const dataLaporan = [
    { id: 1, tanggal: '2025-01-01', jenis: 'Produksi', keterangan: 'Produksi 1.200 porsi makanan', petugas: 'Siti Aminah', status: 'Selesai' },
    { id: 2, tanggal: '2025-01-02', jenis: 'Absensi', keterangan: '13 pegawai hadir, 1 izin, 1 sakit', petugas: 'Budi Santoso', status: 'Selesai' },
    { id: 3, tanggal: '2025-01-03', jenis: 'Bahan Baku', keterangan: 'Stok beras dan ayam dalam kondisi aman', petugas: 'Rina Lestari', status: 'Selesai' },
    { id: 4, tanggal: '2025-01-04', jenis: 'Produksi', keterangan: 'Produksi 1.250 porsi makanan', petugas: 'Agus Pratama', status: 'Selesai' },
    { id: 5, tanggal: '2025-01-05', jenis: 'Bahan Baku', keterangan: 'Stok bawang merah mulai menipis', petugas: 'Dewi Kartika', status: 'Perlu Tindak Lanjut' },
    { id: 6, tanggal: '2025-01-06', jenis: 'Absensi', keterangan: '12 pegawai hadir, 2 terlambat, 1 izin', petugas: 'Andi Saputra', status: 'Selesai' },
    { id: 7, tanggal: '2025-01-07', jenis: 'Produksi', keterangan: 'Produksi 1.190 porsi makanan', petugas: 'Nur Hasanah', status: 'Selesai' },
    { id: 8, tanggal: '2025-01-08', jenis: 'Bahan Baku', keterangan: 'Stok kol dan buncis mulai menipis', petugas: 'Joko Prasetyo', status: 'Perlu Tindak Lanjut' },
    { id: 9, tanggal: '2025-01-09', jenis: 'Produksi', keterangan: 'Produksi 1.230 porsi makanan', petugas: 'Maya Sari', status: 'Selesai' },
    { id: 10, tanggal: '2025-01-10', jenis: 'Absensi', keterangan: '14 pegawai hadir dan 1 sakit', petugas: 'Fajar Nugroho', status: 'Selesai' },
    { id: 11, tanggal: '2025-01-11', jenis: 'Bahan Baku', keterangan: 'Minyak goreng dan telur tersedia', petugas: 'Lina Marlina', status: 'Selesai' },
    { id: 12, tanggal: '2025-01-12', jenis: 'Produksi', keterangan: 'Produksi 1.140 porsi makanan', petugas: 'Teguh Rahman', status: 'Selesai' },
    { id: 13, tanggal: '2025-01-13', jenis: 'Absensi', keterangan: '15 pegawai hadir lengkap', petugas: 'Fitri Handayani', status: 'Selesai' },
    { id: 14, tanggal: '2025-01-14', jenis: 'Produksi', keterangan: 'Produksi 1.260 porsi makanan', petugas: 'Rudi Hartono', status: 'Selesai' },
    { id: 15, tanggal: '2025-01-15', jenis: 'Bahan Baku', keterangan: 'Stok bawang putih perlu ditambah', petugas: 'Sri Wahyuni', status: 'Perlu Tindak Lanjut' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selesai':
        return 'bg-green-100 text-green-600';
      case 'Perlu Tindak Lanjut':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getJenisColor = (jenis) => {
    switch (jenis) {
      case 'Produksi':
        return 'bg-violet-100 text-violet-600';
      case 'Absensi':
        return 'bg-blue-100 text-blue-600';
      case 'Bahan Baku':
        return 'bg-emerald-100 text-emerald-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <main className="grow">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Laporan Pengolahan
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Halaman untuk melihat laporan produksi, penggunaan bahan, absensi pegawai, dan filter periode.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Laporan</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
              {dataLaporan.length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Data laporan</p>
          </div>

          <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Laporan Produksi</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
              {dataLaporan.filter((item) => item.jenis === 'Produksi').length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Data produksi</p>
          </div>

          <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Laporan Absensi</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
              {dataLaporan.filter((item) => item.jenis === 'Absensi').length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Data kehadiran</p>
          </div>

          <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Perlu Tindak Lanjut</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
              {dataLaporan.filter((item) => item.status === 'Perlu Tindak Lanjut').length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Laporan pending</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">
            Rekap Laporan
          </h2>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="p-3 text-sm font-semibold">No</th>
                  <th className="p-3 text-sm font-semibold">Tanggal</th>
                  <th className="p-3 text-sm font-semibold">Jenis</th>
                  <th className="p-3 text-sm font-semibold">Keterangan</th>
                  <th className="p-3 text-sm font-semibold">Petugas</th>
                  <th className="p-3 text-sm font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {dataLaporan.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-300">{index + 1}</td>
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-300">{item.tanggal}</td>
                    <td className="p-3 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getJenisColor(item.jenis)}`}>
                        {item.jenis}
                      </span>
                    </td>
                    <td className="p-3 text-sm font-medium text-gray-800 dark:text-gray-100">
                      {item.keterangan}
                    </td>
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-300">{item.petugas}</td>
                    <td className="p-3 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </main>
  );
}

export default Laporan;