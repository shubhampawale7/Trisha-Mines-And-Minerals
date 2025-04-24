/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  FaTrashAlt,
  FaReply,
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaTh,
  FaList,
  FaCompressArrowsAlt,
  FaExpandArrowsAlt,
  FaSortAlphaDown,
  FaSortAlphaUpAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import ReplyModal from "../components/ReplyModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { toast } from "sonner";
import Papa from "papaparse";

const ITEMS_PER_PAGE = 6;

const ViewInquiries = () => {
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [compactView, setCompactView] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const fetchInquiries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/inquiries");
      const data = await res.json();
      const inqs = Array.isArray(data) ? data : data.inquiries || [];
      setInquiries(inqs);
      filterInquiries(search, statusFilter, inqs);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    const sorted = [...filteredInquiries].sort((a, b) => {
      if (key === "createdAt") {
        return direction === "asc"
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      const valA = a[key]?.toString().toLowerCase() || "";
      const valB = b[key]?.toString().toLowerCase() || "";
      return direction === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
    setFilteredInquiries(sorted);
  };

  const filterInquiries = (text, status = "All", list = inquiries) => {
    setSearch(text);
    let filtered = list.filter(
      (inq) =>
        (inq.name.toLowerCase().includes(text.toLowerCase()) ||
          inq.email.toLowerCase().includes(text.toLowerCase()) ||
          inq.message.toLowerCase().includes(text.toLowerCase())) &&
        (status === "All" || inq.status === status)
    );
    setFilteredInquiries(filtered);
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(filteredInquiries);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inquiries.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredInquiries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredInquiries.length / ITEMS_PER_PAGE);

  const handleReplyClick = (email) => {
    setSelectedEmail(email);
    setShowReplyModal(true);
  };

  const openDeleteModal = (id) => setDeleteId(id);
  const closeDeleteModal = () => setDeleteId(null);

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/inquiries/${deleteId}`,
        { method: "DELETE" }
      );
      const result = await res.json();
      if (result.success) {
        toast.success("Inquiry deleted successfully.");
        fetchInquiries();
      } else {
        toast.error("Failed to delete inquiry.");
      }
    } catch (err) {
      toast.error("Error deleting inquiry.");
    } finally {
      closeDeleteModal();
    }
  };

  const handleSendMail = async ({ email, subject, message }) => {
    try {
      const res = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Email sent successfully.");
      } else {
        toast.error("Failed to send email.");
      }
    } catch (err) {
      toast.error("Error sending email.");
    } finally {
      setShowReplyModal(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Replied" ? "New" : "Replied";
    try {
      const res = await fetch(
        `http://localhost:5000/api/inquiries/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(`Marked as ${newStatus}.`);
        fetchInquiries();
      } else {
        toast.error("Failed to update status.");
      }
    } catch (err) {
      toast.error("Error updating status.");
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF8EE] py-16 px-6 mt-10">
      <motion.h1
        className="text-4xl font-bold text-center text-[#B7791F] mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📬 Inquiry Management
      </motion.h1>
      <p className="text-center text-gray-600 mb-6">
        Manage, reply, and sort user inquiries here.
      </p>

      {/* Filters & View Toggles */}
      <div className="flex flex-wrap justify-between gap-4 max-w-6xl mx-auto mb-6 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute top-3.5 left-4 text-[#D4A94D]" />
          <input
            type="text"
            value={search}
            onChange={(e) => filterInquiries(e.target.value, statusFilter)}
            placeholder="Advanced search (name, email, message)..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-yellow-300 shadow bg-white focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => filterInquiries(search, e.target.value)}
          className="py-3 px-4 border rounded-xl bg-white text-gray-700 shadow-sm"
        >
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="Replied">Replied</option>
        </select>

        <button
          onClick={handleExportCSV}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl shadow-md flex items-center gap-2"
        >
          <FaDownload /> Export CSV
        </button>

        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-3 rounded-full ${
              viewMode === "grid"
                ? "bg-yellow-500 text-white"
                : "bg-white text-yellow-500 border"
            }`}
            title="Grid View"
          >
            <FaTh />
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`p-3 rounded-full ${
              viewMode === "list"
                ? "bg-yellow-500 text-white"
                : "bg-white text-yellow-500 border"
            }`}
            title="List View"
          >
            <FaList />
          </button>
          <button
            onClick={() => setCompactView(!compactView)}
            className="p-3 rounded-full bg-white text-yellow-500 border"
            title="Toggle Compact View"
          >
            {compactView ? <FaExpandArrowsAlt /> : <FaCompressArrowsAlt />}
          </button>
        </div>
      </div>

      {/* Column Headers for Sorting (only visible in list view) */}
      {viewMode === "list" && !loading && currentItems.length > 0 && (
        <div className="max-w-7xl mx-auto grid grid-cols-1">
          <div className="grid grid-cols-5 bg-yellow-50 rounded-t-xl px-4 py-3 text-sm font-semibold text-yellow-700">
            {["name", "email", "message", "createdAt", "status"].map((col) => (
              <button
                key={col}
                onClick={() => handleSort(col)}
                className="text-left flex items-center gap-1"
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}
                {sortConfig.key === col &&
                  (sortConfig.direction === "asc" ? (
                    <FaSortAlphaDown />
                  ) : (
                    <FaSortAlphaUpAlt />
                  ))}
              </button>
            ))}
          </div>
        </div>
      )}

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {currentItems.map((inq, idx) => (
            <motion.div
              key={inq._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-white border border-yellow-100 rounded-xl p-5 shadow-md hover:shadow-xl transition cursor-pointer ${
                compactView ? "text-sm py-3 px-4" : ""
              }`}
            >
              <div>
                <h3 className="font-semibold text-[#3D280D]">{inq.name}</h3>
                <p className="text-sm text-gray-600">{inq.email}</p>
                <div className="text-gray-700 mt-2">
                  <p
                    className={`${
                      expandedMessageId === inq._id ? "" : "line-clamp-2"
                    }`}
                  >
                    {inq.message}
                  </p>
                  {inq.message.length > 100 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedMessageId(
                          expandedMessageId === inq._id ? null : inq._id
                        );
                      }}
                      className="text-blue-600 text-xs mt-1 hover:underline"
                    >
                      {expandedMessageId === inq._id
                        ? "Show less"
                        : "Read more"}
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(inq.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStatus(inq._id, inq.status);
                  }}
                  className={`flex items-center gap-2 mt-2 px-3 py-1 text-xs rounded-full font-medium transition ${
                    inq.status === "Replied"
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  }`}
                >
                  {inq.status === "Replied" ? <FaCheckCircle /> : <FaClock />}
                  {inq.status || "New"} (Click to toggle)
                </button>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReplyClick(inq.email);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md flex items-center"
                >
                  <FaReply className="mr-2" /> Reply
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteModal(inq._id);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md flex items-center"
                >
                  <FaTrashAlt className="mr-2" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {/* Inquiry Cards */}
      {loading ? (
        <p className="text-center text-gray-500">Loading inquiries...</p>
      ) : currentItems.length === 0 ? (
        <p className="text-center text-gray-400">No inquiries found.</p>
      ) : viewMode === "list" ? (
        <div className="overflow-x-auto rounded-xl shadow max-w-7xl mx-auto">
          <table className="w-full table-auto bg-white border border-yellow-200">
            <thead className="bg-yellow-50 text-yellow-700">
              <tr className="text-left text-sm">
                {["Name", "Email", "Message", "Date", "Status", "Actions"].map(
                  (header, idx) => (
                    <th
                      key={idx}
                      className="py-3 px-4 cursor-pointer whitespace-nowrap"
                      onClick={() =>
                        handleSort(
                          header.toLowerCase() === "date"
                            ? "createdAt"
                            : header.toLowerCase()
                        )
                      }
                    >
                      <div className="flex items-center gap-1">
                        {header}
                        {sortConfig.key ===
                          (header.toLowerCase() === "date"
                            ? "createdAt"
                            : header.toLowerCase()) &&
                          (sortConfig.direction === "asc" ? (
                            <FaSortAlphaDown />
                          ) : (
                            <FaSortAlphaUpAlt />
                          ))}
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((inq, idx) => (
                <tr
                  key={inq._id}
                  className="border-t text-sm hover:bg-yellow-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-[#3D280D]">
                    {inq.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{inq.email}</td>
                  <td className="px-4 py-3 text-gray-700 max-w-xs">
                    <div
                      className={
                        expandedMessageId === inq._id ? "" : "line-clamp-2"
                      }
                    >
                      {inq.message}
                    </div>
                    <button
                      onClick={() =>
                        setExpandedMessageId(
                          expandedMessageId === inq._id ? null : inq._id
                        )
                      }
                      className="text-blue-600 text-xs mt-1 hover:underline"
                    >
                      {expandedMessageId === inq._id
                        ? "Show less"
                        : "Read more"}
                    </button>
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-500">
                    {new Date(inq.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(inq._id, inq.status)}
                      className={`flex items-center gap-2 text-xs px-3 py-1 rounded-full font-medium ${
                        inq.status === "Replied"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {inq.status === "Replied" ? (
                        <FaCheckCircle />
                      ) : (
                        <FaClock />
                      )}
                      {inq.status || "New"}
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReplyClick(inq.email)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm flex items-center"
                      >
                        <FaReply className="mr-1" /> Reply
                      </button>
                      <button
                        onClick={() => openDeleteModal(inq._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm flex items-center"
                      >
                        <FaTrashAlt className="mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // <div
        //   className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto`}
        // >
        //   {currentItems.map((inq, idx) => (
        //     <motion.div
        //       key={inq._id}
        //       onClick={() => handleReplyClick(inq.email)}
        //       initial={{ opacity: 0, y: 20 }}
        //       animate={{ opacity: 1, y: 0 }}
        //       transition={{ delay: idx * 0.05 }}
        //       className={`bg-white border border-yellow-100 rounded-xl p-5 shadow-md hover:shadow-xl transition cursor-pointer ${
        //         compactView ? "text-sm py-3 px-4" : ""
        //       }`}
        //     >
        //       <div>
        //         <h3 className="font-semibold text-[#3D280D]">{inq.name}</h3>
        //         <p className="text-sm text-gray-600">{inq.email}</p>
        //         <p className="text-gray-700 mt-2 line-clamp-2">{inq.message}</p>
        //         <p className="text-xs text-gray-500 mt-2">
        //           {new Date(inq.createdAt).toLocaleString()}
        //         </p>
        //         <button
        //           onClick={(e) => {
        //             e.stopPropagation();
        //             toggleStatus(inq._id, inq.status);
        //           }}
        //           className={`flex items-center gap-2 mt-2 px-3 py-1 text-xs rounded-full font-medium transition ${
        //             inq.status === "Replied"
        //               ? "bg-green-100 text-green-700 hover:bg-green-200"
        //               : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
        //           }`}
        //         >
        //           {inq.status === "Replied" ? <FaCheckCircle /> : <FaClock />}
        //           {inq.status || "New"} (Click to toggle)
        //         </button>
        //       </div>
        //       <div className="flex justify-end gap-2 mt-4">
        //         <button
        //           onClick={(e) => {
        //             e.stopPropagation();
        //             handleReplyClick(inq.email);
        //           }}
        //           className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md flex items-center"
        //         >
        //           <FaReply className="mr-2" /> Reply
        //         </button>
        //         <button
        //           onClick={(e) => {
        //             e.stopPropagation();
        //             openDeleteModal(inq._id);
        //           }}
        //           className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md flex items-center"
        //         >
        //           <FaTrashAlt className="mr-2" /> Delete
        //         </button>
        //       </div>
        //     </motion.div>
        //   ))}
        // </div>
        <div></div>
      )}

      {/* Pagination */}
      <div className="mt-10 flex justify-center items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === i + 1
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <ReplyModal
        isOpen={showReplyModal}
        onClose={() => setShowReplyModal(false)}
        onSend={handleSendMail}
        email={selectedEmail}
      />

      {deleteId && (
        <ConfirmationModal
          isOpen={true}
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this inquiry?"
        />
      )}
    </div>
  );
};

export default ViewInquiries;
