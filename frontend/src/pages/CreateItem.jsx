import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { geocode } from "../api/geocodeApi";
import MapView from "../components/MapView";

export default function CreateItem() {
  const navigate = useNavigate();
  const debounceTimer = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    status: "lost",
    itemType: "lost",
    itemStatus: "open",
    location: "",
    image: null,
  });

  const [mapMarkers, setMapMarkers] = useState([]);
  const [geocodingLocation, setGeocodingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [myItems, setMyItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);

  const fetchMyItems = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/items/my-items",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMyItems(res.data.items || []);
    } catch (error) {
      console.log(error);
    } finally {
      setItemsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  // Real-time geocoding on location input change
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, location: value });
    setLocationError("");

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (value.trim().length > 2) {
      setGeocodingLocation(true);
      debounceTimer.current = setTimeout(async () => {
        try {
          const result = await geocode(value);
          if (result) {
            setMapMarkers([
              {
                lat: result.lat,
                lng: result.lng,
                title: value,
                itemType: form.status,
                id: "preview",
              },
            ]);
          } else {
            setMapMarkers([]);
          }
        } catch (err) {
          setMapMarkers([]);
        } finally {
          setGeocodingLocation(false);
        }
      }, 800);
    } else {
      setMapMarkers([]);
      setGeocodingLocation(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append(
        "description",
        form.description
      );
      formData.append(
        "category",
        form.category
      );
      formData.append(
        "status",
        form.status
      );
      formData.append("itemType", form.itemType);
      formData.append("itemStatus", form.itemStatus);
      formData.append("location", form.location);

      if (form.image) {
        formData.append(
          "image",
          form.image
        );
      }

      const res = await api.post(
        "/items/create",
        formData
      );

      console.log(
        "SUCCESS:",
        res.data
      );

      alert(
        "Item Created Successfully"
      );

      setForm({
        title: "",
        description: "",
        category: "",
        status: "lost",
        itemType: "lost",
        itemStatus: "open",
        location: "",
        image: null,
      });
      setMapMarkers([]);
      setImagePreview(null);
      setLocationError("");
      setStep(1);

      fetchMyItems();
    } catch (error) {
      console.log(
        "CREATE ITEM ERROR:"
      );
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Error Creating Item"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await api.delete(
        `/items/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMyItems(
        myItems.filter(
          (item) => item._id !== id
        )
      );

      alert(
        "Item Deleted Successfully"
      );
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const statusBadgeStyle = {
    lost: "bg-gradient-to-br from-red-400 via-rose-500 to-red-600 border border-red-300 shadow-lg shadow-red-500/30",
    found: "bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 border border-emerald-300 shadow-lg shadow-emerald-500/30",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden px-4 pb-32 pt-6">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .glass-effect {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(148, 163, 184, 0.2);
        }
        .premium-input {
          background: rgba(30, 41, 59, 0.6);
          border: 1.5px solid rgba(148, 163, 184, 0.3);
          color: #f1f5f9;
          transition: all 0.3s ease;
        }
        .premium-input:focus {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
        }
        .premium-input::placeholder {
          color: rgba(148, 163, 184, 0.6);
        }
        .btn-hover-scale {
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .btn-hover-scale:active {
          transform: scale(0.95);
        }
        .btn-hover-scale:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Main Form Card */}
        <div className="glass-effect rounded-[28px] p-8 shadow-2xl animate-slideDown">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Report Item
              </h2>
              <p className="text-slate-400 mt-2 text-sm">
                Help reunite lost items with their owners
              </p>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="mb-8 p-5 rounded-2xl glass-effect">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 font-semibold ${
                  step === 1
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
                }`}
              >
                <span className="text-lg">📝</span> Report Info
              </button>
              <div className="h-1 flex-1 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full"></div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 font-semibold ${
                  step === 2
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
                }`}
              >
                <span className="text-lg">📍</span> Location & Upload
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <div className="space-y-5 animate-slideDown">
                {/* Item Details Section */}
                <div className="glass-effect rounded-2xl p-6 border border-slate-700/50">
                  <h3 className="text-lg font-bold text-slate-100 mb-5 flex items-center gap-2">
                    <span className="text-2xl">📦</span> Item Details
                  </h3>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Item title (e.g., Blue iPhone 14)"
                    value={form.title}
                    className="premium-input w-full p-4 rounded-xl min-h-[50px] mb-4 font-medium"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                      })
                    }
                    required
                  />

                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    placeholder="Detailed description of the item (color, size, distinguishing marks, etc.)"
                    value={form.description}
                    className="premium-input w-full p-4 rounded-xl min-h-[140px] font-medium resize-none"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Classification Section */}
                <div className="glass-effect rounded-2xl p-6 border border-slate-700/50">
                  <h3 className="text-lg font-bold text-slate-100 mb-5 flex items-center gap-2">
                    <span className="text-2xl">🏷️</span> Classification
                  </h3>

                  <input
                    id="category"
                    name="category"
                    type="text"
                    placeholder="Category (e.g., Electronics, Jewelry, Keys)"
                    value={form.category}
                    className="premium-input w-full p-4 rounded-xl min-h-[50px] mb-5 font-medium"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value,
                      })
                    }
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-300 mb-2 block">
                        Item Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={form.status}
                        className="premium-input w-full p-4 rounded-xl min-h-[50px] font-medium"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            status: e.target.value,
                            itemType: e.target.value,
                          })
                        }
                      >
                        <option value="lost">🔍 Lost</option>
                        <option value="found">✅ Found</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-300 mb-2 block">
                        Report Status
                      </label>
                      <select
                        id="itemStatus"
                        name="itemStatus"
                        value={form.itemStatus}
                        className="premium-input w-full p-4 rounded-xl min-h-[50px] font-medium"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            itemStatus: e.target.value,
                          })
                        }
                      >
                        <option value="open">🔔 Open</option>
                        <option value="pending">⏳ Pending</option>
                        <option value="resolved">🎉 Resolved</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5 animate-slideDown">
                {/* Location Section */}
                <div className="glass-effect rounded-2xl p-6 border border-slate-700/50">
                  <h3 className="text-lg font-bold text-slate-100 mb-5 flex items-center gap-2">
                    <span className="text-2xl">📍</span> Location
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Type any city or place name to see it on the map in real-time
                  </p>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Enter city, street, or location (e.g., 'Central Park, NYC')"
                    value={form.location}
                    className="premium-input w-full p-4 rounded-xl min-h-[50px] font-medium"
                    onChange={handleLocationChange}
                  />

                  {locationError && (
                    <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                      ⚠️ {locationError}
                    </div>
                  )}

                  {geocodingLocation && (
                    <div className="mt-4 p-4 rounded-lg glass-effect flex items-center gap-2 text-blue-300 text-sm">
                      <div className="animate-spin">⏳</div> Locating on map...
                    </div>
                  )}

                  {mapMarkers.length > 0 && (
                    <div className="mt-6 animate-slideDown">
                      <h4 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <span className="text-lg">🗺️</span> Live Map Preview
                      </h4>
                      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-500/20">
                        <MapView markers={mapMarkers} height={280} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Image Upload Section */}
                <div className="glass-effect rounded-2xl p-6 border border-slate-700/50">
                  <h3 className="text-lg font-bold text-slate-100 mb-5 flex items-center gap-2">
                    <span className="text-2xl">📸</span> Photo
                  </h3>

                  <label className="block">
                    <div className="border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:bg-blue-500/5 group">
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <div className="space-y-3">
                        <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                          📤
                        </div>
                        <div>
                          <p className="text-slate-200 font-semibold">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </label>

                  {imagePreview && (
                    <div className="mt-6 animate-slideDown">
                      <p className="text-sm font-semibold text-slate-300 mb-3">
                        ✓ Preview
                      </p>
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/30 border border-purple-500/30">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-60 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 btn-hover-scale border-2 border-slate-600 text-slate-300 rounded-xl px-4 py-3 font-semibold hover:border-slate-500 hover:bg-slate-700/30 transition-all"
                >
                  ← Back
                </button>
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 btn-hover-scale bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl px-4 py-3 font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-hover-scale bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white rounded-xl px-4 py-3 font-semibold shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? "🔄 Submitting..." : "✈️ Submit Report"}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* My Reported Items Section */}
        <div className="glass-effect rounded-[28px] p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-slate-100 mb-2">
            My Reported Items
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Track and manage all your reported items
          </p>

          {itemsLoading ? (
            <div className="py-12 text-center">
              <div className="inline-block animate-spin text-3xl mb-3">⏳</div>
              <p className="text-slate-400">Loading your items...</p>
            </div>
          ) : myItems.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-slate-400">No items reported yet.</p>
              <p className="text-slate-500 text-sm mt-2">Start by reporting an item above</p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {myItems.map((item) => (
                <div
                  key={item._id}
                  className="glass-effect rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-slate-700/50 hover:border-purple-500/50 group"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-48 bg-gradient-to-br from-slate-800 to-slate-900">
                    {item.image ? (
                      <>
                        <img
                          src={`http://localhost:5000/uploads/${item.image}`}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        📷
                      </div>
                    )}

                    {/* Status Badge */}
                    <div
                      className={`absolute top-3 right-3 px-4 py-2 rounded-full text-xs font-bold text-white ${statusBadgeStyle[
                        item.status || "lost"
                      ]} shadow-lg`}
                    >
                      {item.status === "found" ? "✅ FOUND" : "🔍 LOST"}
                    </div>

                    {/* Progress Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-black/40 backdrop-blur">
                      {item.itemStatus === "resolved"
                        ? "✓ Resolved"
                        : item.itemStatus === "pending"
                        ? "⏳ Pending"
                        : "🔔 Open"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-slate-100 line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-slate-400 mt-2 text-sm line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-blue-500/20 text-blue-300 px-3 py-1 text-xs font-semibold border border-blue-500/30">
                        {item.category || "Uncategorized"}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-700/40 text-slate-300 px-3 py-1 text-xs font-semibold border border-slate-600/30">
                        {item.location || "No location"}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <button
                        onClick={() => navigate(`/items/${item._id}`)}
                        className="btn-hover-scale bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl px-3 py-2 text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                      >
                        👁️ View
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn-hover-scale bg-gradient-to-r from-red-600/80 to-rose-600/80 text-white rounded-xl px-3 py-2 text-sm font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}