import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            LOFO
          </h2>

          <p className="text-gray-400">
            Helping people reconnect with their lost belongings.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>

            <li>
              <Link to="/create" className="hover:text-blue-400">
                Report Item
              </Link>
            </li>

            <li>
              <Link to="/my-items" className="hover:text-blue-400">
                My Items
              </Link>
            </li>

            <li>
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>
            </li>

            <li>
              <Link to="/register" className="hover:text-blue-400">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <p className="text-gray-400">
            Email: anjali@lofo.com
          </p>

          <p className="text-gray-400 mt-2">
            Phone: +91 98765 43210
          </p>

          <p className="text-gray-400 mt-2">
            Location: India
          </p>
        </div>

      </div>

      <div className="border-t border-slate-800 py-5 text-center text-gray-400">
        © 2026 LOFO. All Rights Reserved.
      </div>
    </footer>
  );
}