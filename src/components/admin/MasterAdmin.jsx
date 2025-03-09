import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import {
  FaBars,
  FaTachometerAlt,
  FaBook,
  FaUserGraduate,
  FaHome,
  FaCog,
} from "react-icons/fa";
import { fetchUserInfo } from "../../Apis/UserApi";
import axios from "axios";

const MasterAdmin = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUserInfo = async () => {
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchUserInfo(token);
        setUserInfo(data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/viewUnApproved",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    getUserInfo();
    fetchRequests();
  }, [token]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white text-gray-800 flex flex-col shadow-lg transition-all duration-300 ease-in-out h-full`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <button onClick={toggleSidebar} className="text-gray-800">
            <FaBars size={20} />
          </button>
        </div>
        <nav className="flex-1 mt-6">
          <ul>
            {/* Dashboard Link */}
            <Link to="dashboard">
              <li
                className={`p-2 hover:bg-gray-100 rounded-[50px] mx-2 flex items-center ${
                  location.pathname.includes("/dashboard") ? "bg-blue-100" : ""
                }`}
              >
                <FaTachometerAlt className="w-4 h-4 text-gray-600" />
                {isSidebarOpen && (
                  <span className="ml-2 text-[15px] text-gray-800">
                    Dashboard
                  </span>
                )}
              </li>
            </Link>

            {/* Categories Link */}
            <Link to="categoryadmin">
              <li
                className={`p-2 hover:bg-gray-100 rounded-[50px] mx-2 flex items-center ${
                  location.pathname.includes("/categoryadmin") ? "bg-blue-100" : ""
                }`}
              >
                <FaBook className="w-4 h-4 text-gray-600" />
                {isSidebarOpen && (
                  <span className="ml-2 text-[15px] text-gray-800">
                    Categories
                  </span>
                )}
              </li>
            </Link>

            {/* Total Users Link */}
            <Link to="useradmin">
              <li
                className={`p-2 hover:bg-gray-100 rounded-[50px] mx-2 flex items-center ${
                  location.pathname.includes("/useradmin") ? "bg-blue-100" : ""
                }`}
              >
                <FaUserGraduate className="w-4 h-4 text-gray-600" />
                {isSidebarOpen && (
                  <span className="ml-2 text-[15px] text-gray-800">
                    Total Users
                  </span>
                )}
              </li>
            </Link>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center h-[52px]">
          <h1 className="text-2xl font-bold text-gray-800"></h1>
          <div className="flex items-center space-x-6">
            <Link
              to="adminnotification"
              className="relative flex items-center text-gray-800 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faBell} className="text-xl" />
              {requests.length > 0 && (
                <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs">
                  {requests.length}
                </span>
              )}
            </Link>
            <Link to="/" className="flex items-center text-gray-800 hover:text-gray-600">
              <FaHome size={20} />
              {isSidebarOpen && <span className="ml-2">Home</span>}
            </Link>
            <Link
              to="settingadmin"
              className="flex items-center space-x-2"
            >
              <img
                className="w-10 h-10 rounded-full border-2 border-gray-200"
                src={
                  userInfo.name
                    ? `http://localhost:8080${userInfo.name}`
                    : "../../assets/default-profile.png"
                }
                alt="Profile"
              />
              {isSidebarOpen && <FaCog size={20} className="text-gray-800 hover:text-gray-600" />}
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MasterAdmin;