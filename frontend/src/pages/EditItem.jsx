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
  });

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const res = await api.get(`/items/${id}`);
      setForm(res.data);
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
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6">
          Edit Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full border p-3 rounded"
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
            className="w-full border p-3 rounded"
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
            className="w-full border p-3 rounded"
            placeholder="Category"
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <button className="bg-blue-600 text-white px-6 py-3 rounded">
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
}