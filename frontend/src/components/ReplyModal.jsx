/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "sonner"; // ✅ Use Sonner instead of react-toastify
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMessageCircle, FiCheckCircle } from "react-icons/fi";
import loaderAnimation from "../assets/animations/loader.json";
import successAnimation from "../assets/animations/success.json";

const getInitials = (email) => email?.charAt(0).toUpperCase();

const ReplyModal = ({ isOpen, onClose, onSend, email }) => {
  const [subject, setSubject] = useState("Regarding your inquiry");
  const [message, setMessage] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleConfirmation = () => {
    if (!subject.trim() || !message.trim()) {
      toast.error("Subject and message cannot be empty!");
      return;
    }
    setConfirming(true);
  };

  const handleSend = async () => {
    setLoading(true);
    try {
      await onSend({ email, subject, message });
      setSent(true);

      toast.success(`Reply sent to ${email}`);

      setTimeout(() => {
        setSent(false);
        onClose();
      }, 2000);
    } catch (error) {
      toast.error("Failed to send email.");
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg text-gray-800 relative border border-purple-200"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
              {getInitials(email)}
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-center mb-4 text-purple-600">
            Reply to <span className="text-pink-600">{email}</span>
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-6">
              <Lottie animationData={loaderAnimation} style={{ height: 140 }} />
              <p className="text-sm mt-2 text-gray-600">Sending email...</p>
            </div>
          ) : sent ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <Lottie
                animationData={successAnimation}
                style={{ height: 120 }}
              />
              <p className="text-lg font-medium text-green-600">
                Email sent successfully!
              </p>
            </div>
          ) : confirming ? (
            <div className="text-center space-y-5">
              <FiCheckCircle size={40} className="text-green-500 mx-auto" />
              <p className="text-base">
                Are you sure you want to send this reply?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setConfirming(false)}
                  className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold"
                >
                  Confirm & Send
                </button>
              </div>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirmation();
              }}
            >
              <div className="relative">
                <FiMail className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="peer w-full pl-10 pt-5 pb-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-transparent"
                  placeholder="Subject"
                />
                <label className="absolute left-10 top-2 text-xs text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all">
                  Subject
                </label>
              </div>

              <div className="relative">
                <FiMessageCircle className="absolute left-3 top-4 text-gray-400" />
                <textarea
                  rows="6"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="peer w-full pl-10 pt-5 pb-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-transparent"
                  placeholder="Your message"
                ></textarea>
                <label className="absolute left-10 top-2 text-xs text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all">
                  Message
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 text-white font-semibold flex items-center gap-2"
                >
                  <FiMail /> Send
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReplyModal;
