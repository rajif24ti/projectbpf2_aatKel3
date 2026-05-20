import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Forgot() {
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");

    // Simulasi pengiriman link reset password
    setSuccess(`Link reset kata sandi telah dikirim ke: ${email}`);
    setEmail("");
  };

  // Notifikasi Sukses (Menggunakan Aksen Emerald/Hijau Daun dari Template)
  const successInfo = success ? (
    <div className="bg-emerald-50 border border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20 mb-5 p-3 text-sm text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center">
      <svg className="w-5 h-5 me-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      {success}
    </div>
  ) : null;

  return (
    <div>
      {/* Header Form */}
      <div className="text-center mb-5">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Forgot Your Password? 
        </h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 px-2">
          Masukkan alamat email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
        </p>
      </div>

      {successInfo}

      {/* Form Forgot Password */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 text-gray-800 dark:text-gray-200 outline-none transition text-sm"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        {/* Tombol Utama Tema Violet */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white font-semibold py-2.5 px-6 rounded-lg text-sm shadow-sm transition active:scale-95"
          >
            Send Reset Link
          </button>
        </div>
      </form>

      {/* Footer Link Kembali ke Login dengan efek hover Violet */}
      <div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60 text-center">
        <Link 
          className="text-xs font-medium text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300 transition" 
          to="/"
        >
          &lt;- Back to Login
        </Link>
      </div>
    </div>
  );
}