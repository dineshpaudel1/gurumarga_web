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
    <div className="max-w-md mx-auto mt-[150px] mb-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Log In to GuruMarga
      </h2>
      <form onSubmit={handleLogin}>
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

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
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
            Sign In
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a
          href="#"
          className="text-blue-600 hover:underline"
          onClick={handleSignupRedirect}
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
