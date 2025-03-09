import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaBook,
  FaUserGraduate,
  FaPlus,
  FaHome,
  FaCog,
} from "react-icons/fa";
import notification from "../../assets/notifi.webp";
import logo from "../../assets/logo.png";
import { fetchUserInfo } from "../../Apis/UserApi";

const MasterTeacher = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchUserInfo(token);
        setUserInfo(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white text-gray-800 flex flex-col shadow-lg transition-all duration-300 h-full`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <button
            onClick={toggleSidebar}
            className="w-full justify-center text-gray-800 hover:text-gray-600"
          >
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
                <FaTachometerAlt
                  className={`w-4 h-4 ${
                    location.pathname.includes("/dashboard")
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                />
                {isSidebarOpen && (
                  <span
                    className={`ml-2 text-[15px] ${
                      location.pathname.includes("/dashboard")
                        ? "text-blue-600"
                        : "text-gray-800"
                    }`}
                  >
                    Dashboard
                  </span>
                )}
              </li>
            </Link>

            {/* My Courses Link */}
            <Link to="teachercourse">
              <li
                className={`p-2 hover:bg-gray-100 rounded-[50px] mx-2 flex items-center ${
                  location.pathname.includes("/teachercourse") ? "bg-blue-100" : ""
                }`}
              >
                <FaBook
                  className={`w-4 h-4 ${
                    location.pathname.includes("/teachercourse")
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                />
                {isSidebarOpen && (
                  <span
                    className={`ml-2 text-[15px] ${
                      location.pathname.includes("/teachercourse")
                        ? "text-blue-600"
                        : "text-gray-800"
                    }`}
                  >
                    My Courses
                  </span>
                )}
              </li>
            </Link>

            {/* Add Course Link */}
            <Link to="addcourse">
              <li
                className={`p-2 hover:bg-gray-100 rounded-[50px] mx-2 flex items-center ${
                  location.pathname.includes("/addcourse") ? "bg-blue-100" : ""
                }`}
              >
                <FaPlus
                  className={`w-4 h-4 ${
                    location.pathname.includes("/addcourse")
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                />
                {isSidebarOpen && (
                  <span
                    className={`ml-2 text-[15px] ${
                      location.pathname.includes("/addcourse")
                        ? "text-blue-600"
                        : "text-gray-800"
                    }`}
                  >
                    Add Course
                  </span>
                )}
              </li>
            </Link>

            {/* Enrollment Link */}
            <Link to="enrolleduser">
              <li
                className={`p-2 hover:bg-gray-100 rounded-[50px] mx-2 flex items-center ${
                  location.pathname.includes("/enrolleduser") ? "bg-blue-100" : ""
                }`}
              >
                <FaUserGraduate
                  className={`w-4 h-4 ${
                    location.pathname.includes("/enrolleduser")
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                />
                {isSidebarOpen && (
                  <span
                    className={`ml-2 text-[15px] ${
                      location.pathname.includes("/enrolleduser")
                        ? "text-blue-600"
                        : "text-gray-800"
                    }`}
                  >
                    Enrollment
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
        <header className="bg-white shadow-sm p-3 flex justify-between items-center border-b border-gray-200 h-[52px]">
          <h1 className="text-xl font-bold text-gray-800"></h1>
          <div className="flex items-center space-x-6">
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
        <main className="flex-1 overflow-y-auto m-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MasterTeacher;