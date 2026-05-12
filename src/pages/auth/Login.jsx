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
    setDataForm({
      ...dataForm,
      [name]: value,
    });
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
    // Jika ketemu di lokal, langsung login
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

  const errorInfo = error ? (
    <div className="bg-red-50 border border-red-200 mb-5 p-3 text-sm text-red-600 rounded-lg flex items-center">
      <svg className="w-5 h-5 me-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {error}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-green-50 border border-green-200 mb-5 p-3 text-sm text-green-600 rounded-lg flex items-center">
      <svg className="animate-spin h-5 w-5 me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Mohon Tunggu...
    </div>
  ) : null;

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-sm text-gray-500 mt-1">Sistem Informasi Pengolahan MBG</p>
      </div>

      {errorInfo}
      {loadingInfo}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              name="email"
              value={dataForm.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
              type="text"
              placeholder="emilys"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
              type="password"
              placeholder="********"
              required
            />
          </div>
        </div>

        {/* Link Forgot Password */}
        <div className="flex justify-end mt-2">
          <Link to="/forgot" className="text-sm text-gray-400 hover:text-green-600 transition">
            Lupa Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition ${loading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Bagian Register */}
      <div className="pt-5 mt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500">
          Belum punya akun?{' '}
          <Link to="/register" className="font-medium text-green-500 hover:text-green-600 underline">
            Hubungi Admin
          </Link>
        </p>
      </div>
    </div>
  );
}