import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/auth/register",
        form
      );

      alert("Registration Successful");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 overflow-x-hidden">
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/85 p-10 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="relative z-10 space-y-8">
            <div className="space-y-3 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Create account</p>
              <h2 className="text-4xl font-bold text-white">Join LOFO</h2>
              <p className="text-slate-400">Register quickly and start reporting items with confidence.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Name"
                className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

              <input
                placeholder="Email"
                className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />

              <button className="w-full rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-pink-500/20 hover:-translate-y-0.5 transition-transform duration-200">
                Register
              </button>
            </form>

            <p className="text-center text-sm text-slate-400">
              Already registered?
              <Link to="/login" className="text-cyan-300 font-semibold ml-2 hover:text-cyan-200">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}