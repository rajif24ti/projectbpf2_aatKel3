import React from 'react';

function BahanBaku() {
  const dataBahan = [
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
  ];

  const getStatus = (stok) => {
    if (stok <= 15) return { label: 'Menipis', color: 'bg-red-100 text-red-600' };
    if (stok <= 30) return { label: 'Cukup', color: 'bg-yellow-100 text-yellow-600' };
    return { label: 'Aman', color: 'bg-green-100 text-green-600' };
  };

  return (
    <main className="grow">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Manajemen Bahan Baku
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Halaman untuk mengelola bahan masuk, stok bahan, penggunaan bahan, dan riwayat stok.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">
            Data Bahan Baku
          </h2>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="p-3 text-sm font-semibold">No</th>
                  <th className="p-3 text-sm font-semibold">Nama Bahan</th>
                  <th className="p-3 text-sm font-semibold">Stok</th>
                  <th className="p-3 text-sm font-semibold">Satuan</th>
                  <th className="p-3 text-sm font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {dataBahan.map((item, index) => {
                  const status = getStatus(item.stok);

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="p-3 text-sm">{index + 1}</td>
                      <td className="p-3 text-sm font-medium text-gray-800 dark:text-gray-100">
                        {item.nama}
                      </td>
                      <td className="p-3 text-sm">{item.stok}</td>
                      <td className="p-3 text-sm">{item.satuan}</td>
                      <td className="p-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </main>
  );
}

export default BahanBaku;