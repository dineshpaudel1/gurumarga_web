import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Apis/UserApi"; // Importing loginUser function

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(username, password); // Using the API function from UserApi

      localStorage.setItem("token", data.accessToken); // Save the token in localStorage
      localStorage.setItem("username", username); // Save the username in localStorage

      navigate("/"); // Redirect to the homepage
      window.location.reload(); // Reload the page to update the header
    } catch (error) {
      setError(error.message);
      console.error("Error logging in:", error);

      // If the server is down or there is an issue, remove the token from localStorage
      if (
        error.message.includes("NetworkError") ||
        error.message.includes("ECONNREFUSED")
      ) {
        localStorage.removeItem("username");
      }
    }
  };

  const handleSignupRedirect = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#3B3F58] mb-6">
          Login
        </h2>

        {/* Display Error Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-[#F0F2F5] focus:outline-none focus:ring-2 focus:ring-[#3B3F58] transition duration-200"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-[#F0F2F5] focus:outline-none focus:ring-2 focus:ring-[#3B3F58] transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold transition duration-300 shadow-md"
          >
            Login
          </button>

          <p className="text-center mt-4 text-gray-600">
            <a
              href="#"
              className="text-[#3B3F58] hover:text-gray-500 transition duration-200"
            >
              Forgot Password?
            </a>
          </p>
        </form>

        <p className="text-center mt-4 text-gray-600">
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
