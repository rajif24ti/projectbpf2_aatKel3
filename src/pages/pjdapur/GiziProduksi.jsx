import { useParams, Link } from "react-router-dom";
import dataProduksiAwal from "../../data/data-produksi.json";
import dataSekolah from "../../data/data-sekolah.json";

export default function GiziProduksi() {
  const { id } = useParams();

  // Cari data produksi
  const produksi = dataProduksiAwal.find(
    (item) => item.id === Number(id)
  );

  // Cari nama sekolah berdasarkan idSekolah
  const getNamaSekolah = (idSekolah) => {
    const sekolah = dataSekolah.find(
      (item) => item.id === Number(idSekolah)
    );

    return sekolah ? sekolah.nama : "Sekolah tidak ditemukan";
  };

  if (!produksi) {
    return (
      <div className="p-6 text-center">
        Data produksi tidak ditemukan.
      </div>
    );
  }

  return (
    <main className="grow">
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Tombol Kembali */}
        <Link
          to="/produksi"
          className="inline-flex items-center text-violet-600 hover:text-violet-700 mb-6"
        >
          ← Kembali ke Produksi
        </Link>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {getNamaSekolah(produksi.idSekolah)}
          </h1>

          <p className="text-gray-500 mt-2">
            Detail Gizi Produksi Makanan MBG/SPPG
          </p>
        </div>

        {/* Informasi Produksi */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Informasi Produksi
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-gray-500">Sekolah</p>
              <p className="font-semibold">
                {getNamaSekolah(produksi.idSekolah)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Tanggal</p>
              <p className="font-semibold">
                {produksi.tanggal}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Menu</p>
              <p className="font-semibold">
                {produksi.menu}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Jumlah Porsi</p>
              <p className="font-semibold">
                {produksi.porsi} Porsi
              </p>
            </div>

          </div>
        </div>

        {/* Informasi Gizi */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold mb-4">
            Informasi Gizi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

            <div className="p-4 rounded-xl bg-violet-50">
              <p className="text-sm text-gray-500">
                Kalori
              </p>
              <h3 className="text-xl font-bold text-violet-700">
                {produksi.kalori}
              </h3>
              <p className="text-xs text-gray-500">
                kkal
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sky-50">
              <p className="text-sm text-gray-500">
                Protein
              </p>
              <h3 className="text-xl font-bold text-sky-700">
                {produksi.protein}
              </h3>
              <p className="text-xs text-gray-500">
                gram
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50">
              <p className="text-sm text-gray-500">
                Karbohidrat
              </p>
              <h3 className="text-xl font-bold text-emerald-700">
                {produksi.karbohidrat}
              </h3>
              <p className="text-xs text-gray-500">
                gram
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50">
              <p className="text-sm text-gray-500">
                Lemak
              </p>
              <h3 className="text-xl font-bold text-amber-700">
                {produksi.lemak}
              </h3>
              <p className="text-xs text-gray-500">
                gram
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50">
              <p className="text-sm text-gray-500">
                Serat
              </p>
              <h3 className="text-xl font-bold text-rose-700">
                {produksi.serat}
              </h3>
              <p className="text-xs text-gray-500">
                gram
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}