/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaImages,
  FaChartBar,
  FaDatabase,
  FaSignOutAlt,
  FaReply,
} from "react-icons/fa";

const dashboardData = [
  {
    title: "Manage Gallery",
    route: "/admin/manage-gallery",
    icon: <FaImages className="text-[#D9AE4E] text-5xl mb-4" />,
  },
  {
    title: "View Inquiries",
    route: "/admin/inquiries",
    icon: <FaReply className="text-[#D9AE4E] text-5xl mb-4" />,
  },
  {
    title: "Website Analytics",
    route: "/admin/analytics",
    icon: <FaChartBar className="text-[#D9AE4E] text-5xl mb-4" />,
  },
  {
    title: "Backup Database",
    route: "/admin/backup",
    icon: <FaDatabase className="text-[#D9AE4E] text-5xl mb-4" />,
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include", // Send cookies
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="bg-[#FDF9F3] text-[#2B1A0F] min-h-screen flex flex-col items-center p-8 mt-20">
      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-[#D9AE4E] text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Admin Dashboard
      </motion.h1>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
        {dashboardData.map((card, index) => (
          <motion.div
            key={index}
            onClick={() => navigate(card.route)}
            className="bg-white text-[#4B2E1B] border border-[#E8D6BC] p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 180 }}
          >
            {card.icon}
            <h2 className="text-xl font-semibold">{card.title}</h2>
          </motion.div>
        ))}
      </div>

      {/* Logout Button */}
      <motion.div
        className="mt-14"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-md transition-colors duration-300 flex items-center gap-2"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
