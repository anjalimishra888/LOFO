import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminProfile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 overflow-x-hidden px-4 pb-28 pt-6">
      <div className="max-w-md mx-auto overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "Admin")}`}
              alt="Admin Avatar"
              className="w-24 h-24 rounded-full border-2 border-purple-400/40 bg-slate-900"
            />
            <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 rounded-full bg-purple-400 shadow-lg shadow-purple-400/20" />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white">Admin Profile</h2>
            <p className="text-slate-400">Administrator access</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20">
            <p className="font-semibold text-slate-300">Name</p>
            <p className="mt-2 text-lg text-white">{user?.name}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20">
            <p className="font-semibold text-slate-300">Email</p>
            <p className="mt-2 text-lg text-white">{user?.email}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20">
            <p className="font-semibold text-slate-300">Role</p>
            <p className="mt-2 text-lg text-cyan-300">{user?.role || "admin"}</p>
          </div>

          <div>
            <button
              onClick={handleLogout}
              className="w-full rounded-3xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-4 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/20 transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
