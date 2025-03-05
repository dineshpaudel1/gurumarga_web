import React, { useEffect, useState } from "react";
import { FaBook, FaClipboardList, FaDollarSign, FaUser } from "react-icons/fa";
import { fetchCourses } from "../../Apis/CourseApi";
import { fetchEnrolledUserCount } from "../../Apis/EnrollmentApi";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const [courseCount, setCourseCount] = useState(0);
  const [enrolledUserCount, setEnrolledUserCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  // const [latestEnrollments, setLatestEnrollments] = useState([]);

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

    // const getLatestEnrollments = async () => {
    //   const data = await fetchLatestEnrollments();
    //   setLatestEnrollments(data);
    // };

    getCourses();
    getEnrolledUsers();
    // getLatestEnrollments();
  }, []);

  return (
    <div className="p-6">
      {/* Cards Section */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Link
          to="/teacher/teachercourse"
          className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
        >
          <FaBook className="text-4xl text-blue-600 mx-auto mb-3" />
          <h2 className="text-xl font-semibold">Total Courses</h2>
          <p className="text-lg text-gray-600">{courseCount}</p>
        </Link>

        <Link
          to="/teacher/enrolleduser"
          className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
        >
          <FaClipboardList className="text-4xl text-green-600 mx-auto mb-3" />
          <h2 className="text-xl font-semibold">Enrolled Users</h2>
          <p className="text-lg text-gray-600">{enrolledUserCount}</p>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaDollarSign className="text-4xl text-yellow-500 mx-auto mb-3" />
          <h2 className="text-xl font-semibold">Total Earnings</h2>
          <p className="text-lg text-gray-600">${totalEarnings}</p>
        </div>
      </div>

      {/* Latest Enrollments Table */}
      <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Latest Enrollments</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="text-left p-3">SN</th>
              <th className="text-left p-3">Student</th>
              <th className="text-left p-3">Course Title</th>
            </tr>
          </thead>
          <tbody>
            {/* {latestEnrollments.length > 0 ? (
              latestEnrollments.map((enrollment, index) => (
                <tr key={enrollment.id} className="border-b">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 flex items-center">
                    <img
                      src={enrollment.studentProfile || "/default-profile.png"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    {enrollment.studentName}
                  </td>
                  <td className="p-3">{enrollment.courseTitle}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-3 text-gray-500">
                  No recent enrollments
                </td>
              </tr>
            )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherDashboard;
