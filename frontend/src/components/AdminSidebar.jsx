import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: "📊" },
    { name: "Users", path: "/admin/users", icon: "👥" },
    { name: "Items", path: "/admin/items", icon: "📦" },
    { name: "Lost", path: "/admin/lost-items", icon: "🔍" },
    { name: "Found", path: "/admin/found-items", icon: "🎯" },
    { name: "Messages", path: "/admin/messages", icon: "💬" },
    { name: "Profile", path: "/admin/profile", icon: "👤" },
  ];

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-slate-900">Admin Hub</h1>
        <p className="text-sm text-slate-500 mt-1">Quick access to admin workflows</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col gap-2 rounded-2xl px-4 py-4 text-sm transition-all duration-200 ease-in-out ${
              location.pathname === item.path
                ? "bg-slate-100 text-slate-900 shadow-sm"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium truncate">{item.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}