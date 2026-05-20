import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }

    // SIMULASI DATABASE: Simpan ke LocalStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Validasi jika username sudah terdaftar
    const isExist = users.some((u) => u.username === dataForm.username);
    if (isExist) {
      setError("Username sudah digunakan!");
      return;
    }

    users.push({ 
      username: dataForm.username, 
      password: dataForm.password 
    });
    
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Registrasi Berhasil! Mengalihkan ke halaman login...");
    
    // Beri jeda 1.5 detik agar user sempat melihat pesan sukses sebelum pindah halaman
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  // Notifikasi Error (Aksen Red/Coral)
  const errorInfo = error ? (
    <div className="bg-red-50 border border-red-200 dark:bg-red-500/10 dark:border-red-500/20 mb-5 p-3 text-sm text-red-600 dark:text-red-400 rounded-lg flex items-center">
      <svg className="w-5 h-5 me-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {error}
    </div>
  ) : null;

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
      <div className="text-center mb-5">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Create Account</h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">Daftarkan akun baru Anda</p>
      </div>

      {errorInfo}
      {successInfo}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
          <input
            name="username"
            value={dataForm.username}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 text-gray-800 dark:text-gray-200 outline-none transition text-sm"
            placeholder="Masukkan username baru"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 text-gray-800 dark:text-gray-200 outline-none transition text-sm"
            placeholder="********"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={dataForm.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 text-gray-800 dark:text-gray-200 outline-none transition text-sm"
            placeholder="Ulangi password"
            required
          />
        </div>
        
        {/* Tombol Register menggunakan tema utama Violet */}
        <button 
          type="submit" 
          disabled={!!success}
          className={`w-full mt-6 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white font-semibold py-2.5 rounded-lg text-sm shadow-sm transition ${success ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
        >
          Register
        </button>
      </form>

      {/* Footer Link kembali ke Login */}
      <div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Sudah punya akun?{' '}
          <Link className="font-medium text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300 underline" to="/">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}