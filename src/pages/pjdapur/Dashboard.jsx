import React, { useState } from "react";

export default function Dashboard() {
  const [dataKaryawan] = useState([
    { id: 1, nama: "Siti Aminah", status: "Hadir", waktu: "07:45" },
    { id: 2, nama: "Budi Santoso", status: "Hadir", waktu: "07:52" },
    { id: 3, nama: "Rina Lestari", status: "Izin", waktu: "-" },
    { id: 4, nama: "Agus Pratama", status: "Hadir", waktu: "08:01" },
    { id: 5, nama: "Dewi Kartika", status: "Sakit", waktu: "-" },
  ]);

  const [dataSekolah] = useState([
    { id: 1, nama: "SD Negeri 01", jumlahSiswa: 350 },
    { id: 2, nama: "SD Negeri 02", jumlahSiswa: 280 },
    { id: 3, nama: "SMP Negeri 05", jumlahSiswa: 420 },
  ]);

  const [dataProduksi] = useState([
    { id: 1, tanggal: "24 Juni 2026", menu: "Nasi Ayam", jumlah: 1200, status: "Selesai" },
    { id: 2, tanggal: "24 Juni 2026", menu: "Nasi Telur", jumlah: 950, status: "Proses" },
    { id: 3, tanggal: "24 Juni 2026", menu: "Nasi Ikan", jumlah: 1000, status: "Selesai" },
  ]);

  const [laporan] = useState([
    { id: 1, nama: "Laporan Produksi", status: "Selesai" },
    { id: 2, nama: "Laporan Absensi", status: "Menunggu" },
    { id: 3, nama: "Laporan Operasional", status: "Selesai" },
  ]);

  const hadir = dataKaryawan.filter((i) => i.status === "Hadir").length;
  const izin = dataKaryawan.filter((i) => i.status === "Izin").length;
  const sakit = dataKaryawan.filter((i) => i.status === "Sakit").length;
  const totalKaryawan = dataKaryawan.length;
  const totalSekolah = dataSekolah.length;
  const totalProduksi = dataProduksi.reduce((t, i) => t + i.jumlah, 0);
  const produksiSelesai = dataProduksi.filter((i) => i.status === "Selesai").length;
  const laporanSelesai = laporan.filter((i) => i.status === "Selesai").length;
  const totalDistribusi = dataSekolah.reduce((t, i) => t + i.jumlahSiswa, 0);

  const stats = [
    {
      label: "Produksi Hari Ini",
      value: totalProduksi.toLocaleString(),
      sub: "Total porsi makanan",
      icon: (
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M3 2h18l-2 7H5L3 2zm2 7l1 11h12l1-11H5zm4 3h6v2H9v-2z"/>
        </svg>
      ),
      gradient: "from-violet-500 to-indigo-600",
      glow: "shadow-violet-500/25",
      bg: "from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20",
      text: "text-violet-600 dark:text-violet-400",
    },
    {
      label: "Karyawan Hadir",
      value: `${hadir}/${totalKaryawan}`,
      sub: "Hadir hari ini",
      icon: (
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      gradient: "from-emerald-500 to-teal-600",
      glow: "shadow-emerald-500/25",
      bg: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
      text: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Sekolah Mitra",
      value: totalSekolah,
      sub: `${totalDistribusi} siswa total`,
      icon: (
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
        </svg>
      ),
      gradient: "from-sky-500 to-blue-600",
      glow: "shadow-sky-500/25",
      bg: "from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20",
      text: "text-sky-600 dark:text-sky-400",
    },
    {
      label: "Laporan Selesai",
      value: `${laporanSelesai}/${laporan.length}`,
      sub: "Dokumen selesai",
      icon: (
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-3.5-5.07l-1.41 1.41-3.54-3.54 1.41-1.41 3.54 3.54zm-5.66 0l-1.41-1.41L11 10l1.41 1.41-3.57 3.52z"/>
        </svg>
      ),
      gradient: "from-orange-500 to-amber-600",
      glow: "shadow-orange-500/25",
      bg: "from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20",
      text: "text-orange-600 dark:text-orange-400",
    },
  ];

  const hadirPct = Math.round((hadir / totalKaryawan) * 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #4f46e5 100%)"
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-indigo-300/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[11px] font-semibold px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Live Dashboard
            </div>
            <h1 className="font-poppins text-2xl sm:text-3xl font-bold text-white leading-tight">
              Dashboard Penanggung<br className="hidden sm:block" /> Jawab Dapur
            </h1>
            <p className="text-violet-200 text-sm mt-2 max-w-lg">
              Monitoring produksi makanan bergizi, absensi karyawan, distribusi sekolah, dan laporan operasional secara real-time.
            </p>
          </div>

          {/* Quick status pills */}
          <div className="flex flex-wrap sm:flex-col gap-2 sm:items-end">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 text-white text-xs font-medium">
              <svg className="w-4 h-4 fill-green-300" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              {produksiSelesai} Produksi Selesai
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 text-white text-xs font-medium">
              <svg className="w-4 h-4 fill-yellow-300" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              {dataProduksi.filter(i => i.status === "Proses").length} Sedang Proses
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`card-hover relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.bg} border border-gray-100 dark:border-gray-700/40 p-5`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Decorative circle */}
            <div className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-full opacity-10 blur-xl`} />

            <div className="flex items-start justify-between mb-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg ${stat.glow}`}>
                {stat.icon}
              </div>
            </div>

            <div className={`text-3xl font-poppins font-bold ${stat.text} mb-0.5`}>
              {stat.value}
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{stat.label}</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Produksi Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Produksi Hari Ini</h3>
              <p className="text-xs text-gray-400 mt-0.5">Data produksi terkini</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 px-3 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
              {dataProduksi.length} Item
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/60 dark:bg-gray-700/30">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Menu</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Porsi</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700/40">
                {dataProduksi.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-violet-500 fill-current" viewBox="0 0 24 24">
                            <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2h-15z"/>
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{item.menu}</span>
                          <p className="text-xs text-gray-400">{item.tanggal}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{item.jumlah.toLocaleString()}</span>
                      <p className="text-xs text-gray-400">porsi</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Selesai"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === "Selesai" ? "bg-emerald-500" : "bg-amber-500"}`} />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Absensi Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Absensi Hari Ini</h3>
            <p className="text-xs text-gray-400 mt-0.5">Status kehadiran karyawan</p>
          </div>

          <div className="p-6 space-y-4">
            {/* Progress bar kehadiran */}
            <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 text-center mb-2">
              <div className="text-3xl font-poppins font-bold text-emerald-600 dark:text-emerald-400">{hadirPct}%</div>
              <p className="text-xs text-gray-500 mt-0.5">Tingkat Kehadiran</p>
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-700"
                  style={{ width: `${hadirPct}%` }}
                />
              </div>
            </div>

            {/* Status items */}
            {[
              { label: "Hadir", count: hadir, color: "bg-emerald-500", textColor: "text-emerald-600 dark:text-emerald-400", bgColor: "bg-emerald-50 dark:bg-emerald-500/10" },
              { label: "Izin", count: izin, color: "bg-amber-500", textColor: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-50 dark:bg-amber-500/10" },
              { label: "Sakit", count: sakit, color: "bg-red-500", textColor: "text-red-600 dark:text-red-400", bgColor: "bg-red-50 dark:bg-red-500/10" },
            ].map((s) => (
              <div key={s.label} className={`flex items-center justify-between p-3 rounded-xl ${s.bgColor}`}>
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{s.label}</span>
                </div>
                <span className={`text-lg font-bold ${s.textColor}`}>{s.count}</span>
              </div>
            ))}

            {/* Divider */}
            <div className="h-px bg-gray-100 dark:bg-gray-700/50 my-1" />

            {/* Employee list */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Daftar Karyawan</p>
              <div className="space-y-2">
                {dataKaryawan.map((k) => (
                  <div key={k.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                        {k.nama.charAt(0)}
                      </div>
                      <span className="text-xs text-gray-700 dark:text-gray-300 truncate max-w-[110px]">{k.nama}</span>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      k.status === "Hadir"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                        : k.status === "Izin"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                          : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                    }`}>
                      {k.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Distribusi Sekolah */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Distribusi Sekolah</h3>
              <p className="text-xs text-gray-400 mt-0.5">Sebaran porsi per sekolah</p>
            </div>
            <span className="text-xl font-poppins font-bold text-sky-600 dark:text-sky-400">{totalDistribusi.toLocaleString()}</span>
          </div>
          <div className="p-6 space-y-3">
            {dataSekolah.map((item, idx) => {
              const pct = Math.round((item.jumlahSiswa / totalDistribusi) * 100);
              const colors = ["from-violet-400 to-violet-600", "from-sky-400 to-sky-600", "from-emerald-400 to-emerald-600"];
              return (
                <div key={item.id}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.nama}</span>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{item.jumlahSiswa} <span className="text-xs text-gray-400">({pct}%)</span></span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${colors[idx % colors.length]} rounded-full`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Laporan */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Status Laporan</h3>
            <p className="text-xs text-gray-400 mt-0.5">Rekap dokumen operasional</p>
          </div>
          <div className="p-6 space-y-3">
            {laporan.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.status === "Selesai"
                    ? "bg-emerald-100 dark:bg-emerald-500/15"
                    : "bg-amber-100 dark:bg-amber-500/15"
                }`}>
                  <svg className={`w-5 h-5 fill-current ${item.status === "Selesai" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`} viewBox="0 0 24 24">
                    {item.status === "Selesai"
                      ? <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm1 9l-5 5-3-3 1.41-1.41L10 13.17l3.59-3.59L15 11zm-1-7v5h5l-5-5z"/>
                      : <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                    }
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.nama}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Terakhir diperbarui hari ini</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  item.status === "Selesai"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
