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
  const [expandedSections, setExpandedSections] = useState({}); // State to manage dropdown toggle

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

  // Function to toggle dropdown for a section
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId], // Toggle the state for the section
    }));
  };

  if (!course) return <div>Loading...</div>;

  // Static course content data (replace with dynamic data if available)
  const courseContent = [
    {
      id: 1,
      title: "Section 1: Introduction to Web Development",
      duration: "1 hour",
      lectures: [
        { id: 1, title: "1.1 What is Web Development?", duration: "10 min", preview: true },
        { id: 2, title: "1.2 Setting Up Your Environment", duration: "15 min", preview: false },
        { id: 3, title: "1.3 HTML Basics", duration: "20 min", preview: true },
      ],
    },
    {
      id: 2,
      title: "Section 2: CSS Fundamentals",
      duration: "2 hours",
      lectures: [
        { id: 4, title: "2.1 Introduction to CSS", duration: "15 min", preview: true },
        { id: 5, title: "2.2 CSS Selectors", duration: "20 min", preview: false },
        { id: 6, title: "2.3 Flexbox and Grid", duration: "25 min", preview: true },
      ],
    },
    {
      id: 3,
      title: "Section 3: JavaScript Basics",
      duration: "1.5 hours",
      lectures: [
        { id: 7, title: "3.1 Introduction to JavaScript", duration: "15 min", preview: true },
        { id: 8, title: "3.2 Variables and Data Types", duration: "20 min", preview: false },
        { id: 9, title: "3.3 Functions and Loops", duration: "25 min", preview: true },
      ],
    },
  ];

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

                  {/* Course Features Moved to Bottom */}
                  <div className="bg-gray-50 p-6 rounded-lg mt-8">
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
                          <span>{feature}</span>
                        </div>
                      ))}
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
          </div>
        </div>
      </section>

      {/* Course Content Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Course Content</h2>
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            {/* Course Content List */}
            {courseContent.map((section) => (
              <div key={section.id} className="mb-6">
                {/* Section Header */}
                <div
                  className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleSection(section.id)}
                >
                  <h3 className="text-lg font-semibold text-primary">
                    {section.title}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      {section.duration}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 text-gray-500 transform transition-transform ${
                        expandedSections[section.id] ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Lecture List (Dropdown) */}
                {expandedSections[section.id] && (
                  <div className="mt-2 space-y-2">
                    {section.lectures.map((lecture) => (
                      <div
                        key={lecture.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700">{lecture.title}</span>
                          {lecture.preview && (
                            <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded">
                              Preview
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {lecture.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;