import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post(
        "/auth/login",
        form
      );

      login(res.data.token);

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
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

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            {loading ? "Loading..." : "Login"}
          </button>

        </form>

        <p className="mt-5 text-center">
          No Account?
          <Link
            to="/register"
            className="text-blue-600 ml-2"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}