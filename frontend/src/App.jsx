import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import CreateItem from "./pages/CreateItem";
import RecentItems from "./pages/RecentItems";
import ItemDetails from "./pages/ItemDetails";
import EditItem from "./pages/EditItem";

import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import Matches from "./pages/Matches";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          404
        </h1>

        <p className="text-gray-500 text-lg">
          Page Not Found
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <main className="flex flex-col min-h-screen max-w-md w-full mx-auto pb-28">
        <div className="flex-grow px-4">
          <Routes>

            {/* PUBLIC ROUTES */}

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* ✅ FIXED ROUTE */}
            <Route path="/items/:id" element={<ItemDetails />} />

            {/* USER PROTECTED ROUTES */}

            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateItem />
                </ProtectedRoute>
              }
            />

            <Route path="/recent-items" element={<RecentItems />} />

            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditItem />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/matches"
              element={
                <ProtectedRoute>
                  <Matches />
                </ProtectedRoute>
              }
            />

            {/* ADMIN ROUTE */}

            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/profile"
              element={
                <AdminRoute>
                  <AdminProfile />
                </AdminRoute>
              }
            />

            {/* 404 */}

            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>

        <Footer />
      </main>

      <Navbar />
    </div>
  );
}