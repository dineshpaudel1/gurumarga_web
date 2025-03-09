import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaBook, FaUsers } from "react-icons/fa";
import { fetchCourses, deleteCourse } from "../../Apis/CourseApi";
import EditCourseModal from "../../pages/teacher/EditCourseModel";
import CourseContext from "../../context/CourseInfoProvider";

const TeacherDashboard = () => {
  return (
    <div className="p-5">
      <TeacherCourses />
    </div>
  );
};

const TeacherCourses = () => {
  const { deleteCourse } = useContext(CourseContext);
  const [courses, setCourses] = useState([]);
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
    <div className="bg-white p-6 rounded-lg">
     

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`http://localhost:8080${course.thumbnail}`}
              alt={course.courseTitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-bold mb-2">{course.courseTitle}</h4>
              <p className="text-gray-700 mb-4">NPR {course.price}</p>
              
            </div>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <EditCourseModal
          isOpen={isEditModalOpen}
          course={selectedCourse}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;