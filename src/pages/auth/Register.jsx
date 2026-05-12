import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
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
    
    if (dataForm.password !== dataForm.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    // SIMULASI DATABASE: Simpan ke LocalStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ 
        username: dataForm.username, 
        password: dataForm.password 
    });
    
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrasi Berhasil! Silakan Login.");
    navigate('/');
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            name="username"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition">
          Register
        </button>
      </form>
    

      {/* Footer Link */}
      <div className="pt-5 mt-6 border-t border-gray-100">
        <div className="text-sm text-center text-gray-500">
          Sudah punya akun?{' '}
          <Link className="font-medium text-green-500 hover:text-green-600 underline" to="/">
            Login di sini
          </Link>
        </div>
      </div>
    </div>
  );
}