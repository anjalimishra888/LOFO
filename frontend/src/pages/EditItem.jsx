import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    status: "lost",
    itemType: "lost",
    itemStatus: "open",
    location: "",
  });

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const res = await api.get(`/items/${id}`);
      setForm(res.data.item || {});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/items/${id}`, form);
      navigate("/my-items");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-surface-soft overflow-x-hidden px-4 pb-28 pt-6">
      <div className="max-w-md mx-auto card-surface p-6">
        <h2 className="text-3xl font-bold mb-6">Edit Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-4 rounded-3xl min-h-[48px]"
            placeholder="Title"
          />

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            rows="4"
            className="w-full border p-4 rounded-3xl min-h-[120px]"
            placeholder="Description"
          />

          <input
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            className="w-full border p-4 rounded-3xl min-h-[48px]"
            placeholder="Category"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                  itemType: e.target.value,
                })
              }
              className="w-full border p-4 rounded-3xl min-h-[48px]"
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>

            <select
              value={form.itemStatus}
              onChange={(e) =>
                setForm({
                  ...form,
                  itemStatus: e.target.value,
                })
              }
              className="w-full border p-4 rounded-3xl min-h-[48px]"
            >
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <input
            value={form.location}
            onChange={(e) =>
              setForm({
                ...form,
                location: e.target.value,
              })
            }
            className="w-full border p-4 rounded-3xl min-h-[48px]"
            placeholder="Location"
          />

          <button className="w-full bg-brand text-white rounded-3xl px-6 py-3 min-h-[48px] hover:bg-brand/90">
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
}