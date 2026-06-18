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

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
  const res = await api.post("/items/create", data);
  console.log(res.data);
  alert("Item Created Successfully");
} catch (error) {
  console.log(error.response?.data);
  alert("Error Creating Item");
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
            placeholder="Title"
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <textarea
            rows="5"
            placeholder="Description"
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <input
            placeholder="Category"
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          />

          <select
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <input
            type="file"
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.files[0],
              })
            }
          />

          <button className="bg-blue-600 text-white px-8 py-3 rounded">
            Submit
          </button>

        </form>

      </div>

    </div>
  );
}