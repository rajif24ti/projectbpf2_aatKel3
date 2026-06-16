import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const localUsers = JSON.parse(localStorage.getItem("users") || "[]");

  console.log("Users :", localUsers);
  console.log("Input :", dataForm);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const localUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const userFound = localUsers.find(
      (user) =>
        user.username.trim() === dataForm.email.trim() &&
        user.password === dataForm.password,
    );

    setTimeout(() => {
      if (!userFound) {
        setError("Username atau Password salah!");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", "dummy-token-123");
      localStorage.setItem("role", userFound.role);
      localStorage.setItem("user", JSON.stringify(userFound));

      switch (userFound.role) {
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

      setLoading(false);
    }, 800);
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
              name="email"
              value={dataForm.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Masukkan Username"
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
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-violet-600 text-white rounded-lg py-2 hover:bg-violet-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
