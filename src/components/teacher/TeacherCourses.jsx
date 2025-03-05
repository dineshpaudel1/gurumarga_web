import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaBook, FaUsers } from "react-icons/fa";
import { fetchCourses, deleteCourse, updateCourse } from "../../Apis/CourseApi";
import AddCourse from "../../pages/teacher/AddCourse";
import EditCourseModal from "../../pages/teacher/EditCourseModel";
import CourseContext from "../../context/CourseInfoProvider";

const TeacherDashboard = () => {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Teacher Dashboard</h2>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg flex items-center">
          <FaBook className="text-blue-600 text-4xl mr-4" />
          <div>
            <p className="text-xl font-bold">Total Courses</p>
            <p className="text-2xl">12</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg flex items-center">
          <FaUsers className="text-green-600 text-4xl mr-4" />
          <div>
            <p className="text-xl font-bold">Total Enrollments</p>
            <p className="text-2xl">245</p>
          </div>
        </div>
      </div>
      <TeacherCourses />
    </div>
  );
};

const TeacherCourses = () => {
  const { deleteCourse } = useContext(CourseContext);
  const [courses, setCourses] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const accessToken = localStorage.getItem("token");

  const getCourses = async () => {
    const courseData = await fetchCourses();
    setCourses(courseData);
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleDeleteCourse = async (id) => {
    if (!accessToken) {
      console.error("Access token not found!");
      return;
    }
    const isDeleted = await deleteCourse(id, accessToken);
    if (isDeleted) {
      setCourses(courses.filter((course) => course.id !== id));
    } else {
      console.error("Failed to delete course");
    }
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Manage Courses</h3>
        
      </div>

      <div className="overflow-auto max-h-[400px]">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={`http://localhost:8080${course.thumbnail}`}
                    alt={course.courseTitle}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{course.courseTitle}</td>
                <td className="px-4 py-2 whitespace-nowrap">NPR {course.price}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button className="text-blue-500" onClick={() => handleEditCourse(course)}>
                    <FaEdit className="h-5 w-5" />
                  </button>
                  <button className="text-red-500" onClick={() => handleDeleteCourse(course.id)}>
                    <FaTrash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddCourse isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {selectedCourse && (
        <EditCourseModal isOpen={isEditModalOpen} course={selectedCourse} onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
};

export default TeacherDashboard;
