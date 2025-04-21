/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUserShield } from "react-icons/fa";
import bgImage from "../assets/mining-bg.jpg";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        { withCredentials: true } // 🔐 send cookies
      );
      toast.success("Logged in successfully!");
      navigate("/admin");
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <FaUserShield className="text-5xl text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="p-2 border rounded w-full focus:ring-2 focus:ring-yellow-500"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            className="p-2 border rounded w-full focus:ring-2 focus:ring-yellow-500"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button
            className={`bg-yellow-500 text-white p-2 rounded w-full transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
