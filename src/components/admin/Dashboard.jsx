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
  }, []); 

  const handleTotalUserClick = () => {
    navigate("/admin/useradmin"); 
  };

  const handleCategoryClick = () => {
    navigate("/admin/categoryadmin"); 
  };

  return (
    <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10">
      
      <div
        className="bg-yellow-500 p-6 rounded-lg text-white text-center shadow-lg cursor-pointer transition-transform transform hover:scale-105"
        onClick={handleCategoryClick}
      >
        <FaChalkboardTeacher className="text-4xl mb-2 mx-auto" />
        <h2 className="text-2xl font-semibold">Total Categories</h2>
        <p className="text-lg">{categoryCount}</p>
      </div>

      <div
        className="bg-blue-500 p-6 rounded-lg text-white text-center shadow-lg cursor-pointer transition-transform transform hover:scale-105"
        onClick={handleTotalUserClick}
      >
        <FaUser className="text-4xl mb-2 mx-auto" />
        <h2 className="text-2xl font-semibold">Total Users</h2>
        <p className="text-lg">{userCount}</p>
      </div>

    </div>
  );
};

export default Dashboard;
