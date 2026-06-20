import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItem = async () => {
    try {
      const res = await api.get(`/items/${id}`);
      setItem(res.data.item || null);
    } catch (error) {
      console.log("Error fetching item:", error);
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await api.get(`/matches/item/${id}`);
      setMatches(res.data || []);
    } catch (error) {
      console.log("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchItem(),
          fetchMatches(),
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 flex items-center justify-center px-4 py-10">
        <div className="max-w-md mx-auto rounded-[32px] bg-slate-950/80 border border-white/10 p-8 shadow-2xl shadow-slate-950/50 text-center">
          <div className="text-3xl mb-4">⏳</div>
          <p className="text-slate-300">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 flex items-center justify-center px-4 py-10">
        <div className="max-w-md mx-auto rounded-[32px] bg-slate-950/80 border border-white/10 p-8 shadow-2xl shadow-slate-950/50 text-center">
          <div className="text-3xl mb-4">🚫</div>
          <p className="text-slate-300">Item not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden px-4 pb-28 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow">
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.title}
            className="w-full rounded-3xl"
          />

          <div className="mt-6">
            <h1 className="text-3xl font-bold">{item.title}</h1>

            <p className="mt-4 text-gray-700">{item.description}</p>

            <div className="mt-4 text-sm text-gray-600 space-y-2">
              <div>Category: {item.category}</div>
              <div>Type: {item.itemType || item.status}</div>
              <div>Status: {item.itemStatus || "open"}</div>
              <div>Location: {item.location || "N/A"}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h2 className="text-2xl font-bold mb-4">Possible Matches</h2>

          {matches.length === 0 ? (
            <div>No Match Found</div>
          ) : (
            <div className="grid gap-4">
              {matches.map((match) => (
                <div
                  key={match._id}
                  className="border p-4 rounded-3xl"
                >
                  <div className="font-semibold">
                    Match Score: {match.score}%
                  </div>

                  <div className="mt-2">Status: {match.status}</div>

                  {match.item && (
                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      <div>Item: {match.item.title}</div>
                      <div>Category: {match.item.category}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}