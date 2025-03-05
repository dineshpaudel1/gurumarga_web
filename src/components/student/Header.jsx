import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import UserContext from "../../context/UserInfoProvider";
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  const [username, setUsername] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [userInfo, fetchUserInfo, role] = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) handleLogout();

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setUsername(null);
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md py-3 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <img src={logo} alt="Logo" className="h-12" />
          <span className="text-xl font-bold text-[#3B3F58] tracking-tight">Guru</span>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">Marga</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex w-1/2 relative">
          <input
            type="text"
            name="q"
            placeholder="Search for courses..."
            className="w-full h-11 pl-4 pr-12 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
          />
          <FaSearch
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={15}
          />
        </div>

        {/* Icons & User Dropdown */}
        <div className="flex items-center space-x-6">
          {username ? (
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="text-gray-600 flex items-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                  <FontAwesomeIcon icon={faUser} className="text-gray-600" />
                </div>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 w-48 bg-white border rounded-lg shadow-lg z-50"
                  onMouseEnter={() => setDropdownOpen(true)} // Keeps dropdown open while hovering
                  onMouseLeave={() => setDropdownOpen(false)} // Closes dropdown when mouse leaves
                >
                  {role === "ROLE_ADMIN" && <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100">Admin Panel</Link>}
                  {role === "ROLE_USER" && <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>}
                  {role === "ROLE_TEACHER" && <Link to="/teacher" className="block px-4 py-2 hover:bg-gray-100">Teacher Panel</Link>}
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link to="/login" className="px-5 py-2.5 text-sm font-medium text-blue-600 bg-gradient-to-r from-blue-200 to-indigo-100 rounded-full hover:from-blue-100 hover:to-indigo-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                Login
              </Link>
              <Link to="/signup" className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
