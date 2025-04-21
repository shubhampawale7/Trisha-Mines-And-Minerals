/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { saveAs } from "file-saver";
import Flag from "react-world-flags";
import "react-datepicker/dist/react-datepicker.css";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";

const COLORS = [
  "#34d399",
  "#f59e0b",
  "#ef4444",
  "#6366f1",
  "#10b981",
  "#eab308",
];

const countryCodeFromLocation = (location) => {
  if (!location || location === "Unknown") return null;
  const match = location.match(/\b([A-Z]{2})\b/);
  return match ? match[1] : null;
};

const Analytics = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (startDate) query.append("start", startDate);
      if (endDate) query.append("end", endDate);

      const res = await fetch(
        `http://localhost:5000/api/analytics/stats?${query.toString()}`
      );
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const csv = [
      [
        "Page",
        "Visits",
        "Avg Time Spent",
        "Location",
        "Is Returning",
        "Timestamp",
      ],
      ...stats.map((d) =>
        [
          d.page,
          d.visits,
          d.avgTimeSpent,
          d.location,
          d.isReturning ? "Yes" : "No",
          new Date(d.timestamp).toLocaleString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "analytics.csv");
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const flagStyle = {
    width: "24px",
    height: "16px",
    marginLeft: "8px",
    display: "inline-block",
    verticalAlign: "middle",
  };

  const getDailyTrendData = () => {
    const trends = {};
    stats.forEach((d) => {
      const date = new Date(d.timestamp).toLocaleDateString();
      trends[date] = (trends[date] || 0) + 1;
    });
    return Object.entries(trends).map(([date, count]) => ({
      date,
      visits: count,
    }));
  };

  return (
    <motion.div
      className="min-h-screen bg-[#FDF9F3] text-white px-6 md:px-20 py-12 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-extrabold text-[#D9AE4E] mb-10 tracking-wide text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Advanced Web Analytics
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-10 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <input
          type="date"
          value={startDate || ""}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 rounded-md bg-[#1C1C1C] text-white border border-[#D9AE4E] focus:outline-none focus:ring-2 focus:ring-[#D9AE4E]"
        />
        <input
          type="date"
          value={endDate || ""}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 rounded-md bg-[#1C1C1C] text-white border border-[#D9AE4E] focus:outline-none focus:ring-2 focus:ring-[#D9AE4E]"
        />
        <button
          onClick={fetchAnalytics}
          className="bg-[#D9AE4E] text-black font-bold px-5 py-2 rounded hover:bg-[#c99d42] transition"
        >
          Apply Filter
        </button>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <BeatLoader color="#D9AE4E" />
        </div>
      ) : stats.length === 0 ? (
        <p className="text-gray-400 text-center">No analytics data found.</p>
      ) : (
        <>
          <motion.button
            onClick={exportToCSV}
            className="mb-8 px-5 py-2 bg-[#D9AE4E] text-black font-bold rounded hover:bg-[#c99d42] transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Export to CSV
          </motion.button>

          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {stats.map((entry, idx) => (
              <motion.div
                key={idx}
                className="bg-[#1C1C1C] p-6 rounded-lg border border-[#2A2A2A] shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-semibold text-[#D9AE4E] mb-2">
                  {entry.page}
                </h2>
                <p>
                  <strong>Visits:</strong> {entry.visits}
                </p>
                <p>
                  <strong>Avg Time Spent:</strong> {entry.avgTimeSpent}s
                </p>
                <p>
                  <strong>Location:</strong> {entry.location || "Unknown"}{" "}
                  {countryCodeFromLocation(entry.location) && (
                    <Flag
                      code={countryCodeFromLocation(entry.location)}
                      style={flagStyle}
                    />
                  )}
                </p>
                <p>
                  <strong>Returning:</strong> {entry.isReturning ? "Yes" : "No"}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-[#D9AE4E] mb-4">
              Page Visits (Bar Chart)
            </h2>
            <div className="h-64 bg-[#1C1C1C] p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="page" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Bar dataKey="visits" fill="#D9AE4E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Line Chart */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-[#D9AE4E] mb-4">
              Daily Trends (Line Chart)
            </h2>
            <div className="h-64 bg-[#1C1C1C] p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getDailyTrendData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Line type="monotone" dataKey="visits" stroke="#34d399" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            className="h-64 bg-[#1C1C1C] p-4 rounded-lg mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-[#D9AE4E] mb-4">
              New vs Returning (Pie Chart)
            </h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "New",
                      value: stats.filter((d) => !d.isReturning).length,
                    },
                    {
                      name: "Returning",
                      value: stats.filter((d) => d.isReturning).length,
                    },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Map View */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-[#D9AE4E] mb-4">
              Visitor Locations (Map)
            </h2>
            <div className="h-96 bg-[#1C1C1C] rounded-lg overflow-hidden">
              <MapContainer
                center={[20, 77]}
                zoom={2}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {stats.map(
                  (entry, idx) =>
                    entry.lat &&
                    entry.lng && (
                      <Marker key={idx} position={[entry.lat, entry.lng]}>
                        <Popup>
                          <strong>{entry.page}</strong>
                          <br />
                          {entry.location}
                        </Popup>
                      </Marker>
                    )
                )}
              </MapContainer>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Analytics;
