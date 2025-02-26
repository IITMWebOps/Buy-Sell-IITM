import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { state } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      {state.isAuthenticated && state.user && (
        <motion.div
          className="max-w-lg font-me my-4  mx-auto bg-gray-900 text-white p-6 rounded-2xl shadow-lg text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-semibold text-blue-400 mb-6"
          >
            User Profile
          </motion.h1>
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <motion.img
              src={
                state.user.profileImageUrl || "https://via.placeholder.com/200"
              }
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-blue-600 mb-4 shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:rotate-3 hover:scale-110"
              whileHover={{ scale: 1.1, rotate: 5 }}
            />

            <motion.p variants={itemVariants} className="text-lg font-medium">
              <span className="text-gray-400">First Name:</span>{" "}
              {state.user.firstName}
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg font-medium">
              <span className="text-gray-400">Last Name:</span>{" "}
              {state.user.lastName}
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg font-medium">
              <span className="text-gray-400">Email:</span>{" "}
              {state.user.userEmail}
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg font-medium">
              <span className="text-gray-400">Mobile:</span>{" "}
              {state.user.userMobile}
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg font-medium">
              <span className="text-gray-400">Username:</span>{" "}
              {state.user.userName}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Profile;
