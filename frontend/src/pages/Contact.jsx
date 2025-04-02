/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8 mt-15">
      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Get in Touch
      </motion.h1>

      {/* Contact Details */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl text-center mb-12">
        {/* Phone */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FaPhoneAlt className="text-yellow-400 text-5xl mb-3" />
          <h2 className="text-xl font-semibold">Call Us</h2>
          <p className="mt-2">+91 9011523456</p>
          <p className="mt-1">+91 9011623456</p>
        </motion.div>

        {/* Email */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FaEnvelope className="text-yellow-400 text-5xl mb-3" />
          <h2 className="text-xl font-semibold">Email Us</h2>
          <p className="mt-2">svg022@gmail.com</p>
        </motion.div>

        {/* Location */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FaMapMarkerAlt className="text-yellow-400 text-5xl mb-3" />
          <h2 className="text-xl font-semibold">Visit Us</h2>
          <p className="mt-2">
            Office 401, Fourth Floor, 135 B, Pandita Ramabai,
          </p>
          <p>Ambedkar Road, Pune 411 001.</p>
        </motion.div>
      </div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="mb-6">
          <label className="block text-lg mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <motion.button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-lg py-3 rounded-lg transition"
          whileHover={{ scale: 1.05 }}
        >
          Send Message
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Contact;
