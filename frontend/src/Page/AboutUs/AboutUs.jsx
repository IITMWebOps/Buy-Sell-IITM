import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.main
      className="p-6 md:p-12 lg:p-16 xl:p-20 max-w-7xl mx-auto text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-4xl font-bold text-gray-700 sm:mb-0 mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        About Us
      </motion.h1>

      {/* Buy & Sell Portal Section */}
      <motion.div
        className="w-full bg-blue-50 p-8 rounded-lg shadow-xl mb-12"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src="https://res.cloudinary.com/dh4adw5o7/image/upload/v1728069704/InstiMela/etggtzjaywpqsqmvwmu5.jpg"
          alt="Buy & Sell"
          className="w-full md:w-2/3 lg:w-1/2 mx-auto rounded-lg shadow-md mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Buy & Sell Portal
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Items which are an integral part of life at IIT Madras, facilitating
          quick and convenient commuting across our expansive campus.
          Unfortunately, as students graduate each year, many items are left
          abandoned across the campus.
        </p>
        <p className="text-gray-700 leading-relaxed mt-2">
          This website aims to bridge the gap between sellers and buyers,
          providing a platform for students to sell their used items and for
          buyers to purchase second-hand products at reasonable prices.
        </p>
      </motion.div>

      {/* Our Club Section */}
      <motion.div
        className="w-full bg-blue-50 p-8 rounded-lg shadow-xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src="https://res.cloudinary.com/dh4adw5o7/image/upload/v1728069702/InstiMela/lu2jjvh7t0nx643wxrbo.jpg"
          alt="Institute Web Operations Club"
          className="w-full md:w-2/3 lg:w-1/2 mx-auto rounded-lg shadow-md mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Club</h2>
        <p className="text-gray-700 leading-relaxed">
          Institute Web Operations Club, the vibrant hub where technology
          enthusiasts come together to explore, learn, and innovate in the
          ever-evolving world of web operations. We are a passionate community
          of students at IIT Madras who share a common fascination for the
          intricate workings behind seamless online experiences.
        </p>
      </motion.div>
    </motion.main>
  );
};

export default AboutUs;
