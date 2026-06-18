// src/pages/AdminDashboard.jsx

import { useEffect, useState } from "react";
import api from "../api/axios";
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

        setStats(
          statsRes.data
        );

        setUsers(
          usersRes.data
        );

        setItems(
          itemsRes.data
        );
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

  const deleteItem =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete Item?"
        );

      if (
        !confirmDelete
      )
        return;

      try {
        await api.delete(
          `/admin/items/${id}`
        );

        setItems((prev) =>
          prev.filter(
            (item) =>
              item._id !== id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}

      <AdminSidebar />

      {/* CONTENT */}

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500">
            Manage users,
            items and
            platform data
          </p>
        </div>

        {/* CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <DashboardCard
            title="Total Users"
            value={
              stats.users
            }
          />

          <DashboardCard
            title="Total Items"
            value={
              stats.items
            }
          />

          <DashboardCard
            title="Lost Items"
            value={
              stats.lost
            }
          />

          <DashboardCard
            title="Found Items"
            value={
              stats.found
            }
          />
        </div>

        {/* USERS */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="flex justify-between mb-5">
            <h2 className="text-2xl font-bold">
              Users
            </h2>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded">
              {
                users.length
              }{" "}
              Users
            </span>
          </div>

          <UsersTable
            users={users}
            onDelete={
              deleteUser
            }
          />
        </div>

        {/* ITEMS */}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between mb-5">
            <h2 className="text-2xl font-bold">
              Items
            </h2>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded">
              {
                items.length
              }{" "}
              Items
            </span>
          </div>

          <ItemsTable
            items={items}
            onDelete={
              deleteItem
            }
          />
        </div>
      </div>
    </div>
  );
}