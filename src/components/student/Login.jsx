import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Apis/UserApi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("username", username);
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError(error.message);
      console.error("Error logging in:", error);
      if (error.message.includes("NetworkError") || error.message.includes("ECONNREFUSED")) {
        localStorage.removeItem("username");
      }
    }
  };

  const handleSignupRedirect = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#F9FAFB] to-[#EFF6FF] mt-10">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-[#3B3F58] mb-6">Welcome Back</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-[#F0F2F5] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
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
            Login
          </button>
        </form>
<div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <div className="flex flex-col space-y-4 mb-6 mt-5">
          <button
            className="w-full flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200"
            onClick={() => console.log("Login with Google")}
          >
            <FcGoogle className="text-xl mr-2" />
            <span className="text-gray-700 font-medium">Login with Google</span>
          </button>

          <button
            className="w-full flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200"
            onClick={() => console.log("Login with Facebook")}
          >
            <FaFacebook className="text-xl text-[#1877F2] mr-2" />
            <span className="text-gray-700 font-medium">Login with Facebook</span>
          </button>
        </div>

        

        <p className="text-center mt-4 text-gray-600 text-sm">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-[#3B82F6] hover:text-[#2563EB] transition duration-200 font-semibold"
            onClick={handleSignupRedirect}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;