import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaPlus, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { state, dispatch } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="bg-gray-900  shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.zN59XZkqlJjGp8P5-viNuwHaHa&pid=Api&P=0&h=180"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
            <span className="ml-3 text-xl font-semibold text-white">Buy and Sell</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <form className="relative">
                <input
                  type="search"
                  placeholder="Find items at your budget.."
                  className="w-64 py-2 pl-4 pr-10 rounded-full bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-2 mr-3 text-gray-400 hover:text-gray-700"
                >
                  <IoIosSearch className="text-xl" />
                </button>
              </form>
              {state.isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-700">Hello, {state.user.userName}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm hover:bg-gray-200 px-3 py-2 rounded-md transition duration-300 text-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-sm hover:bg-gray-200 px-3 py-2 rounded-md transition duration-300 text-gray-700"
                >
                  Login
                </Link>
              )}
              {location.pathname !== "/" && (
                <Link
                  to="/"
                  className="text-sm hover:bg-gray-200 px-3 py-2 rounded-md transition duration-300 text-gray-700"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
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
                className="w-full py-2 pl-4 pr-10 rounded-full bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-3 text-gray-400 hover:text-gray-700"
              >
                <IoIosSearch className="text-2xl font-bold text-gray-900" />
              </button>
            </form>
            {state.isAuthenticated ? (
              <>
                <span className="block px-3 py-2 text-base font-medium text-gray-700">Hello, {state.user.userName}</span>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 transition duration-300 text-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-300 transition duration-300 text-white"
              >
                Login
              </Link>
            )}
            {location.pathname !== "/" && (
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 transition duration-300 text-white"
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
    </nav>
  );
};

export default Navbar;
