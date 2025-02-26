import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaPlus, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
const Navbar = () => {
  const { state, dispatch } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch({ type: "LOGOUT" });
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
    setIsMenuOpen(false); // Close mobile menu when popup is opened
  };
  const handleRedirect = (path) => {
    setIsLoading(true);
    togglePopup();
    setTimeout(() => {
      setIsLoading(false);
      navigate(path);
    }, 3000);
  };
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: { y: "100vh", opacity: 0 },
  };
  return (
    <nav className="bg-gray-900 font-medium shadow-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.zN59XZkqlJjGp8P5-viNuwHaHa&pid=Api&P=0&h=180"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
            <span className="ml-3 text-xl font-semibold text-white">
              Buy and Sell
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <form className="relative">
                <input
                  type="search"
                  placeholder="Find items at your budget.."
                  className="w-64 py-2 pl-4 pr-10 rounded-full bg-white text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-2 mr-3 text-gray-500 hover:text-gray-400"
                >
                  <IoIosSearch className="text-xl text-gray-950" />
                </button>
              </form>
              {state.isAuthenticated ? (
                <>
                  <motion.button
                    onClick={togglePopup}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
                  >
                    Manage
                  </motion.button>

                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-sm hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300 text-gray-300"
                >
                  Login
                </Link>
              )}
              {location.pathname !== "/" && (
                <Link
                  to="/"
                  className="text-sm hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300 text-gray-300"
                >
                  Home
                </Link>
              )}
              <Link
                to="/sell"
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                <FaPlus className="mr-2" />
                Sell
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
            >
              {isMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form className="relative mb-3">
              <input
                type="search"
                placeholder="Find items at your budget.."
                className="w-full py-2 pl-4 pr-10 rounded-full bg-white text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-3 text-gray-500 hover:text-gray-400"
              >
                <IoIosSearch className="text-2xl font-bold text-gray-950" />
              </button>
            </form>
            {state.isAuthenticated ? (
              <>
                <button
                  onClick={togglePopup}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition duration-300 text-gray-100"
                >
                  Manage
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition duration-300 text-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition duration-300 text-gray-300"
              >
                Login
              </Link>
            )}
            {location.pathname !== "/" && (
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition duration-300 text-gray-300"
              >
                Home
              </Link>
            )}
            <Link
              to="/sell"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
            >
              <FaPlus className="mr-2" />
              Sell
            </Link>
          </div>
        </div>
      )}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xl px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white border border-[#334155] shadow-2xl p-5 sm:p-8 rounded-2xl w-full max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
            >
              {/* Decorative Background Effect */}
              <div className="absolute inset-0 bg-white opacity-10 blur-[100px]"></div>

              {/* Title */}
              <h2 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-100 tracking-wide relative">
                👋 Hello, {state.user.userName}
              </h2>

              {/* Buttons */}
              <div className="space-y-3 sm:space-y-4 relative">
                <motion.button
                  className="w-full px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow-md bg-gradient-to-r from-[#2563EB] to-[#1E40AF] hover:from-[#1E40AF] hover:to-[#2563EB] text-white transition-all duration-300 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRedirect("/profile")}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "View Profile"}
                </motion.button>

                <motion.button
                  className="w-full px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow-md bg-gradient-to-r from-[#DC2626] to-[#9B1C1C] hover:from-[#9B1C1C] hover:to-[#DC2626] text-white transition-all duration-300 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRedirect("/manage-products")}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Manage Products"}
                </motion.button>
              </div>

              {/* Close Button */}
              <motion.button
                onClick={togglePopup}
                className="mt-5 sm:mt-6 w-full px-4 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-[#475569] to-[#1F2937] hover:from-[#1F2937] hover:to-[#475569] text-white rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
