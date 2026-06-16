import React, { useState } from "react";

export default function Dashboard() {
  // Data Karyawan
  const [dataKaryawan] = useState([
    { id: 1, nama: "Siti Aminah", status: "Hadir" },
    { id: 2, nama: "Budi Santoso", status: "Hadir" },
    { id: 3, nama: "Rina Lestari", status: "Izin" },
    { id: 4, nama: "Agus Pratama", status: "Hadir" },
    { id: 5, nama: "Dewi Kartika", status: "Sakit" },
  ]);

  // Data Produksi
  const [dataProduksi] = useState([
    {
      id: 1,
      tanggal: "16 Juni 2026",
      menu: "Nasi Ayam",
      jumlah: 1200,
      status: "Selesai",
    },
    {
      id: 2,
      tanggal: "16 Juni 2026",
      menu: "Nasi Telur",
      jumlah: 950,
      status: "Proses",
    },
    {
      id: 3,
      tanggal: "16 Juni 2026",
      menu: "Nasi Ikan",
      jumlah: 1000,
      status: "Selesai",
    },
  ]);

  // Data Laporan
  const [laporan] = useState([
    {
      id: 1,
      nama: "Laporan Produksi",
      status: "Selesai",
    },
    {
      id: 2,
      nama: "Laporan Absensi",
      status: "Menunggu",
    },
    {
      id: 3,
      nama: "Laporan Operasional",
      status: "Selesai",
    },
  ]);

  const totalKaryawan = dataKaryawan.length;
  const hadir = dataKaryawan.filter((k) => k.status === "Hadir").length;

  const totalProduksi = dataProduksi.reduce(
    (a, b) => a + b.jumlah,
    0
  );

  const laporanSelesai = laporan.filter(
    (l) => l.status === "Selesai"
  ).length;

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">
        Dashboard Penanggung Jawab Dapur
      </h1>

      {/* CARD */}
      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Produksi Hari Ini</p>
          <h2 className="text-3xl font-bold text-violet-600">
            {totalProduksi}
          </h2>
          <small>Porsi</small>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Karyawan Hadir</p>
          <h2 className="text-3xl font-bold text-green-600">
            {hadir}
          </h2>
          <small>dari {totalKaryawan} orang</small>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Total Karyawan</p>
          <h2 className="text-3xl font-bold text-blue-600">
            {totalKaryawan}
          </h2>
          <small>Data aktif</small>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Laporan Selesai</p>
          <h2 className="text-3xl font-bold text-orange-600">
            {laporanSelesai}
          </h2>
          <small>Dokumen</small>
        </div>

      </div>

      {/* TABEL PRODUKSI */}
      <div className="bg-white rounded-xl shadow mt-8 p-5">

        <h3 className="text-lg font-semibold mb-4">
          Produksi Hari Ini
        </h3>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Tanggal</th>
              <th className="p-2">Menu</th>
              <th className="p-2">Jumlah</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {dataProduksi.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.tanggal}</td>
                <td className="p-2">{item.menu}</td>
                <td className="p-2">{item.jumlah} Porsi</td>
                <td className="p-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* LAPORAN */}
      <div className="bg-white rounded-xl shadow mt-8 p-5">

        <h3 className="text-lg font-semibold mb-4">
          Status Laporan Operasional
        </h3>

        <ul className="space-y-3">
          {laporan.map((item) => (
            <li
              key={item.id}
              className="flex justify-between border-b pb-2"
            >
              <span>{item.nama}</span>
              <span
                className={
                  item.status === "Selesai"
                    ? "text-green-600 font-semibold"
                    : "text-yellow-600 font-semibold"
                }
              >
                {item.status}
              </span>
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
}