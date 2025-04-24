/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserShield,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedUsername = localStorage.getItem("adminRememberedUsername");
    if (rememberedUsername) {
      setForm((prev) => ({ ...prev, username: rememberedUsername }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/login", form, {
        withCredentials: true,
      });
      toast.success("Logged in successfully!");
      if (rememberMe) {
        localStorage.setItem("adminRememberedUsername", form.username);
      } else {
        localStorage.removeItem("adminRememberedUsername");
      }
      navigate("/admin");
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-[#FFF6E0] to-[#F1E4C3] px-4 overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full animate-pulse-slow bg-[radial-gradient(circle_at_20%_30%,rgba(255,237,160,0.4)_0%,transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,215,100,0.2)_0%,transparent_40%)]" />
      </div>

      <motion.div
        className="relative z-10 backdrop-blur-md bg-white/30 border border-white/40 p-8 rounded-2xl shadow-xl max-w-sm w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center mb-4">
          <FaUserShield className="text-5xl text-yellow-500 mb-2" />
          <h2 className="text-2xl font-bold text-[#3a2a16] tracking-wide">
            Admin Login
          </h2>
          <p className="text-sm text-gray-700 text-center mt-1">
            Authorized access only. Please enter your credentials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Username */}
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-yellow-500" />
            <input
              id="username"
              type="text"
              name="username"
              required
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              className="pl-10 pr-4 py-2 w-full rounded-md border border-yellow-200 bg-white/60 focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              placeholder="Username"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-yellow-500" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="pl-10 pr-10 py-2 w-full rounded-md border border-yellow-200 bg-white/60 focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              placeholder="Password"
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-yellow-500 focus:outline-none"
              whileTap={{ scale: 0.8 }}
            >
              <AnimatePresence mode="wait">
                {showPassword ? (
                  <motion.span
                    key="hide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaEyeSlash />
                  </motion.span>
                ) : (
                  <motion.span
                    key="show"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaEye />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Remember Me */}
          <div className="flex items-center text-sm">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-yellow-500"
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md bg-yellow-500 text-white font-semibold shadow-md transition ${
              loading
                ? "opacity-50 cursor-not-allowed animate-pulse"
                : "hover:bg-yellow-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-gray-600">
          “With great access comes great responsibility.”
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
