import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyItems() {

  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchMyItems();

  }, []);

  const fetchMyItems = async () => {

    try {

      const res =
        await api.get(
          "/items/my-items"
        );

      setItems(
        res.data.items || []
      );

    } catch (error) {

      console.log(
        error.response?.data
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Items
      </h1>

      {items.length === 0 ? (

        <p>No items found.</p>

      ) : (

        <div className="grid md:grid-cols-3 gap-6">

          {items.map((item) => (

            <div
              key={item._id}
              className="border rounded-lg p-4 shadow"
            >

              {item.image && (

                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded"
                />

              )}

              <h2 className="text-xl font-semibold mt-3">
                {item.title}
              </h2>

              <p className="mt-2">
                {item.description}
              </p>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded text-white ${
                  item.status === "lost"
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
              >
                {item.status}
              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}