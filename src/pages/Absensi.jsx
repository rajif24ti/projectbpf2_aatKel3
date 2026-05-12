import React from 'react';

function Absensi() {
  const dataAbsensi = [
    { id: 1, nama: 'Siti Aminah', shift: 'Pagi', jamMasuk: '06:00', jamPulang: '14:00', status: 'Hadir' },
    { id: 2, nama: 'Budi Santoso', shift: 'Pagi', jamMasuk: '06:05', jamPulang: '14:00', status: 'Hadir' },
    { id: 3, nama: 'Rina Lestari', shift: 'Siang', jamMasuk: '14:00', jamPulang: '22:00', status: 'Hadir' },
    { id: 4, nama: 'Agus Pratama', shift: 'Pagi', jamMasuk: '06:20', jamPulang: '14:00', status: 'Terlambat' },
    { id: 5, nama: 'Dewi Kartika', shift: 'Siang', jamMasuk: '14:00', jamPulang: '22:00', status: 'Hadir' },
    { id: 6, nama: 'Andi Saputra', shift: 'Pagi', jamMasuk: '-', jamPulang: '-', status: 'Izin' },
    { id: 7, nama: 'Nur Hasanah', shift: 'Pagi', jamMasuk: '06:00', jamPulang: '14:00', status: 'Hadir' },
    { id: 8, nama: 'Joko Prasetyo', shift: 'Siang', jamMasuk: '14:15', jamPulang: '22:00', status: 'Terlambat' },
    { id: 9, nama: 'Maya Sari', shift: 'Pagi', jamMasuk: '06:00', jamPulang: '14:00', status: 'Hadir' },
    { id: 10, nama: 'Fajar Nugroho', shift: 'Siang', jamMasuk: '14:00', jamPulang: '22:00', status: 'Hadir' },
    { id: 11, nama: 'Lina Marlina', shift: 'Pagi', jamMasuk: '-', jamPulang: '-', status: 'Sakit' },
    { id: 12, nama: 'Teguh Rahman', shift: 'Siang', jamMasuk: '14:00', jamPulang: '22:00', status: 'Hadir' },
    { id: 13, nama: 'Fitri Handayani', shift: 'Pagi', jamMasuk: '06:10', jamPulang: '14:00', status: 'Hadir' },
    { id: 14, nama: 'Rudi Hartono', shift: 'Siang', jamMasuk: '14:00', jamPulang: '22:00', status: 'Hadir' },
    { id: 15, nama: 'Sri Wahyuni', shift: 'Pagi', jamMasuk: '06:00', jamPulang: '14:00', status: 'Hadir' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hadir':
        return 'bg-green-100 text-green-600';
      case 'Terlambat':
        return 'bg-yellow-100 text-yellow-600';
      case 'Izin':
        return 'bg-blue-100 text-blue-600';
      case 'Sakit':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <main className="grow">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Absensi & Jam Kerja
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Halaman untuk mencatat absensi masuk, pulang, shift kerja, dan rekap jam kerja pegawai pengolahan.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">
            Data Absensi Pegawai
          </h2>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">No</th>
                  <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Nama</th>
                  <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Shift</th>
                  <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Jam Masuk</th>
                  <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Jam Pulang</th>
                  <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                </tr>
              </thead>

              <tbody>
                {dataAbsensi.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-300">{index + 1}</td>
                    <td className="p-3 text-sm font-medium text-gray-800 dark:text-gray-100">{item.nama}</td>
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-300">{item.shift}</td>
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-300">{item.jamMasuk}</td>
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-300">{item.jamPulang}</td>
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

export default Absensi;