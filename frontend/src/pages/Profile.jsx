import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-xl p-8">
        <div className="flex items-center gap-6">
          <img
            src="https://ui-avatars.com/api/?name=User"
            alt=""
            className="w-24 h-24 rounded-full"
          />

          <div>
            <h2 className="text-3xl font-bold">
              User Profile
            </h2>

            <p className="text-gray-500">
              Logged In User
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="border-b py-4">
            <p className="font-semibold">Account Status</p>
            <p className="text-green-600">
              Active
            </p>
          </div>

          <div className="border-b py-4">
            <p className="font-semibold">
              Authentication
            </p>
            <p className="text-gray-500">
              JWT Protected
            </p>
          </div>

          <div className="py-4">
            <button
              onClick={logout}
              className="bg-red-600 text-white px-5 py-3 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}