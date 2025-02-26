import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { backendUrl } from "../../config";
const SignUp = () => {
  const { dispatch } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userEmail", email);
      formData.append("userMobile", mobile);
      formData.append("userName", username);
      formData.append("userPassword", password);

      const response = await axios.post(
        `${backendUrl}/api/auth/signup`,
        formData
      );
      const { status, user } = response.data;
      if (status === "Ok") {
        dispatch({ type: "LOGIN", payload: { user } });
        localStorage.setItem("user", JSON.stringify(user));
        setRedirect(true);
      } else {
        setError("User already exists with this email");
      }
    } catch (error) {
      setError("Something went wrong");
      console.error("Signup error:", error);
    }
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.div
      className="flex items-center justify-center  m-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-md w-full bg-gray-800 ring-1 ring-gray-700 rounded-lg shadow-lg overflow-hidden sm:max-w-xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-6 py-8">
          <h2 className="mt-4 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-300"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-300"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-300"
              >
                Mobile number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="profileImage"
                className="block text-sm font-medium text-gray-300"
              >
                Profile Image
              </label>
              <input
                id="profileImage"
                name="profileImage"
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                required
              />
            </div>
            {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm font-semibold hover:bg-blue-500 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
