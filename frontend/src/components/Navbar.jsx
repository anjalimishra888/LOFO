import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } =
    useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/">
          <div>
            <h1 className="text-4xl font-bold tracking-widest text-blue-700">
              LOFO
            </h1>

            <p className="text-xs text-gray-500">
              LOST IT • LIST IT • FIND IT
            </p>
          </div>
        </Link>

        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className="hover:text-blue-700"
          >
            Home
          </Link>

          <Link
            to="/create"
            className="hover:text-blue-700"
          >
            Report Item
          </Link>

          <Link
            to="/my-items"
            className="hover:text-blue-700"
          >
            My Items
          </Link>

          {isAuthenticated ? (
            <>
              <button
                onClick={logout}
                className="
                bg-red-500
                text-white
                px-4
                py-2
                rounded-lg
                hover:bg-red-600
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-lg
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                bg-green-600
                text-white
                px-4
                py-2
                rounded-lg
                "
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}