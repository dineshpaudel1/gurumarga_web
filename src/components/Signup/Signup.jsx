import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../Apis/UserApi"; // Import the signup API call

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
    <div className="max-w-md mx-auto mt-[150px] mb-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Sign Up for GuruMarga
      </h2>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Full Name
          </label>
          <div className="mt-2">
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Username
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="contact"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Contact
          </label>
          <div className="mt-2">
            <input
              id="contact"
              name="contact"
              type="text"
              autoComplete="contact"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-md py-2 font-semibold text-sm shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600 focus:ring-inset"
          >
            Sign Up
          </button>
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
