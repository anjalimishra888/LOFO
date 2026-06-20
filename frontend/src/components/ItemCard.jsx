import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ItemCard({ item, onDelete }) {

  const navigate = useNavigate();

  const handleDelete = async (e) => {

    e.stopPropagation();

    const confirmDelete =
      window.confirm("Delete this item?");

    if (!confirmDelete) return;

    try {

      await api.delete(`/items/${item._id}`);

      if (onDelete) {
        onDelete(item._id);
      }

      alert("Item Deleted");

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }
  };

  const typeBadge = item.itemType === "found" ? {
    label: "Found",
    bg: "bg-emerald-100 text-emerald-700",
    ring: "ring-emerald-200"
  } : {
    label: "Lost",
    bg: "bg-rose-100 text-rose-700",
    ring: "ring-rose-200"
  };

  return (
    <div
      onClick={() => navigate(`/items/${item._id}`)}
      className="relative bg-white rounded-3xl shadow-[0_25px_60px_-35px_rgba(15,23,42,0.35)] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${typeBadge.bg} ${typeBadge.ring}`}>
        {typeBadge.label}
      </div>

      {item.image ? (
        <img
          src={`http://localhost:5000/uploads/${item.image}`}
          alt={item.title}
          className="w-full h-60 object-cover"
        />
      ) : (
        <div className="w-full h-60 bg-slate-200 flex items-center justify-center text-slate-500">
          No image available
        </div>
      )}

      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-2xl text-slate-900">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-500 leading-6 line-clamp-3">{item.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs uppercase tracking-[0.12em]">
            {item.category}
          </span>
          <span className={item.itemStatus === "resolved" ? "rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs uppercase tracking-[0.12em]" : item.itemStatus === "pending" ? "rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs uppercase tracking-[0.12em]" : "rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs uppercase tracking-[0.12em]"}>
            {item.itemStatus || "open"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Link
            to={`/items/${item._id}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-5 py-3 text-sm font-semibold transition hover:bg-slate-800"
          >
            View Details
          </Link>

          <button
            onClick={handleDelete}
            className="inline-flex items-center justify-center rounded-full bg-rose-600 text-white px-5 py-3 text-sm font-semibold transition hover:bg-rose-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}