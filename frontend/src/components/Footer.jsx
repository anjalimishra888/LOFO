import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-100 text-slate-700 mt-10">
      <div className="max-w-md mx-auto px-4 py-10 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-slate-900">LOFO</h2>
            <p className="text-sm text-slate-500">
              Helping people reconnect with their lost belongings.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link to="/" className="hover:text-slate-900">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/create" className="hover:text-slate-900">
                    Report Item
                  </Link>
                </li>
                <li>
                  <Link to="/recent-items" className="hover:text-slate-900">
                    Recent Items
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Contact</h3>
              <p className="text-sm text-slate-600">Email: anjali@lofo.com</p>
              <p className="text-sm text-slate-600 mt-2">Phone: +91 98765 43210</p>
              <p className="text-sm text-slate-600 mt-2">Location: India</p>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-slate-500">
          © 2026 LOFO. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}