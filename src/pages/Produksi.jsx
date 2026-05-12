import React from 'react';

function Produksi() {
  const dataProduksi = [
    { id: 1, tanggal: '2025-01-01', menu: 'Nasi Ayam Sayur', jumlah: 1200, bahanUtama: 'Beras, Ayam, Wortel', status: 'Selesai' },
    { id: 2, tanggal: '2025-01-02', menu: 'Nasi Telur Balado', jumlah: 1150, bahanUtama: 'Beras, Telur, Cabai', status: 'Selesai' },
    { id: 3, tanggal: '2025-01-03', menu: 'Nasi Ikan Sayur', jumlah: 1180, bahanUtama: 'Beras, Ikan, Kol', status: 'Selesai' },
    { id: 4, tanggal: '2025-01-04', menu: 'Nasi Ayam Kecap', jumlah: 1250, bahanUtama: 'Beras, Ayam, Kecap', status: 'Selesai' },
    { id: 5, tanggal: '2025-01-05', menu: 'Nasi Tahu Tempe', jumlah: 1100, bahanUtama: 'Beras, Tahu, Tempe', status: 'Selesai' },
    { id: 6, tanggal: '2025-01-06', menu: 'Nasi Ayam Sup', jumlah: 1225, bahanUtama: 'Beras, Ayam, Kentang', status: 'Selesai' },
    { id: 7, tanggal: '2025-01-07', menu: 'Nasi Ikan Goreng', jumlah: 1190, bahanUtama: 'Beras, Ikan, Minyak', status: 'Selesai' },
    { id: 8, tanggal: '2025-01-08', menu: 'Nasi Telur Sayur', jumlah: 1160, bahanUtama: 'Beras, Telur, Buncis', status: 'Selesai' },
    { id: 9, tanggal: '2025-01-09', menu: 'Nasi Ayam Opor', jumlah: 1230, bahanUtama: 'Beras, Ayam, Santan', status: 'Selesai' },
    { id: 10, tanggal: '2025-01-10', menu: 'Nasi Ikan Kuah', jumlah: 1175, bahanUtama: 'Beras, Ikan, Bumbu', status: 'Selesai' },
    { id: 11, tanggal: '2025-01-11', menu: 'Nasi Ayam Rica', jumlah: 1210, bahanUtama: 'Beras, Ayam, Cabai', status: 'Selesai' },
    { id: 12, tanggal: '2025-01-12', menu: 'Nasi Telur Dadar', jumlah: 1140, bahanUtama: 'Beras, Telur, Minyak', status: 'Selesai' },
    { id: 13, tanggal: '2025-01-13', menu: 'Nasi Tempe Sayur', jumlah: 1125, bahanUtama: 'Beras, Tempe, Sayur', status: 'Proses' },
    { id: 14, tanggal: '2025-01-14', menu: 'Nasi Ayam Goreng', jumlah: 1260, bahanUtama: 'Beras, Ayam, Minyak', status: 'Selesai' },
    { id: 15, tanggal: '2025-01-15', menu: 'Nasi Ikan Balado', jumlah: 1185, bahanUtama: 'Beras, Ikan, Cabai', status: 'Proses' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selesai':
        return 'bg-green-100 text-green-600';
      case 'Proses':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const totalProduksi = dataProduksi.reduce((total, item) => total + item.jumlah, 0);

  return (
    <main className="grow">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Manajemen Produksi
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Halaman untuk mencatat jumlah produksi harian, kebutuhan bahan, dan penggunaan bahan.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Produksi</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
              {totalProduksi.toLocaleString('id-ID')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Porsi makanan</p>
          </div>

          <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Jumlah Menu</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
              {dataProduksi.length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Data produksi</p>
          </div>

          <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Produksi Proses</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
              {dataProduksi.filter((item) => item.status === 'Proses').length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Belum selesai</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">
            Data Produksi Makanan
          </h2>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="p-3 text-sm font-semibold">No</th>
                  <th className="p-3 text-sm font-semibold">Tanggal</th>
                  <th className="p-3 text-sm font-semibold">Menu</th>
                  <th className="p-3 text-sm font-semibold">Jumlah</th>
                  <th className="p-3 text-sm font-semibold">Bahan Utama</th>
                  <th className="p-3 text-sm font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {dataProduksi.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-300">{index + 1}</td>
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-300">{item.tanggal}</td>
                    <td className="p-3 text-sm font-medium text-gray-800 dark:text-gray-100">{item.menu}</td>
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-300">
                      {item.jumlah.toLocaleString('id-ID')} porsi
                    </td>
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-300">{item.bahanUtama}</td>
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

export default Produksi;