import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaBook,
  FaUserGraduate,
  FaPlus,
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
    <div className="flex h-screen bg-[#f8f9fa]">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-[#2c3e50] text-white flex flex-col transition-all duration-500 h-full`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-600">
          <button onClick={toggleSidebar} className="text-white">
            <FaBars size={20} />
          </button>
        </div>
        <nav className="flex-1 mt-6">
          <ul>
            <li className="p-4 hover:bg-[#34495e] flex items-center">
              <Link to="dashboard" className="flex items-center">
                <FaTachometerAlt />
                {isSidebarOpen && <span className="ml-2">Dashboard</span>}
              </Link>
            </li>
            <li className="p-4 hover:bg-[#34495e] flex items-center">
              <Link to="teachercourse" className="flex items-center">
                <FaBook />
                {isSidebarOpen && <span className="ml-2">My Courses</span>}
              </Link>
            </li>
            <li className="p-4 hover:bg-[#34495e] flex items-center">
              <Link to="teachercourse" className="flex items-center">
                <FaPlus />
                {isSidebarOpen && <span className="ml-2">Add Course</span>}
              </Link>
            </li>
            <li className="p-4 hover:bg-[#34495e] flex items-center">
              <Link to="enrolleduser" className="flex items-center">
                <FaUserGraduate />
                {isSidebarOpen && <span className="ml-2">Enrollment</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#333]">Teacher Dashboard</h1>
          <div className="flex items-center space-x-4">
           
            <Link to="/" className="flex items-center">
              <h1>Home</h1>
            </Link>
            <Link to="settingadmin" className="flex items-center">
              <img
                className="w-10 h-10 rounded-full"
                src={
                  userInfo.name
                    ? `http://localhost:8080${userInfo.name}`
                    : "../../assets/default-profile.png"
                }
                alt="Profile"
              />
            </Link>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MasterTeacher;
