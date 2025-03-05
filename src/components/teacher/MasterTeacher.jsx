import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
          isSidebarOpen ? "w-64" : "w-20"
        } bg-[#2c3e50] text-white flex flex-col transition-all duration-300 h-full`}
      >
        <div className="p-4 flex items-center justify-between ">
          <div>
            
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center text-white hover:text-gray-300"
          >
            <FaBars size={20} />
            </button>
            
        </div>
        </div>
        <span className="p-4 border-t border-gray-600"></span>
        <nav className="flex-1 mt-6">
          <ul>
            <Link to="dashboard">
            <li className="p-4 hover:bg-[#34495e] flex items-center">
                <FaTachometerAlt className="w-5 h-5" />
                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
            </li>
            </Link>
            <Link to="teachercourse">
            <li className="p-4 hover:bg-[#34495e] flex items-center">
              
                <FaBook className="w-5 h-5" />
                {isSidebarOpen && <span className="ml-3">My Courses</span>}
              
              </li>
              </Link>
            <li className="p-4 hover:bg-[#34495e] flex items-center">
              <Link to="addcourse" className="flex items-center">
                <FaPlus className="w-5 h-5" />
                {isSidebarOpen && <span className="ml-3">Add Course</span>}
              </Link>
            </li>
            <li className="p-4 hover:bg-[#34495e] flex items-center">
              <Link to="enrolleduser" className="flex items-center">
                <FaUserGraduate className="w-5 h-5" />
                {isSidebarOpen && <span className="ml-3">Enrollment</span>}
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
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center text-[#333] hover:text-[#2c3e50]">
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
              {isSidebarOpen && <FaCog size={20} className="text-[#333] hover:text-[#2c3e50]" />}
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#f8f9fa]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MasterTeacher;