import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaBook,
  FaUserGraduate,
} from "react-icons/fa";
import notification from "../../assets/notifi.webp";
import logo from "../../assets/logo.png";
import { fetchUserInfo } from "../../components/Apis/UserApi";

const MasterDashboard = ({ children }) => {
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
        console.error("Fetch Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

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
          isSidebarOpen ? "w-64" : "w-16"
        } bg-[#1a237e] text-white flex flex-col shadow-lg transition-all duration-500 ease-in-out h-full`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div className="p-4 flex items-center justify-between border-b border-blue-500">
          <button onClick={toggleSidebar} className="text-white">
            <FaBars size={20} />
          </button>
        </div>
        <nav className="flex-1 mt-6">
          <ul>
            <li className="p-4 hover:bg-[#5e17eb] flex items-center">
              <Link to="dashboard" className="flex items-center">
                <FaTachometerAlt />
                {isSidebarOpen && <span>Dashboard</span>}
              </Link>
            </li>
            <li className="p-4 hover:bg-[#5e17eb] flex items-center">
              <Link to="teachercourse" className="flex items-center">
                <FaBook className="mr-2" />
                {isSidebarOpen && <span>Courses</span>}
              </Link>
            </li>
            <li className="p-4 hover:bg-[#5e17eb] flex items-center">
              <Link to="enrolleduser" className="flex items-center">
                <FaUserGraduate className="mr-2" />
                {isSidebarOpen && <span>Enrollment</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1a237e]">
            Teacher Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            {" "}
            {/* Removed ml-auto */}
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 px-3 py-2 rounded bg-gray-200"
            />
            <img
              src={notification}
              alt="Notifications"
              className="w-8 h-8 cursor-pointer"
            />
            <Link to="/" className="flex items-center">
              <h1>Student</h1>
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
        <main className="flex-1 p-6 overflow-y-auto bg-[#EDE7F6]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MasterDashboard;
