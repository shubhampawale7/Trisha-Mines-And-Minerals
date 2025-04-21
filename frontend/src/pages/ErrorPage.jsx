/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import miningGif from "/Tired Coal Mining GIF by Playsaurus.gif";
import { FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#fdf9f3] text-center relative overflow-hidden px-4">
      {/* Sparkle Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-70"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              y: [Math.random() * window.innerHeight, -50],
              scale: [0.5, 1],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.img
        src={miningGif}
        alt="Mining Animation"
        className="w-56 h-56 mb-6 z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <motion.h1
        className="text-5xl font-bold text-[#2B1A0F] z-10"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Oops! Page Not Found
      </motion.h1>

      <motion.p
        className="text-lg mt-3 text-gray-600 z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        The page you're looking for doesn't exist or has been moved.
      </motion.p>

      <motion.div
        className="mt-6 z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D9AE4E] hover:bg-[#c2993f] text-white font-semibold shadow-lg transition"
        >
          <FaArrowLeft />
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
