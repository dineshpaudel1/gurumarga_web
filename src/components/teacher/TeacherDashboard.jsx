import React, { useEffect, useState } from "react";
import { FaBook, FaClipboardList } from "react-icons/fa";
import { fetchCourses } from "../../Apis/CourseApi";
import { fetchEnrolledUserCount } from "../../Apis/EnrollmentApi";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const [courseCount, setCourseCount] = useState(0);
  const [enrolledUserCount, setEnrolledUserCount] = useState(0);

  useEffect(() => {
    const getCourses = async () => {
      const data = await fetchCourses();
      setCourseCount(data.length);
    };
    const getEnrolledUsers = async () => {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const count = await fetchEnrolledUserCount(accessToken);
        setEnrolledUserCount(count);
      }
    };
    getCourses();
    getEnrolledUsers();
  }, []);

  return (
    <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10">
      <Link
        to="/teacher/teachercourse"
        className="bg-[#1a237e] p-6 rounded-lg text-white text-center shadow-md cursor-pointer hover:bg-[#3949ab] transition duration-300"
      >
        <FaBook className="text-4xl mb-2 mx-auto" />
        <h2 className="text-2xl font-bold">Total Course</h2>
        <p className="text-lg">{courseCount}</p>
      </Link>

      <Link
        to="/teacher/enrolleduser"
        className="bg-[#5e17eb] p-6 rounded-lg text-white text-center shadow-md cursor-pointer hover:bg-[#7e57c2] transition duration-300"
      >
        <FaClipboardList className="text-4xl mb-2 mx-auto" />
        <h2 className="text-2xl font-bold">Enrolled Users</h2>
        <p className="text-lg">{enrolledUserCount}</p>
      </Link>
    </div>
  );
};

export default TeacherDashboard;
