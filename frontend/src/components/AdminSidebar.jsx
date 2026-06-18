import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "📊",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "👥",
    },
    {
      name: "Items",
      path: "/admin/items",
      icon: "📦",
    },
    {
      name: "Lost Items",
      path: "/admin/lost-items",
      icon: "🔍",
    },
    {
      name: "Found Items",
      path: "/admin/found-items",
      icon: "🎯",
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: "💬",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white shadow-xl">

      {/* LOGO */}

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-3xl font-bold tracking-wider">
          LOFO
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Admin Dashboard
        </p>

      </div>

      {/* MENU */}

      <div className="mt-6">

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-4 transition duration-200
              
              ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-gray-300"
              }
            `}
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.name}
            </span>

          </Link>

        ))}

      </div>

      {/* FOOTER */}

      <div className="absolute bottom-0 w-72 p-6 border-t border-slate-700">

        <div className="text-sm text-gray-400">

          <p>LOFO Admin Panel</p>

          <p className="mt-1">
            Lost & Found Management
          </p>

        </div>

      </div>

    </aside>
  );
}