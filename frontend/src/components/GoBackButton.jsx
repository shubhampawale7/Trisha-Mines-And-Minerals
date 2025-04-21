/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.6, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.6, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        whileHover={{ scale: 1.15, rotate: -10 }}
        onClick={() => navigate(-1)}
        className="fixed bottom-6 left-6 z-50 bg-[#D9AE4E] hover:bg-[#C89B3C] text-white p-3 rounded-full shadow-lg"
        title="Go Back"
      >
        <FaArrowLeft size={20} />
      </motion.button>
    </AnimatePresence>
  );
};

export default GoBackButton;
