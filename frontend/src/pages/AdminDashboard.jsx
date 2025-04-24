/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaImages,
  FaDatabase,
  FaSignOutAlt,
  FaReply,
  FaUserCircle,
  FaClock,
  FaUser,
} from "react-icons/fa";

const dashboardData = [
  {
    title: "Manage Gallery",
    route: "/admin/manage-gallery",
    icon: <FaImages className="text-yellow-300 text-4xl" />,
  },
  {
    title: "View Inquiries",
    route: "/admin/inquiries",
    icon: <FaReply className="text-yellow-300 text-4xl" />,
  },
  {
    title: "Backup Database",
    route: "/admin/backup",
    icon: <FaDatabase className="text-yellow-300 text-4xl" />,
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/stats");
        const data = await res.json();
        setStatsData([
          { label: "Total Images", value: data.galleryImages },
          { label: "Inquiries", value: data.inquiries },
          { label: "Total Users", value: data.users },
        ]);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    const fetchActivity = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/admin/recent-activity"
        );
        const data = await res.json();
        const recent = [];

        data.recentInquiries.forEach((inq) =>
          recent.push({
            time: new Date(inq.createdAt).toLocaleString(),
            action: `Inquiry from ${inq.name}`,
            icon: <FaReply />,
          })
        );
        data.recentGallery.forEach((img) =>
          recent.push({
            time: new Date(img.uploadedAt).toLocaleString(),
            action: `Image uploaded: ${img.title}`,
            icon: <FaImages />,
          })
        );
        data.recentUsers.forEach((user) =>
          recent.push({
            time: new Date(user.createdAt).toLocaleString(),
            action: `New user: ${user.name}`,
            icon: <FaUser />,
          })
        );

        setRecentActivity(recent.slice(0, 6)); // Limit to 6 items
      } catch (err) {
        console.error("Failed to fetch recent activity:", err);
      }
    };

    fetchStats();
    fetchActivity();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6E0] to-[#F1E4C3] px-6 py-10 pt-25">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-6 mb-10">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <FaUserCircle className="text-5xl text-yellow-500" />
          <div>
            <h2 className="text-2xl font-bold text-[#3a2a16]">
              Welcome back, Admin!
            </h2>
            <p className="text-sm text-[#4a3a25]">
              Here’s your latest updates.
            </p>
          </div>
        </motion.div>
        <motion.button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <FaSignOutAlt />
          Logout
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {statsData.map((stat, i) => (
          <motion.div
            key={i}
            className="backdrop-blur-md bg-white/30 p-5 rounded-xl shadow-md text-center border border-white/40"
            whileHover={{ scale: 1.03 }}
          >
            <p className="text-xl font-bold text-[#3a2a16]">{stat.value}</p>
            <p className="text-sm text-[#5f4631]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Dashboard + Recent */}
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {dashboardData.map((card, idx) => (
            <motion.div
              key={idx}
              onClick={() => navigate(card.route)}
              className="backdrop-blur-lg bg-white/30 p-6 rounded-2xl shadow-lg border border-white/40 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-center text-center transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 180 }}
            >
              <div className="mb-4">{card.icon}</div>
              <h2 className="text-lg font-semibold text-[#3a2a16]">
                {card.title}
              </h2>
            </motion.div>
          ))}
        </div>

        {/* Activity */}
        <div className="bg-white/40 backdrop-blur-md border border-white/30 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-[#3a2a16] mb-4 flex items-center gap-2">
            <FaClock className="text-yellow-400" />
            Recent Activity
          </h3>
          <ul className="space-y-4">
            {recentActivity.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[#4f3b25]">
                <div className="text-yellow-500 mt-1">{item.icon}</div>
                <div>
                  <p className="text-sm font-medium">{item.action}</p>
                  <span className="text-xs text-[#7d6a52]">{item.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
