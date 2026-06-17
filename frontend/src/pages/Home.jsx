import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO */}

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">

          <div>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              Lost & Found Platform
            </span>

            <h1 className="text-6xl font-bold mt-6 leading-tight">
              Lost It?
              <br />
              Find It Here.
            </h1>

            <p className="text-gray-600 mt-6 text-lg">
              Report lost items, upload found items,
              and connect people with their belongings.
            </p>

            <div className="flex gap-4 mt-8">

              <Link
                to="/create"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg"
              >
                Report Item
              </Link>

              <Link
                to="/my-items"
                className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg"
              >
                Browse Items
              </Link>

            </div>

          </div>

          <div>

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
              alt=""
              className="rounded-2xl shadow-lg"
            />

          </div>

        </div>
      </section>

      {/* FEATURES */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose LOFO?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-4">
                Report Lost Items
              </h3>

              <p className="text-gray-600">
                Quickly submit information about
                your missing belongings.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-4">
                Upload Found Items
              </h3>

              <p className="text-gray-600">
                Help people recover their items.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-4">
                Smart Search
              </h3>

              <p className="text-gray-600">
                Search through hundreds of reports.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}