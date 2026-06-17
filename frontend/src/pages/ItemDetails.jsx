import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ItemDetails() {

  const { id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {

    try {

      const res =
        await api.get(`/items/${id}`);

      setItem(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!item) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <img
          src={`http://localhost:5000/uploads/${item.image}`}
          alt=""
          className="w-full h-[500px] object-cover"
        />

        <div className="p-8">

          <h1 className="text-4xl font-bold">
            {item.title}
          </h1>

          <p className="text-gray-500 mt-3">
            {item.category}
          </p>

          <p className="mt-6 text-lg">
            {item.description}
          </p>

          <div className="mt-8">

            <span
              className={
                item.status === "lost"
                  ? "bg-red-100 text-red-600 px-4 py-2 rounded-full"
                  : "bg-green-100 text-green-600 px-4 py-2 rounded-full"
              }
            >
              {item.status}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}