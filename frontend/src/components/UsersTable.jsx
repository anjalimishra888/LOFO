// src/components/UsersTable.jsx

import { useState } from "react";

export default function UsersTable({
  users = [],
  onDeleteUser,
  onChangeRole
}) {
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      setLoadingId(id);

      if (onDeleteUser) {
        await onDeleteUser(id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleRoleChange = async (
    userId,
    role
  ) => {
    try {
      if (onChangeRole) {
        await onChangeRole(
          userId,
          role
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!users.length) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Users
        </h2>

        <p className="text-gray-500">
          No users found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-5 border-b">
        <h2 className="text-xl font-semibold">
          Users Management
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-5 py-4">
                #
              </th>

              <th className="px-5 py-4">
                Name
              </th>

              <th className="px-5 py-4">
                Email
              </th>

              <th className="px-5 py-4">
                Role
              </th>

              <th className="px-5 py-4">
                Joined
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map(
              (user, index) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    {index + 1}
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {user.name}
                  </td>

                  <td className="px-5 py-4">
                    {user.email}
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={
                        user.role
                      }
                      onChange={(
                        e
                      ) =>
                        handleRoleChange(
                          user._id,
                          e.target
                            .value
                        )
                      }
                      className="
                        border
                        rounded-lg
                        px-3
                        py-2
                        outline-none
                      "
                    >
                      <option value="user">
                        User
                      </option>

                      <option value="admin">
                        Admin
                      </option>
                    </select>
                  </td>

                  <td className="px-5 py-4">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          handleDelete(
                            user._id
                          )
                        }
                        disabled={
                          loadingId ===
                          user._id
                        }
                        className="
                          bg-red-600
                          hover:bg-red-700
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          disabled:opacity-50
                        "
                      >
                        {loadingId ===
                        user._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}