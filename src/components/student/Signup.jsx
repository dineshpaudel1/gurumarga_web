import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../Apis/UserApi"; // Import the signup API call

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Calling the API function from UserApi
      const data = await signupUser(
        fullName,
        username,
        email,
        contact,
        password
      );
      console.log("Signup successful", data);
      navigate("/login"); // Redirect to the login page after successful signup
    } catch (error) {
      setError(error.message);
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-[100px] p-8 bg-white rounded-xl shadow-lg">
      {/* Optional: Add logo or banner */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-900 mt-4">Sign Up for GuruMarga</h2>
      </div>

      <form onSubmit={handleSignup}>
        <div className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-900"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-900"
            >
              Contact
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              autoComplete="contact"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="block w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded-md py-3 font-semibold text-sm shadow-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600 focus:ring-inset"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a
          href="#"
          className="text-blue-600 hover:underline"
          onClick={() => navigate("/login")}
        >
          Log in
        </a>
      </p>
    </div>
  );
};

export default Signup;
