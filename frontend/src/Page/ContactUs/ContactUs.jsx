import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formDataObject = new FormData(event.target);
    formDataObject.append("access_key", "30954d9f-adf7-478c-9eaa-e0f5a79767ca");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObject,
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Submission failed: " + data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.main
      className="flex items-center justify-center  m-4 rounded-2xl bg-gray-900 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-4xl bg-gray-800 ring-1 ring-gray-700 rounded-lg shadow-lg overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-3xl font-extrabold text-white sm:text-4xl">
          Contact Us
        </h2>
        <div className="mt-8 space-y-6">
          <motion.div
            className="bg-gray-700 p-6 rounded-lg shadow-md"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Contact Information
            </h3>
            <p className="text-gray-300">
              Email:{" "}
              <a
                href="mailto:webops@smail.iitm.ac.in"
                className="text-blue-400 hover:underline"
              >
                webops@smail.iitm.ac.in
              </a>
            </p>
            <p className="text-gray-300">
              Phone:{" "}
              <a
                href="tel:+918002860787"
                className="text-blue-400 hover:underline"
              >
                +91-8002860787
              </a>
            </p>
            <p className="text-gray-300">
              Address: IIT Madras, Chennai, Tamil Nadu, India, 600036
            </p>
          </motion.div>

          <motion.form
            className="space-y-6"
            onSubmit={onSubmit}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {["name", "email", "message"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-300 capitalize"
                >
                  {field}
                </label>
                {field === "message" ? (
                  <textarea
                    id={field}
                    name={field}
                    rows="5"
                    placeholder={`Your ${field}`}
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-400 focus:border-blue-400 text-sm sm:text-base"
                    required
                  />
                ) : (
                  <input
                    id={field}
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    placeholder={`Your ${field}`}
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-400 focus:border-blue-400 text-sm sm:text-base"
                    required
                  />
                )}
              </div>
            ))}

            <motion.div
              className="mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 text-sm sm:text-base"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </motion.main>
  );
};

export default ContactUs;
