/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdMenu,
  MdClose,
  MdDashboard,
  MdPeopleOutline,
  MdDesignServices,
  MdCollections,
  MdSupportAgent,
} from "react-icons/md";

const navItems = [
  { name: "Home", icon: <MdDashboard size={16} /> },
  { name: "About", icon: <MdPeopleOutline size={16} /> },
  { name: "Services", icon: <MdDesignServices size={16} /> },
  { name: "Gallery", icon: <MdCollections size={16} /> },
  { name: "Contact", icon: <MdSupportAgent size={16} /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-[#fffaf5] shadow-md font-['Poppins'] border-b border-[#eee]"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-xl md:text-2xl font-bold text-[#2d1f0b] tracking-tight"
        >
          <img
            src="/Logo-removebg-preview.png"
            alt="Trishha Logo"
            className="h-12 w-auto drop-shadow-sm"
          />
          <span className="hidden sm:inline-block">
            Trishha Mines and Minerals LLP
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-[#aa6e26]"
        >
          {isOpen ? <MdClose /> : <MdMenu />}
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 text-base font-semibold text-[#3e2d1a]">
          {navItems.map((item) => {
            const path =
              item.name === "Home" ? "/" : `/${item.name.toLowerCase()}`;
            const isActive = location.pathname === path;
            return (
              <li key={item.name}>
                <Link
                  to={path}
                  className={`flex items-center gap-3 px-5 py-2 rounded-xl transition duration-300 ${
                    isActive
                      ? "bg-[#e2c6a4] text-[#5c3d1a]"
                      : "hover:text-[#aa6e26] hover:bg-[#f9e8d8]"
                  }`}
                >
                  {item.icon}
                  <span className="text-lg">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#fff8f1] px-6 pt-4 pb-6 flex flex-col items-center space-y-4 text-base shadow-inner border-t border-[#f0e8df]"
          >
            {navItems.map((item) => {
              const path =
                item.name === "Home" ? "/" : `/${item.name.toLowerCase()}`;
              const isActive = location.pathname === path;
              return (
                <Link
                  key={item.name}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center justify-center gap-3 py-2 px-4 rounded-xl transition ${
                    isActive
                      ? "bg-[#dba86d] text-white"
                      : "hover:bg-[#e5c7a0] hover:text-[#4d2f0e]"
                  }`}
                >
                  {item.icon}
                  <span className="text-lg font-medium">{item.name}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
