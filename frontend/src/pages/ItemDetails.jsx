import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [matches, setMatches] = useState([]);

  const fetchItem = async () => {
    try {
      const res = await api.get(`/items/${id}`);
      setItem(res.data || null);
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
      }
    };

    fetchData();
  }, [id]);

  if (!item) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={`http://localhost:5000/uploads/${item.image}`}
          alt={item.title}
          className="w-full rounded-xl"
        />

        <div>
          <h1 className="text-4xl font-bold">
            {item.title}
          </h1>

          <p className="mt-4">
            {item.description}
          </p>

          <div className="mt-4">
            Category: {item.category}
          </div>

          <div>
            Status: {item.status}
          </div>

          <div>
            Location: {item.location}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">
          Possible Matches
        </h2>

        {matches.length === 0 && (
          <div>No Match Found</div>
        )}

        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match._id}
              className="border p-4 rounded-xl"
            >
              <div>
                Match Score: {match.score}%
              </div>

              <div>
                Status: {match.status}
              </div>

              {/* Optional: show matched item details if available */}
              {match.item && (
                <div className="mt-2">
                  <div>
                    Item: {match.item.title}
                  </div>
                  <div>
                    Category: {match.item.category}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}