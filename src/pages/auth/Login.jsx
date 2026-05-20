import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "", 
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userFound = localUsers.find(
      (u) => u.username === dataForm.email && u.password === dataForm.password
    );

    if (userFound) {
      setTimeout(() => {
        localStorage.setItem("token", "dummy-token-123");
        navigate("/dashboard");
      }, 1000);
      return;
    }

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        setError("Username atau Password salah!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Notifikasi Error
  const errorInfo = error ? (
    <div className="bg-red-50 border border-red-200 dark:bg-red-500/10 dark:border-red-500/20 mb-5 p-3 text-sm text-red-600 dark:text-red-400 rounded-lg flex items-center">
      <svg className="w-5 h-5 me-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {error}
    </div>
  ) : null;

  // Notifikasi Loading (Menggunakan Aksen Violet)
  const loadingInfo = loading ? (
    <div className="bg-violet-50 border border-violet-200 dark:bg-violet-500/10 dark:border-violet-500/20 mb-5 p-3 text-sm text-violet-600 dark:text-violet-400 rounded-lg flex items-center">
      <svg className="animate-spin h-5 w-5 me-2 text-violet-500 dark:text-violet-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Mohon Tunggu...
    </div>
  ) : null;

  return (
    <div>
      <div className="text-center mb-5">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Sign In</h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">Silakan masuk ke akun Anda</p>
      </div>

      {errorInfo}
      {loadingInfo}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
            <input
              name="email"
              value={dataForm.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 text-gray-800 dark:text-gray-200 outline-none transition text-sm"
              type="text"
              placeholder="Masukkan username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 text-gray-800 dark:text-gray-200 outline-none transition text-sm"
              type="password"
              placeholder="********"
              required
            />
          </div>
        </div>

        {/* Lupa Password dengan efek hover warna Violet */}
        <div className="flex justify-end mt-2">
          <Link to="/forgot" className="text-xs text-gray-400 dark:text-gray-500 hover:text-violet-500 dark:hover:text-violet-400 transition">
            Lupa Password?
          </Link>
        </div>

        {/* Tombol Login menggunakan warna dasar Violet-500 */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white font-semibold py-2.5 rounded-lg text-sm shadow-sm transition ${loading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Tautan Hubungi Admin dengan aksen Violet */}
      <div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Belum punya akun?{' '}
          <Link to="/register" className="font-medium text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300 underline">
            Hubungi Admin
          </Link>
        </p>
      </div>
    </div>
  );
}