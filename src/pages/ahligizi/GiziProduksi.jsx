import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function GiziProduksi() {
  const { id } = useParams();
  const [produksi, setProduksi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduksi();
  }, [id]);

  const fetchProduksi = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("produksi")
        .select(`*, sekolah ( nama )`)
        .eq("id", id)
        .single();

      if (error) throw error;
      setProduksi(data);
    } catch (error) {
      console.error("Error fetching produksi detail:", error);
      setProduksi(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        Memuat detail produksi...
      </div>
    );
  }

  if (!produksi) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4">Data produksi tidak ditemukan.</p>
        <Link
          to="/produksi-ahli-gizi"
          className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium"
        >
          ← Kembali ke Produksi
        </Link>
      </div>
    );
  }

  const namaSekolah = produksi.sekolah?.nama || "Sekolah Tidak Ditemukan";

  return (
    <main className="grow">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tombol Kembali */}
        <Link
          to="/produksi-ahli-gizi"
          className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium mb-6"
        >
          ← Kembali ke Produksi
        </Link>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {namaSekolah}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Detail Gizi Produksi Makanan MBG/SPPG
          </p>
        </div>

        {/* Informasi Produksi */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Informasi Produksi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tanggal</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">{produksi.tanggal}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Menu</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">{produksi.menu}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Jumlah Porsi</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {produksi.porsi?.toLocaleString("id-ID")} Porsi
              </p>
            </div>
          </div>
        </div>

        {/* Informasi Gizi */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Informasi Nilai Gizi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Kalori</p>
              <h3 className="text-2xl font-bold text-violet-700 dark:text-violet-400">
                {produksi.kalori}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">kkal</p>
            </div>

            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Protein</p>
              <h3 className="text-2xl font-bold text-sky-700 dark:text-sky-400">
                {produksi.protein}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">gram</p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Karbohidrat</p>
              <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                {produksi.karbohidrat}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">gram</p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Lemak</p>
              <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                {produksi.lemak}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">gram</p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Serat</p>
              <h3 className="text-2xl font-bold text-rose-700 dark:text-rose-400">
                {produksi.serat}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">gram</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
