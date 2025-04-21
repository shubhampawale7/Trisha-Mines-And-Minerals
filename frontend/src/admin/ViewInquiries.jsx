/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaTrash, FaReply } from "react-icons/fa";
import ReplyModal from "../components/ReplyModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ViewInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const fetchInquiries = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/inquiries");
      const data = await response.json();
      if (Array.isArray(data)) {
        setInquiries(data);
      } else if (Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      } else {
        console.error("Unexpected response format:", data);
        setInquiries([]);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => setDeleteId(id);
  const closeDeleteModal = () => setDeleteId(null);

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/inquiries/${deleteId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.success) {
        fetchInquiries();
        toast.success("Inquiry deleted successfully!");
      } else {
        toast.error("Failed to delete inquiry.");
      }
    } catch (error) {
      toast.error("Error deleting inquiry.");
    } finally {
      closeDeleteModal();
    }
  };

  const handleReplyClick = (email) => {
    setSelectedEmail(email);
    setShowReplyModal(true);
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
        toast.success("Email sent successfully!");
      } else {
        toast.error("Failed to send email.");
      }
    } catch (err) {
      toast.error("Error sending email.");
    } finally {
      setShowReplyModal(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="bg-[#FDF9F3] text-[#2B1A0F] min-h-screen flex flex-col items-center p-8 mt-20">
      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-[#D9AE4E] text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Inquiries
      </motion.h1>

      <p className="text-gray-700 mb-6">
        Total Inquiries:{" "}
        <span className="text-[#D9AE4E] font-semibold">{inquiries.length}</span>
      </p>

      {loading ? (
        <p className="text-gray-500">Loading inquiries...</p>
      ) : inquiries.length === 0 ? (
        <p className="text-gray-500">No inquiries found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl w-full">
          {inquiries.map((inq, index) => (
            <motion.div
              key={inq._id}
              className="bg-white border border-[#E8D6BC] p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <h2 className="text-xl font-bold text-[#4B2E1B]">{inq.name}</h2>
              <p className="text-sm text-gray-600">{inq.email}</p>
              <p className="mt-2 text-gray-800">{inq.message}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(inq.createdAt).toLocaleString()}
              </p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleReplyClick(inq.email)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
                >
                  <FaReply className="mr-2" /> Reply
                </button>
                <button
                  onClick={() => openDeleteModal(inq._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

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
