import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { backendUrl } from "../../config";

const Manage = () => {
  const { state } = useAuth();
  const [bicycles, setBicycles] = useState([]);

  useEffect(() => {
    if (state.isAuthenticated) {
      fetchBicycles();
    }
  }, [state.isAuthenticated]);

  const fetchBicycles = async () => {
    if (!state.user || !state.user.userEmail) {
      console.error("User email not available.");
      return;
    }

    try {
      const response = await axios.get(
        `${backendUrl}/api/bicycles/user-bicycles`,
        {
          params: { userEmail: state.user.userEmail }, // Use correct property name
          headers: { Authorization: `Bearer ${state.user.token}` }, // Ensure authentication is sent if needed
        }
      );

      if (response.data && Array.isArray(response.data.bicycles)) {
        setBicycles(response.data.bicycles);
      } else {
        console.error("Expected an array of bicycles in response");
      }
    } catch (error) {
      console.error(
        "Error fetching bicycles:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Product?"))
      return;
    try {
      await axios.delete(`${backendUrl}/api/bicycles/${id}`);
      setBicycles(bicycles.filter((bike) => bike._id !== id));
    } catch (error) {
      console.error("Error deleting bicycle:", error);
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-8">
      <motion.h1
        className="text-4xl font-bold text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Products
      </motion.h1>

      {bicycles.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No Product found.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {bicycles.map((bicycle) => (
            <motion.div
              key={bicycle._id}
              className="bg-white bg-opacity-75 shadow-2xl backdrop-blur-md border border-gray-200 p-5 rounded-2xl hover:shadow-xl transition duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={bicycle.images[0] || "https://via.placeholder.com/150"}
                alt={bicycle.title}
                className="w-full h-48 object-cover rounded-xl"
              />
              <h2 className="text-2xl font-semibold mt-4 text-gray-800">
                {bicycle.title}
              </h2>
              <p className="text-gray-700 text-lg font-medium mt-1">
                Price: ₹{bicycle.price}
              </p>
              <p className="text-gray-600 text-sm">
                Condition: {bicycle.condition}
              </p>
              <motion.button
                onClick={() => handleDelete(bicycle._id)}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Delete
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Manage;
