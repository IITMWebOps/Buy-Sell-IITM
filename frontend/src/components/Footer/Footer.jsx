import React from "react";

const Footer = () => {
  return (
    <div className="w-full p-6 font-medium flex flex-col items-center justify-center bg-gray-900 text-center text-gray-300">
      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-8 mb-6">
        <a href="/" className="text-white hover:text-yellow-500">Home</a>
        <a href="/about" className="text-white hover:text-yellow-500">About</a>
        <a href="/contact" className="text-white hover:text-yellow-500">Contact</a>
        <a href="/faq" className="text-white hover:text-yellow-500">FAQ</a>
      </div>
      
      {/* Newsletter Signup */}
      <div className="w-full max-w-3xl items-center justify-center border-t border-gray-700 pt-6 px-4">
        <p className="text-lg font-semibold text-white mb-2">Stay Updated</p>
        <p className="text-gray-500 mb-4">
          Sign up for our newsletter and never miss an update on latest products.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="py-2 px-4 w-full md:w-64 border-2 border-gray-400 bg-gray-800 text-white rounded-md focus:outline-none"
          />
          <button className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
            Subscribe
          </button>
        </div>
      </div>
      
      {/* Footer Bottom Section */}
      <div className="w-full max-w-3xl border-t border-gray-700 pt-6 mt-6 text-sm">
        <p className="text-gray-500">&copy; 2024 All Rights Reserved.</p>
        <p className="text-2xl font-semibold mt-4 text-white">Institute WebOps Team, IIT Madras</p>
      </div>
    </div>
  );
};

export default Footer;
