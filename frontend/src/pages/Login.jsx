import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent double clicks

    try {
      setLoading(true);

      // 🔥 DEBUG (remove later if needed)
      console.log("LOGIN DATA:", form);

      const res = await api.post("/auth/login", form);

      login(res.data);

      if (res.data.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/create", { replace: true });
      }

    } catch (error) {

      console.log("LOGIN ERROR:", error.response?.data);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 overflow-x-hidden">
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/85 p-10 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="relative z-10 space-y-8">
            <div className="space-y-3 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Welcome back</p>
              <h2 className="text-4xl font-bold text-white">Login to LOFO</h2>
              <p className="text-slate-400">Securely access your lost and found dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                required
              />

              <button
                disabled={loading}
                className="w-full rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-400">
              No account yet?
              <Link to="/register" className="text-cyan-300 font-semibold ml-2 hover:text-cyan-200">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}