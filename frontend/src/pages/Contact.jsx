/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../components/ConfirmationModal";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [pendingSubmission, setPendingSubmission] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setPendingSubmission(true);
    setShowModal(true);
  };

  const submitInquiry = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success || response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Try again!");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Error connecting to the server!");
    } finally {
      setShowModal(false);
      setPendingSubmission(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#fef6e4] to-[#fde2ff] min-h-screen px-6 py-20 flex flex-col items-center text-[#3b2f2f] mt-8">
      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-14 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#ff758c] to-[#ff7eb3] drop-shadow-xl"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Let’s Connect
      </motion.h1>

      <motion.div
        className="grid md:grid-cols-3 gap-10 w-full max-w-6xl mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[
          {
            icon: <FaPhoneAlt />,
            title: "Call Us",
            value: ["+91 9011523456", "+91 9011623456"],
            href: ["tel:+919011523456", "tel:+919011623456"],
          },
          {
            icon: <FaEnvelope />,
            title: "Email",
            value: ["svg022@gmail.com"],
            href: ["mailto:svg022@gmail.com"],
          },
          {
            icon: <FaMapMarkerAlt />,
            title: "Location",
            value: ["Office 401, 4th Floor, 135 B, Ambedkar Road, Pune 411001"],
            href: [
              "https://www.google.com/maps?q=Office+401,+Fourth+Floor,+135+B,+Pandita+Ramabai,+Ambedkar+Road,+Pune+411001",
            ],
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-[#ffd6ec] text-center"
          >
            <div className="text-[#ff6b81] text-4xl mb-4 flex justify-center">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            {item.value.map((text, i) => (
              <a
                key={i}
                href={item.href[i]}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#444] hover:text-[#ff6b81]"
              >
                {text}
              </a>
            ))}
          </div>
        ))}
      </motion.div>

      <motion.div
        className="relative w-full max-w-4xl bg-white/80 backdrop-blur-md p-12 rounded-[2.5rem] shadow-[0_10px_60px_-10px_rgba(0,0,0,0.25)]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="absolute -top-8 left-8 w-20 h-20 bg-[#ffd6ec] rounded-full opacity-40 animate-pulse" />
        <div className="absolute -bottom-8 right-8 w-20 h-20 bg-[#ffd6ec] rounded-full opacity-40 animate-pulse" />

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl bg-[#fff1f9] border border-[#ffcfe3] focus:outline-none focus:ring-2 focus:ring-[#ff7eb3]"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl bg-[#fff1f9] border border-[#ffcfe3] focus:outline-none focus:ring-2 focus:ring-[#ff7eb3]"
            />
          </div>

          <div className="mb-8">
            <label className="block mb-2 text-lg font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-4 rounded-2xl bg-[#fff1f9] border border-[#ffcfe3] focus:outline-none focus:ring-2 focus:ring-[#ff7eb3]"
            ></textarea>
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 bg-[#ff7eb3] hover:bg-[#f26a9b] text-white font-bold text-lg rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>

      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to send this message?"
          onConfirm={submitInquiry}
          onCancel={() => {
            setShowModal(false);
            setPendingSubmission(false);
          }}
        />
      )}
    </div>
  );
};

export default Contact;
