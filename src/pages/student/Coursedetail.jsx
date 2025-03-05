import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCourses } from "../../Apis/CourseApi";
import axios from "axios";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  const handlePrev = () => {
    const container = document.getElementById("recommended-courses-container");
    container.scrollLeft -= 300;
  };

  const handleNext = () => {
    const container = document.getElementById("recommended-courses-container");
    container.scrollLeft += 300;
  };

  const getCourseAndRecommendations = async (courseId) => {
    const courses = await fetchCourses();
    const selectedCourse = courses.find(
      (course) => course.id === parseInt(courseId)
    );
    setCourse(selectedCourse || {});
    setInstructor(selectedCourse?.instructor || {}); // Assuming instructor data is part of the course object

    try {
      const response = await axios.get(
        `http://localhost:8080/api/courses/${courseId}/recommendations`
      );
      setRecommendedCourses(response.data);
    } catch (error) {
      console.error("Error fetching recommended courses:", error);
    }
  };

  useEffect(() => {
    getCourseAndRecommendations(id);
  }, [id]);

  const handleRecommendedCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
    getCourseAndRecommendations(courseId); // Update course details immediately
  };

  const handleEnroll = () => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      navigate("/enrollmentuser", { state: { course } });
    } else {
      navigate("/login");
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Combined Hero & Instructor Section */}
      <section className="py-16 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
            {/* Top Gradient Banner */}
            <div
              className="h-48 relative gradient-bg"
              style={{
                background: "linear-gradient(135deg, #3B3F58 0%, #2A2D3E 100%)",
              }}
            >
              <div className="absolute -bottom-12 left-8">
                <img
                  src={
                    course.thumbnail
                      ? `http://localhost:8080${course.thumbnail}`
                      : "/path/to/placeholder-image.jpg"
                  }
                  alt={course.courseTitle}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl shadow-lg border-4 border-white transition-transform transform hover:scale-105 duration-300"
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="pt-16 px-8 pb-8 md:px-12">
              <div className="flex flex-col lg:flex-row">
                {/* Course Information */}
                <div className="w-full lg:w-2/3 space-y-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
                    {course.courseTitle}
                  </h1>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {course.courseDescription}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-secondary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        <span className="font-medium">Duration:</span> 10 hours
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-secondary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span className="text-gray-700">
                        <span className="font-medium">Subscribers:</span> 1200
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-secondary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      <span className="text-gray-700">
                        <span className="font-medium">Lectures:</span> 50
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-700">
                        <span className="font-medium">Rating:</span> 4.7
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-primary">
                        NPR {course.price}
                      </span>
                      <button
                        onClick={handleEnroll}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Instructor Card */}
                <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:pl-8">
                  <div className="bg-gray-50 rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold text-primary mb-4">
                      Your Instructor
                    </h2>
                    <div className="flex items-center mb-4">
                      <img
                        src={
                          course.thumbnail
                            ? `http://localhost:8080${course.thumbnail}`
                            : "/path/to/placeholder-image.jpg"
                        }
                        alt={instructor?.name}
                        className="w-16 h-16 rounded-full mr-4 border-2 border-secondary"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-primary">
                          Dinesh Paudel
                        </h3>
                        <div className="flex items-center text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Expert instructor with years of experience in teaching and
                      industry practice.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-white rounded-lg p-3 text-center">
                        <span className="block text-lg font-bold text-primary">
                          15+
                        </span>
                        <span className="text-sm text-gray-500">Courses</span>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <span className="block text-lg font-bold text-primary">
                          10k+
                        </span>
                        <span className="text-sm text-gray-500">Students</span>
                      </div>
                    </div>
                    <a
                      href={`/instructor/${instructor?.id}`}
                      className="block w-full text-center py-2 px-4 bg-blue-500 border border-secondary text-white hover:bg-secondary hover:text-white rounded-lg transition duration-300"
                    >
                      View All Courses
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Features */}
            <div className="bg-gray-50 px-8 py-6 md:px-12">
              <h2 className="text-xl font-bold text-primary mb-4">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="list-disc pl-5">
                  <li>Full Basic of Web Development</li>
                  <li>Full Basic of Web Development</li>
                  <li>Full Basic of Web Development</li>
                </ul>
                {course.features?.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Hello</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;