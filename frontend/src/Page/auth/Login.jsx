import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
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
    <div className="min-h-screen flex font-medium items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-amber-50 ring-1 rounded-lg shadow-lg overflow-hidden sm:max-w-xl">
        <div className="px-6 py-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="eg. ed22b052@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm font-semibold hover:bg-amber-500 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-amber-600 hover:text-amber-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
