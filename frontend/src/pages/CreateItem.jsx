import { useState } from "react";
import api from "../api/axios";

export default function CreateItem() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    status: "lost",
    image: null,
  });

  const [loading, setLoading] = useState(false);

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
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("status", form.status);

      if (form.image) {
        formData.append("image", form.image);
      }

      const res = await api.post(
        "/items/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("SUCCESS:", res.data);

      alert("Item Created Successfully");

      setForm({
        title: "",
        description: "",
        category: "",
        status: "lost",
        image: null,
      });
    } catch (error) {
      console.log("CREATE ITEM ERROR:");
      console.log(error);
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
          "Error Creating Item"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-6">
          Report Item
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            value={form.title}
            className="w-full border p-3 rounded"
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
            placeholder="Description"
            value={form.description}
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            required
          />

          <input
            id="category"
            name="category"
            type="text"
            placeholder="Category"
            value={form.category}
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            required
          />

          <select
            id="status"
            name="status"
            value={form.status}
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
          >
            <option value="lost">
              Lost
            </option>

            <option value="found">
              Found
            </option>
          </select>

          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.files[0],
              })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading
              ? "Submitting..."
              : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}