import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    lost: 0,
    found: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg text-gray-500">
            Total Users
          </h3>

          <h2 className="text-4xl font-bold mt-3">
            {stats.users}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg text-gray-500">
            Lost Items
          </h3>

          <h2 className="text-4xl font-bold mt-3">
            {stats.lost}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg text-gray-500">
            Found Items
          </h3>

          <h2 className="text-4xl font-bold mt-3">
            {stats.found}
          </h2>
        </div>

      </div>
    </div>
  );
}