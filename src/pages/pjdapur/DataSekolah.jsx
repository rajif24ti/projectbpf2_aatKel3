import React, { useState } from "react";
import dataSekolahAwal from "../../data/data-sekolah.json";

function DataSekolah() {
  const [dataSekolah] = useState(dataSekolahAwal);

  return (
    <main className="grow transition-all duration-200">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* HEADER HALAMAN */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold tracking-tight">
            Data Sekolah Mitra
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manajemen data sekolah penerima distribusi program makanan bergizi
            (MBG).
          </p>
        </div>

        {/* TABEL DATA */}
        <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md shadow-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/40 text-gray-500 dark:text-gray-400 text-left text-xs uppercase font-bold tracking-wider border-b border-gray-100 dark:border-gray-700">
                  <th className="p-4 text-center w-12">No</th>
                  <th className="p-4 w-32">NPSN</th>
                  <th className="p-4">Nama Sekolah</th>
                  <th className="p-4 text-center w-24">Jenjang</th>
                  <th className="p-4 text-center w-36">Jumlah Siswa</th>
                  <th className="p-4">Alamat Sekolah</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-sm">
                {dataSekolah.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-8 text-center text-gray-400 dark:text-gray-500"
                    >
                      Tidak ada data sekolah mitra yang tercatat.
                    </td>
                  </tr>
                ) : (
                  dataSekolah.map((item, index) => (
                    <tr
                      key={item.id}
                      className="text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition"
                    >
                      <td className="p-4 text-center text-gray-400">
                        {index + 1}
                      </td>

                      <td className="p-4 font-mono">
                        {item.npsn}
                      </td>

                      <td className="p-4 font-bold text-gray-800 dark:text-gray-100">
                        {item.nama}
                      </td>

                      <td className="p-4 text-center">
                        <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-600">
                          {item.jenjang}
                        </span>
                      </td>

                      <td className="p-4 text-center font-medium text-gray-800 dark:text-gray-200">
                        {item.jumlahSiswa.toLocaleString("id-ID")}
                        <span className="text-xs text-gray-400 font-normal ml-1">
                          Anak
                        </span>
                      </td>

                      <td
                        className="p-4 text-gray-500 dark:text-gray-400 truncate max-w-xs"
                        title={item.alamat}
                      >
                        {item.alamat}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DataSekolah;