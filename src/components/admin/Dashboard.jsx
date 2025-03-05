import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaChalkboardTeacher } from "react-icons/fa";
import { fetchTotalUserCount } from "../../Apis/UserApi";
import { useNavigate } from "react-router-dom";
import CourseContext from "../../context/CourseInfoProvider";

const Dashboard = () => {
  const { categoryInfo } = useContext(CourseContext);
  const [userCount, setUserCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategoryCount = async () => {
      setCategoryCount(categoryInfo.length);
    };

    const getUsers = async () => {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const count = await fetchTotalUserCount(accessToken);
        setUserCount(count);
      }
    };

    getUsers();
    getCategoryCount();
  }, [categoryInfo]);

  const handleTotalUserClick = () => {
    navigate("/admin/useradmin");
  };

  const handleCategoryClick = () => {
    navigate("/admin/categoryadmin");
  };

  return (
    <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10">
      {/* Total Categories Card */}
      <div className="bg-white p-6 rounded-xl text-white text-center shadow-xl cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl" onClick={handleCategoryClick}>
        <FaChalkboardTeacher className="text-4xl text-blue-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-2 text-black">Total Categories</h2>
        <p className="text-3xl font-semibold text-black">{categoryCount}</p>
        <p className="text-sm mt-2 opacity-80 text-black">Click to view details</p>
      </div>
      <div className="bg-white p-6 rounded-xl text-white text-center shadow-xl cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl" onClick={handleCategoryClick}>
        <FaUser className="text-4xl text-blue-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-2 text-black">Total Users</h2>
        <p className="text-3xl font-semibold text-black">{userCount}</p>
        <p className="text-sm mt-2 opacity-80 text-black">Click to view details</p>
      </div>      
    </div>
  );
};

export default Dashboard;