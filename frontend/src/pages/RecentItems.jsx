import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function MyItems() {

  const navigate = useNavigate(); // ✅ ADDED

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data.items || []);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const lostItems = items.filter(
    item => item.status === "lost"
  );

  const foundItems = items.filter(
    item => item.status === "found"
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 overflow-x-hidden px-4 py-10">
        <div className="max-w-md mx-auto rounded-3xl bg-white p-6 shadow-lg">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden px-4 pb-28 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow">
          <h1 className="text-3xl font-bold mb-4">Items</h1>

          {items.length === 0 ? (
            <p>No items found.</p>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4 text-red-600">
                Lost Items
              </h2>

              {lostItems.length === 0 ? (
                <p className="mb-6">No lost items.</p>
              ) : (
                <div className="grid gap-4 mb-10">
                  {lostItems.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-3xl p-4 shadow cursor-pointer"
                      onClick={() => navigate(`/items/${item._id}`)}
                    >
                      {item.image && (
                        <img
                          src={`http://localhost:5000/uploads/${item.image}`}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-3xl"
                        />
                      )}

                      <h2 className="text-xl font-semibold mt-3">
                        {item.title}
                      </h2>

                      <p className="mt-2">{item.description}</p>

                      <span className="inline-block mt-3 px-3 py-1 rounded-full text-danger bg-red-100">
                        lost
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <h2 className="text-2xl font-bold mb-4 text-green-600">
                Found Items
              </h2>

              {foundItems.length === 0 ? (
                <p>No found items.</p>
              ) : (
                <div className="grid gap-4">
                  {foundItems.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-3xl p-4 shadow cursor-pointer"
                      onClick={() => navigate(`/items/${item._id}`)}
                    >
                      {item.image && (
                        <img
                          src={`http://localhost:5000/uploads/${item.image}`}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-3xl"
                        />
                      )}

                      <h2 className="text-xl font-semibold mt-3">
                        {item.title}
                      </h2>

                      <p className="mt-2">{item.description}</p>

                      <span className="inline-block mt-3 px-3 py-1 rounded-full text-success bg-green-100">
                        found
                      </span>                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}