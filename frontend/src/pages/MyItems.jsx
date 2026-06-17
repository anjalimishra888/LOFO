import { useEffect, useState } from "react";
import api from "../api/axios";
import ItemCard from "../components/ItemCard";

export default function MyItems() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {

    try {

      const res = await api.get(
        "/items/my-items"
      );

      setItems(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const removeItem = (id) => {

    setItems(
      items.filter(
        (item) => item._id !== id
      )
    );

  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        My Items
      </h1>

      {items.length === 0 ? (
        <div className="text-center text-gray-500">
          No Items Found
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onDelete={removeItem}
            />
          ))}

        </div>
      )}

    </div>
  );
}