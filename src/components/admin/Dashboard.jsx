import React, { useContext, useEffect, useState } from "react"; // Importing hooks
import { FaUser, FaChalkboardTeacher } from "react-icons/fa"; // Importing icons
import { fetchTotalUserCount } from "../../Apis/UserApi"; // Import user count function
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CourseContext from "../../context/CourseInfoProvider";

const Dashboard = () => {
  const { categoryInfo } = useContext(CourseContext);

  const [userCount, setUserCount] = useState(0); // State to hold total users
  const [categoryCount, setCategoryCount] = useState(0); // State to hold total categories
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getCategoryCount = async () => {
      setCategoryCount(categoryInfo.length); // Set the course count based on the fetched data
    };

    const getUsers = async () => {
      const accessToken = localStorage.getItem("token"); // Retrieve access token from localStorage
      if (accessToken) {
        const count = await fetchTotalUserCount(accessToken); // Fetch total user count
        setUserCount(count); // Set the user count based on fetched data
      }
    };

    getUsers();
    getCategoryCount(); // Fetch category count
  }, []); // Empty dependency array to run only on component mount

  const handleTotalUserClick = () => {
    navigate("/admin/useradmin"); // Navigate to UserAdmin page on click
  };

  const handleCategoryClick = () => {
    navigate("/admin/categoryadmin"); // Navigate to CategoryAdmin page on click
  };

  return (
    <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10">
      <div
        className="bg-yellow-600 p-6 rounded-lg text-white text-center shadow-md cursor-pointer"
        onClick={handleCategoryClick} // Add onClick handler
      >
        <FaChalkboardTeacher className="text-4xl mb-2 mx-auto" />{" "}
        <h2 className="text-2xl font-bold">Total Categories</h2>
        <p className="text-lg">{categoryCount}</p>{" "}
      </div>
      <div
        className="bg-gray-600 p-6 rounded-lg text-white text-center shadow-md cursor-pointer"
        onClick={handleTotalUserClick} // Add onClick handler
      >
        <FaUser className="text-4xl mb-2 mx-auto" /> {/* User Icon */}
        <h2 className="text-2xl font-bold">Total User</h2>
        <p className="text-lg">{userCount}</p>{" "}
      </div>
    </div>
  );
};

export default Dashboard;
