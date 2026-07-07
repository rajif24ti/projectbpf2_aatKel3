import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Query tabel users dari Supabase
      const { data, error: queryError } = await supabase
        .from("users")
        .select("*")
        .eq("username", dataForm.username.trim())
        .eq("password", dataForm.password)
        .single();

      if (queryError || !data) {
        console.error("Supabase Login Error:", queryError);
        setError("Username atau Password salah! (Cek Console)");
        setLoading(false);
        return;
      }

      // Simpan sesi ke localStorage
      localStorage.setItem("token", "mbg-session-token");
      localStorage.setItem("role", data.role);
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect berdasarkan role
      switch (data.role) {
        case "pj_dapur":
          navigate("/dashboard-pj-dapur");
          break;
        case "ahli_gizi":
          navigate("/dashboard-ahli-gizi");
          break;
        case "pj_sekolah":
          navigate("/dashboard-pj-sekolah");
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Sign In</h2>
        <p className="text-gray-500">Silakan masuk ke akun Anda</p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-600">
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-4 rounded-lg bg-violet-100 p-3 text-violet-600">
          Mohon Tunggu...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={dataForm.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Masukkan Username"
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="********"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-violet-600 text-white rounded-lg py-2 hover:bg-violet-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
