import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/auth/register",
        form
      );

      alert("Registration Successful");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Register
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            placeholder="Name"
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button className="w-full bg-green-600 text-white p-3 rounded">
            Register
          </button>

        </form>

        <p className="mt-5 text-center">
          Already Registered?
          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}