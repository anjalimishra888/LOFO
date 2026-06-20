// src/pages/AdminDashboard.jsx

import { useEffect, useState } from "react";
import api from "../api/axios";
import MapView from "../components/MapView";
import { geocode } from "../api/geocodeApi";
import AdminSidebar from "../components/AdminSidebar";
import DashboardCard from "../components/DashboardCard";
import UsersTable from "../components/UsersTable";
import ItemsTable from "../components/ItemsTable";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    items: 0,
    lost: 0,
    found: 0
  });

  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [mapMarkers, setMapMarkers] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {
      try {
        const statsRes =
          await api.get(
            "/admin/stats"
          );

        const usersRes =
          await api.get(
            "/admin/users"
          );

        const itemsRes =
          await api.get(
            "/admin/items"
          );

        setStats({
          users: statsRes.data.totalUsers ?? statsRes.data.users ?? 0,
          items: statsRes.data.totalItems ?? statsRes.data.items ?? 0,
          lost: statsRes.data.totalLostItems ?? statsRes.data.lost ?? 0,
          found: statsRes.data.totalFoundItems ?? statsRes.data.found ?? 0,
        });

        setUsers(
          usersRes.data
        );

        setItems(
          itemsRes.data
        );

        // Build map markers from available item coordinates or fallback to geocoding
        try {
          const source = statsRes.data.latestItems || itemsRes.data || [];
          const slice = source.slice(0, 6);
          const geoPromises = slice.map(async (it) => {
            if (it.location) {
              const g = await geocode(it.location);
              return g
                ? {
                    id: it._id,
                    lat: g.lat,
                    lng: g.lng,
                    title: it.title,
                    date: it.createdAt ? new Date(it.createdAt).toLocaleDateString() : "",
                    itemType: it.itemType || it.status || "lost"
                  }
                : null;
            }
            return null;
          });

          const results = await Promise.all(geoPromises);
          const valid = results.filter(Boolean);
          setMapMarkers(valid);
        } catch (err) {
          console.error("Map geocoding failed", err);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const deleteUser =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete User?"
        );

      if (
        !confirmDelete
      )
        return;

      try {
        await api.delete(
          `/admin/users/${id}`
        );

        setUsers((prev) =>
          prev.filter(
            (user) =>
              user._id !== id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm("Delete Item?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/items/${id}`);

      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to delete item");
    }
  };

  // Change user role handler used by UsersTable
  const changeUserRole = async (userId, role) => {
    try {
      const res = await api.put(`/admin/users/${userId}/role`, { role });

      // Replace the updated user in local state (res.data.user or res.data)
      const updatedUser = res.data.user ?? res.data.user ?? res.data;

      setUsers((prev) => prev.map((u) => (u._id === userId ? updatedUser : u)));
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update role");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 overflow-x-hidden px-4 py-10">
        <div className="max-w-md mx-auto rounded-3xl bg-white p-6 shadow-lg text-center">
          <h2 className="text-2xl">Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden px-4 pb-28 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        <AdminSidebar />

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500">Manage users, items and platform data</p>
          </div>

          <div className="grid gap-4 mb-6">
            <DashboardCard title="Total Users" value={stats.users} />
            <DashboardCard title="Total Items" value={stats.items} />
            <DashboardCard title="Lost Items" value={stats.lost} />
            <DashboardCard title="Found Items" value={stats.found} />
          </div>

          {/* Interactive map showing recent items (uses OpenStreetMap via Leaflet) */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm text-gray-600">Map of recent items</h3>
              <button
                onClick={async () => {
                  // re-geocode items (limit 10)
                  try {
                    const withLoc = items.filter((it) => it.location);
                    if (withLoc.length === 0) return alert('No items with location to geocode');

                    const slice = withLoc.slice(0, 10);
                    const ps = slice.map(async (it) => {
                      const g = await geocode(it.location);
                      return g ? { lat: g.lat, lng: g.lng, label: it.title || it.location } : null;
                    });

                    const res = await Promise.all(ps);
                    const valid = res.filter(Boolean);
                    setMapMarkers(valid);

                    alert(`Geocoded ${valid.length} items and updated map.`);
                  } catch (err) {
                    console.error('Re-geocode failed', err);
                    alert('Re-geocode failed');
                  }
                }}
                className="bg-brand text-white px-3 py-1 rounded-full text-sm"
              >
                Re-geocode Items
              </button>
            </div>
            <MapView markers={mapMarkers} height={220} />
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 p-4">
              <div className="flex justify-between items-center gap-3 mb-4">
                <h2 className="text-xl font-bold">Users</h2>
                <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-2 text-sm">
                  {users.length} Users
                </span>
              </div>
              <UsersTable users={users} onDeleteUser={deleteUser} onChangeRole={changeUserRole} />
            </div>

            <div className="rounded-3xl border border-slate-200 p-4">
              <div className="flex justify-between items-center gap-3 mb-4">
                <h2 className="text-xl font-bold">Items</h2>
                <span className="bg-green-100 text-green-700 rounded-full px-3 py-2 text-sm">
                  {items.length} Items
                </span>
              </div>
              <ItemsTable items={items} onDelete={deleteItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}