import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaExpand, FaCompress } from "react-icons/fa";
import { backendUrl } from "../../config";

const CycleInfo = () => {
  const { _id } = useParams();
  const [bicycle, setBicycle] = useState(null);
  const [activeImg, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/bicycles/${_id}`);
        const data = await response.json();
        setBicycle(data);
        setActiveImage(data.images[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [_id]);

  if (loading) return <LoadingSpinner />;
  if (!bicycle) return <ErrorMessage message="Bicycle not found" />;

  return (
    <div className="bg-blue-50 font-medium  pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden border border-blue-200"
      >
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <div
              className="relative overflow-hidden rounded-lg shadow-lg"
              style={{ paddingBottom: "100%" }}
            >
              <motion.img
                layoutId="mainImage"
                src={activeImg}
                alt={bicycle.title}
                className="absolute w-full h-full object-cover transition-transform duration-300 cursor-pointer"
                style={{ transform: isZoomed ? "scale(1.5)" : "scale(1)" }}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              <motion.button
                className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                {isZoomed ? (
                  <FaCompress className="text-white" />
                ) : (
                  <FaExpand className="text-white" />
                )}
              </motion.button>
            </div>
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
              {bicycle.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`bicycle ${index + 1}`}
                  className={`w-20 h-20 rounded-md cursor-pointer object-cover ${
                    activeImg === image ? "ring-2 ring-blue-500" : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="md:w-1/2 p-6 bg-blue-50">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-700 mb-4"
            >
              {bicycle.title}
            </motion.h1>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between items-center mb-6"
            >
              <span className="text-2xl font-semibold text-blue-500">
                ₹{bicycle.price}
              </span>
              <span className="text-lg text-gray-600">
                Condition:{" "}
                <span className="font-semibold text-blue-600">
                  {bicycle.condition}
                </span>
              </span>
            </motion.div>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-4 rounded-lg shadow-md mb-6 border border-blue-200"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Contact Details
              </h2>
              <p className="text-gray-600">
                <span className="font-semibold">Name:</span> {bicycle.name}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Email:</span> {bicycle.email}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Phone:</span>{" "}
                {bicycle.phoneNumber}
              </p>
            </motion.div>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Description
              </h2>
              <p className="text-gray-600">{bicycle.description}</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-blue-50">
    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center h-screen bg-blue-50">
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
      role="alert"
    >
      <p className="font-bold">Error</p>
      <p>{message}</p>
    </div>
  </div>
);

export default CycleInfo;
