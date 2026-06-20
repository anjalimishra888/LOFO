import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 overflow-x-hidden">
      <section className="px-4 pt-10 pb-16">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* HERO CARD */}
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">

            {/* background effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.16),_transparent_30%)] pointer-events-none" />

            {/* CONTENT */}
            <div className="relative space-y-6">

              {/* TEXT SECTION */}
              <span className="inline-flex items-center rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-300/20">
                Lost & Found Platform
              </span>

              <h1 className="text-5xl font-semibold tracking-tight text-white leading-tight">
                Lost it?{" "}
                <br /><span className="text-cyan-300">Find it fast</span>.
              </h1>

              <p className="max-w-xl text-sm leading-7 text-slate-300">
                Report lost items, upload found belongings, and reconnect owners with their valuables using a modern, premium mobile-first experience.
              </p>

              {/* BUTTONS */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  to="/create"
                  className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-2xl shadow-cyan-500/20 transition-transform duration-300 hover:-translate-y-1"
                >
                  Report Item
                </Link>

                <Link
                  to="/recent-items"
                  className="inline-flex items-center justify-center rounded-3xl border border-slate-600/70 bg-white/5 px-6 py-4 text-sm font-semibold text-slate-100 shadow-lg shadow-slate-950/20 transition-all duration-300 hover:bg-white/10"
                >
                  Browse Items
                </Link>
              </div>

              {/* IMAGE (AFTER DESCRIPTION) */}
              <div className="mt-6 rounded-[28px] border border-slate-700/50 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/40">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                  alt="Lost and found service"
                  className="w-full h-[420px] object-cover rounded-[24px]"
                />
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}