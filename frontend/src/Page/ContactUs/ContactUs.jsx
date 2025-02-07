import React, { useState } from "react";
import Layout from "../Layout/Layout";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
    
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      alert("Error submitting form.");
    }
    setIsSubmitting(false);
  };

  return (
    <main className="md:pt-16 px-8 mb-8 sm:pt-28  font-medium  w-full font-serif text-center  min-h-screen">
      <h2 className="text-5xl font-bold text-gray-800 my-6">Contact Us</h2>
      <div className="flex flex-col items-center">
        <div className="mb-10 text-left w-full max-w-lg ring-1 p-6 ring-gray-300 rounded-2xl shadow-lg bg-amber-50">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Contact Information</h3>
          <p className="mb-2 text-gray-600">Email: <a href="mailto:webops@smail.iitm.ac.in" className="text-blue-600 hover:underline">webops@smail.iitm.ac.in</a></p>
          <p className="mb-2 text-gray-600">Phone: <a href="tel:+918002860787" className="text-blue-600 hover:underline">+91-8002860787</a></p>
          <p className="mb-2 text-gray-600">Address: IIT Madras, Chennai, Tamil Nadu, India, 600036</p>
        </div>
        <form className="w-full max-w-lg ring-1 ring-gray-300 shadow-lg bg-amber-50 p-8 rounded-xl" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Name</label>
            <input className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-1 focus:ring-green-400 focus:outline-none" id="name" type="text" placeholder="Your name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-left text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
            <input className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-1 focus:ring-green-400 focus:outline-none" id="email" type="email" placeholder="Your email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-6">
            <label className="block text-left text-gray-700 text-sm font-semibold mb-2" htmlFor="message">Message</label>
            <textarea className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-1 focus:ring-green-400 focus:outline-none" id="message" rows="5" placeholder="Your message" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-blue-600 hover:bg-blue-500 w-1/2 text-white font-bold py-2 px-4 rounded-lg ring-1 focus:outline-none focus:ring-2 focus:ring-green-400 transition-transform transform hover:scale-105" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ContactUs;
