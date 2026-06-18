import { useState } from "react";
import ItemTable from "./ItemsTable";

export default function ItemsTable({
  items = [],
  onDelete,
  onView,
  onEdit
}) {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) =>
    item.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 gap-3">

        <h2 className="text-xl font-semibold">
          Manage Items
        </h2>

        <input
          type="text"
          placeholder="Search item..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            border
            rounded-lg
            px-4
            py-2
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-gray-100 text-left">

              <th className="p-3">Image</th>

              <th className="p-3">Title</th>

              <th className="p-3">Category</th>

              <th className="p-3">Status</th>

              <th className="p-3">Location</th>

              <th className="p-3">Reported By</th>

              <th className="p-3">Created</th>

              <th className="p-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredItems.length === 0 ? (
              <tr>

                <td
                  colSpan="8"
                  className="
                    text-center
                    py-8
                    text-gray-500
                  "
                >
                  No Items Found
                </td>

              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr
                  key={item._id}
                  className="
                    border-b
                    hover:bg-gray-50
                  "
                >

                  <td className="p-3">

                    <img
                      src={
                        item.image
                          ? `http://localhost:5000/uploads/${item.image}`
                          : "https://via.placeholder.com/60"
                      }
                      alt={item.title}
                      className="
                        w-14
                        h-14
                        rounded
                        object-cover
                      "
                    />

                  </td>

                  <td className="p-3 font-medium">
                    {item.title}
                  </td>

                  <td className="p-3">
                    {item.category}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        item.status === "lost"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="p-3">
                    {item.location || "-"}
                  </td>

                  <td className="p-3">
                    {item.userId?.name ||
                      "Unknown"}
                  </td>

                  <td className="p-3">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">

                    <div className="flex gap-2 justify-center">

                      <button
                        onClick={() =>
                          onView &&
                          onView(item)
                        }
                        className="
                          bg-blue-500
                          text-white
                          px-3
                          py-1
                          rounded
                          hover:bg-blue-600
                        "
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          onEdit &&
                          onEdit(item)
                        }
                        className="
                          bg-yellow-500
                          text-white
                          px-3
                          py-1
                          rounded
                          hover:bg-yellow-600
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Delete this item?"
                            )
                          ) {
                            onDelete &&
                              onDelete(
                                item._id
                              );
                          }
                        }}
                        className="
                          bg-red-500
                          text-white
                          px-3
                          py-1
                          rounded
                          hover:bg-red-600
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}