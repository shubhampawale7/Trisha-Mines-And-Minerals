/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaGem } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-60 backdrop-blur-md text-white z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold">
          <FaGem className="text-yellow-400 mr-2" />
          Trishha Mines
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.1, color: "#FFD700" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-yellow-400 transition"
              >
                {item}
              </Link>
            </motion.li>
          ))}

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#D97706" }}
              transition={{ duration: 0.2 }}
              onClick={handleLogout}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-yellow-600"
            >
              Logout
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#D97706" }}
              transition={{ duration: 0.2 }}
              onClick={() => navigate("/login")}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-yellow-600"
            >
              Login
            </motion.button>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black bg-opacity-90 p-4 absolute top-full w-full flex flex-col items-center space-y-4"
        >
          {["Home", "About", "Services", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-lg hover:text-yellow-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}

          {/* Auth Buttons for Mobile */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Login
            </button>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
