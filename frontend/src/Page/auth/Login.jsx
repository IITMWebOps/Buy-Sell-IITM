import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { backendUrl } from "../../config";

const Login = () => {
  const { dispatch } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, {
        userEmail: email,
        userPassword: password,
      });
      const { status, user } = response.data;
      if (status === "Error") {
        setError("Invalid credentials");
      } else {
        dispatch({ type: "LOGIN", payload: { user } });
        localStorage.setItem("user", JSON.stringify(user));
        setRedirect(true);
      }
    } catch (error) {
      setError("Something went wrong");
      console.error("Login error:", error);
    }
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
                placeholder="eg. example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                required
              />
            </div>
            <div className="mt-4">
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
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            <motion.div
              className="mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 sm:text-sm"
              >
                Sign in
              </button>
            </motion.div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
