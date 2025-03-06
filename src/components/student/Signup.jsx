import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signupUser } from "../../Apis/UserApi";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await signupUser(fullName, username, email, contact, password);
      console.log("Signup successful", data);
      navigate("/login"); // Redirect to login after successful signup
    } catch (error) {
      setError(error.message);
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-[70px] mb-3">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-[#3B3F58] mb-6">
          Create Your Account
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-[#F0F2F5] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-[#F0F2F5] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-[#F0F2F5] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-gray-700 font-medium mb-1">
              Contact
            </label>
            <input
              id="contact"
              type="text"
              placeholder="Enter your contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-[#F0F2F5] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-[#F0F2F5] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold transition duration-300 shadow-md"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <a
            href="#"
            className="text-[#3B82F6] hover:text-[#2563EB] transition duration-200 font-semibold"
            onClick={() => navigate("/login")}
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;