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
  { name: "Home", icon: MdDashboard },
  { name: "About", icon: MdPeopleOutline },
  { name: "Services", icon: MdDesignServices },
  { name: "Gallery", icon: MdCollections },
  { name: "Contact", icon: MdSupportAgent },
];

const sidebarVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { type: "tween", ease: "easeInOut", duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.05 },
  }),
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-[#fffaf5] shadow-md font-['Poppins'] border-b border-[#eee]"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
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

        <motion.button
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-3xl text-[#aa6e26] z-50"
        >
          {isOpen ? <MdClose /> : <MdMenu />}
        </motion.button>

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
                  <item.icon size={18} />
                  <span className="text-lg">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              onClick={toggleMenu}
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 w-64 h-full bg-[#fffaf5] shadow-xl z-50 p-6 flex flex-col gap-6"
            >
              {/* Close Button Inside */}
              <div className="flex justify-end mb-2">
                <button
                  onClick={toggleMenu}
                  className="text-2xl text-[#aa6e26]"
                >
                  <MdClose />
                </button>
              </div>

              {navItems.map((item, i) => {
                const path =
                  item.name === "Home" ? "/" : `/${item.name.toLowerCase()}`;
                const isActive = location.pathname === path;
                return (
                  <motion.div
                    key={item.name}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      to={path}
                      onClick={toggleMenu}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-semibold transition group ${
                        isActive
                          ? "bg-[#dba86d] text-white"
                          : "hover:bg-[#f0dfc7] hover:text-[#4d2f0e]"
                      }`}
                    >
                      <motion.div
                        whileHover={{
                          rotate: [0, -10, 10, -5, 5, 0],
                          scale: 1.2,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon size={20} />
                      </motion.div>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
