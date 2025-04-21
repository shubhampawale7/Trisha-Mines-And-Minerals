/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/animations/loader.json";

const ReplyModal = ({ isOpen, onClose, onSend, email }) => {
  const [subject, setSubject] = useState("Regarding your inquiry");
  const [message, setMessage] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirmation = () => {
    if (!subject || !message) {
      toast.error("Subject and message cannot be empty!");
      return;
    }
    setConfirming(true);
  };

  const handleSend = async () => {
    setLoading(true);
    try {
      await onSend({ email, subject, message });
      toast.success("Email sent successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to send email.");
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black relative">
        <h2 className="text-xl font-bold mb-4">Reply to {email}</h2>

        {loading ? (
          <div className="text-center py-6">
            <Lottie animationData={loaderAnimation} style={{ height: 150 }} />
            <p className="mt-3 text-gray-700 font-medium">Sending email...</p>
          </div>
        ) : confirming ? (
          <>
            <p className="mb-4">Are you sure you want to send this reply?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirming(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Confirm & Send
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleConfirmation();
            }}
          >
            <input
              type="text"
              className="w-full p-2 mb-3 border rounded"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            />
            <textarea
              className="w-full p-2 mb-3 border rounded"
              rows="6"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Send
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReplyModal;
