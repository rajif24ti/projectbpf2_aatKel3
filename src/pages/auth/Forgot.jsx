import React from 'react';
import { Link } from 'react-router-dom';

export default function Forgot() {
  return (
    <div>
      {/* Header Form */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Forgot Your Password? 
        </h2>
        <p className="text-sm text-gray-500 mt-2 px-4">
          Masukkan alamat email Anda dan kami akan mengirimkan link untuk mengatur ulang kata sandi.
        </p>
      </div>

      {/* Form Forgot Password */}
      <form>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              className="form-input w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="btn w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition duration-300 transform active:scale-95"
          >
            Send Reset Link
          </button>
        </div>
      </form>

      {/* Footer Link */}
      <div className="pt-5 mt-6 border-t border-gray-100 text-center">
        <Link 
          className="text-sm font-medium text-green-500 hover:text-green-600 transition duration-150 ease-in-out" 
          to="/"
        >
          &lt;- Back to Login
        </Link>
      </div>
    </div>
  );
}