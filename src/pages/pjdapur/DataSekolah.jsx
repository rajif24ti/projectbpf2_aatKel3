import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

function DataSekolah() {
  const [dataSekolah, setDataSekolah] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataSekolah();
  }, []);

  const fetchDataSekolah = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("sekolah")
        .select("*")
        .order("nama", { ascending: true });

      if (error) throw error;
      setDataSekolah(data || []);
    } catch (error) {
      console.error("Error fetching data sekolah:", error);
      alert("Gagal mengambil data sekolah: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalSiswa = dataSekolah.reduce(
    (sum, item) => sum + (item.jumlah_siswa || 0),
    0
  );

  return (
    <main className="grow transition-all duration-200">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* HEADER HALAMAN */}
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold tracking-tight">
              Data Sekolah Mitra
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Daftar sekolah penerima distribusi program makanan bergizi (MBG) wilayah Pekanbaru.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/40 rounded-xl px-4 py-2 text-center">
              <p className="text-xs text-gray-400">Total Sekolah</p>
              <p className="text-xl font-bold text-blue-600">{dataSekolah.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700/40 rounded-xl px-4 py-2 text-center">
              <p className="text-xs text-gray-400">Total Siswa</p>
              <p className="text-xl font-bold text-violet-600">{totalSiswa.toLocaleString("id-ID")}</p>
            </div>
          </div>
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
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      Memuat data sekolah...
                    </td>
                  </tr>
                ) : dataSekolah.length === 0 ? (
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

                      <td className="p-4 font-mono text-xs">
                        {item.npsn}
                      </td>

                      <td className="p-4 font-bold text-gray-800 dark:text-gray-100">
                        {item.nama}
                      </td>

                      <td className="p-4 text-center">
                        <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                          {item.jenjang}
                        </span>
                      </td>

                      <td className="p-4 text-center font-medium text-gray-800 dark:text-gray-200">
                        {(item.jumlah_siswa || 0).toLocaleString("id-ID")}
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