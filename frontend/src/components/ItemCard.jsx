import { Link } from "react-router-dom";
import api from "../api/axios";

export default function ItemCard({
  item,
  onDelete
}) {

  const handleDelete = async () => {

    const confirmDelete =
      window.confirm(
        "Delete this item?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/items/${item._id}`
      );

      if (onDelete) {
        onDelete(item._id);
      }

      alert("Item Deleted");

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <img
        src={`http://localhost:5000/uploads/${item.image}`}
        alt=""
        className="w-full h-60 object-cover"
      />

      <div className="p-5">

        <h3 className="font-bold text-xl mb-2">
          {item.title}
        </h3>

        <p className="text-gray-600">
          {item.description}
        </p>

        <div className="flex justify-between mt-5">

          <span
            className={
              item.status === "lost"
                ? "bg-red-100 text-red-600 px-3 py-1 rounded-full"
                : "bg-green-100 text-green-600 px-3 py-1 rounded-full"
            }
          >
            {item.status}
          </span>

        </div>

        <div className="flex gap-3 mt-4">

          <Link
            to={`/item/${item._id}`}
            className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded"
          >
            View
          </Link>

          <button
            onClick={handleDelete}
            className="
            bg-red-600
            text-white
            px-4
            py-2
            rounded"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}