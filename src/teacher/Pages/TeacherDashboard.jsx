import React, { useEffect, useState } from "react";
import { FaBook, FaClipboardList } from "react-icons/fa";
import { fetchCourses } from "../../components/Apis/CourseApi";
import { fetchTotalUserCount } from "../../components/Apis/UserApi";
import { fetchEnrolledUserCount } from "../../components/Apis/EnrollmentApi";
import { fetchCategories } from "../../components/Apis/CategoryApi";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const [courseCount, setCourseCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [enrolledUserCount, setEnrolledUserCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getCourses = async () => {
      const data = await fetchCourses();
      setCourseCount(data.length);
    };
    const getCategoryCount = async () => {
      const data = await fetchCategories();
      setCategoryCount(data.length);
    };
    const getUsers = async () => {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const count = await fetchTotalUserCount(accessToken);
        setUserCount(count);
      }
    };
    const getEnrolledUsers = async () => {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const count = await fetchEnrolledUserCount(accessToken);
        setEnrolledUserCount(count);
      }
    };

    getCourses();
    getUsers();
    getEnrolledUsers();
    getCategoryCount();
  }, []);

  const handleTotalCourseClick = () => {
    navigate("/teacher/teachercourse");
  };

  const handleEnrolledUserClick = () => {
    navigate("/teacher/enrolleduser");
  };

  return (
    <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10">
      <div
        className="bg-[#1a237e] p-6 rounded-lg text-white text-center shadow-md cursor-pointer hover:bg-[#3949ab] transition duration-300"
        onClick={handleTotalCourseClick}
      >
        <FaBook className="text-4xl mb-2 mx-auto" />
        <h2 className="text-2xl font-bold">Total Course</h2>
        <p className="text-lg">{courseCount}</p>
      </div>

      <div
        className="bg-[#5e17eb] p-6 rounded-lg text-white text-center shadow-md cursor-pointer hover:bg-[#7e57c2] transition duration-300"
        onClick={handleEnrolledUserClick}
      >
        <FaClipboardList className="text-4xl mb-2 mx-auto" />
        <h2 className="text-2xl font-bold">Enrolled Users</h2>
        <p className="text-lg">{enrolledUserCount}</p>
      </div>
    </div>
  );
};

export default TeacherDashboard;
