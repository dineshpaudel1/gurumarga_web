import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
    <div className="flex h-screen bg-[#F3E5F5]">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-[#2c3e50] text-white flex flex-col shadow-lg transition-all duration-300 ease-in-out h-full`}
      >
        <div className="p-4 flex items-center justify-between border-b border-blue-500">
          <button onClick={toggleSidebar} className="text-white">
            <FaBars size={20} />
          </button>
        </div>
        <nav className="flex-1 mt-6">
          <ul>
            <li className="p-4 hover:bg-[#34495e] flex items-center">
              <Link to="dashboard" className="flex items-center">
                <FaTachometerAlt className="w-5 h-5" />
                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>
            <li className="p-4 hover:bg-[#34495e] flex items-center">
              <Link to="categoryadmin" className="flex items-center">
                <FaBook className="w-5 h-5" />
                {isSidebarOpen && <span className="ml-3">Categories</span>}
              </Link>
            </li>
            <li className="p-4 hover:bg-[#34495e] flex items-center">
              <Link to="useradmin" className="flex items-center">
                <FaUserGraduate className="w-5 h-5" />
                {isSidebarOpen && <span className="ml-3">Total Users</span>}
              </Link>
            </li>
          </ul>
        </nav>
        
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1a237e]">Admin Dashboard</h1>
          <div className="flex items-center space-x-6">
            <Link
              to="adminnotification"
              className="relative flex items-center text-[#1a237e] hover:text-[#2c3e50]"
            >
              <FontAwesomeIcon icon={faBell} className="text-xl" />
              {requests.length > 0 && (
                <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs">
                  {requests.length}
                </span>
              )}
            </Link>
            <Link to="/" className="flex items-center text-[#1a237e] hover:text-[#2c3e50]">
              <FaHome size={20} />
              {isSidebarOpen && <span className="ml-2">Home</span>}
            </Link>
            <Link
              to="settingadmin"
              className="flex items-center space-x-2"
            >
              <img
                className="w-10 h-10 rounded-full border-2 border-[#2c3e50]"
                src={
                  userInfo.name
                    ? `http://localhost:8080${userInfo.name}`
                    : "../../assets/default-profile.png"
                }
                alt="Profile"
              />
              {isSidebarOpen && <FaCog size={20} className="text-[#1a237e] hover:text-[#2c3e50]" />}
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MasterAdmin;