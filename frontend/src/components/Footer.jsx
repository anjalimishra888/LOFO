export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-3">
              LOFO
            </h2>

            <p className="text-gray-400">
              Helping people reconnect with
              their lost belongings.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>Home</li>
              <li>Lost Items</li>
              <li>Found Items</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Contact
            </h3>

            <p className="text-gray-400">
              support@lofo.com
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          © 2026 LOFO. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}