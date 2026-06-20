import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const navItems = [
  { label: "Home", to: "/", icon: "home" },
  { label: "Report", to: "/create", icon: "plus" },
  { label: "Browse", to: "/recent-items", icon: "search" },
  { label: "Matches", to: "/matches", icon: "heart" },
];

function Icon({ name }) {
  const icons = {
    home: "🏡",
    plus: "➕",
    search: "🔎",
    heart: "💙",
    user: "👤",
  };
  return icons[name] || "•";
}

export default function Navbar() {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const location = useLocation();

  const adminItems = isAdmin
    ? [{ label: "Admin", to: "/admin", icon: "shield" }]
    : [];

  const profilePath = isAdmin ? "/admin/profile" : "/profile";

  const visibleItems = [
    ...navItems,
    ...(isAuthenticated ? [{ label: "Profile", to: profilePath, icon: "user" }] : []),
    ...adminItems,
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-md shadow-[0_-10px_30px_-20px_rgba(15,23,42,0.18)]">
      <div className="max-w-md mx-auto flex justify-between items-center px-3 py-2">
        {visibleItems.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            className={`flex-1 flex flex-col items-center justify-center gap-1 rounded-3xl px-3 py-2 text-xs font-medium transition-all duration-200 ease-in-out ${
              location.pathname === tab.to
                ? "bg-slate-100 text-slate-900"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="text-lg leading-none">
              <Icon name={tab.icon} />
            </span>
            <span>{tab.label}</span>
          </Link>
        ))}
        {!isAuthenticated && (
          <Link
            to="/login"
            className="flex-1 flex flex-col items-center justify-center gap-1 rounded-3xl px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 ease-in-out"
          >
            <span className="text-lg">👤</span>
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}