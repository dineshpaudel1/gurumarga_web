import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const CourseCard = ({ course }) => {
  const [loading, setLoading] = useState(true);

  const defaultCourse = {
    courseTitle: "Course Title Not Available",
    courseDescription: "No description available.",
    category: "Category Not Available",
    price: "0",
    rating: 0,
    reviewsCount: 0,
    thumbnail: "/path/to/placeholder-image.jpg",
    instructor: { name: "Instructor Name" },
    duration: "10h",
    lessonsCount: 24,
  };

  useEffect(() => {
    if (course && Object.keys(course).length > 0) {
      setLoading(false); // Data is valid, stop loading
    } else {
      setLoading(false); // Data is invalid, stop loading
    }
  }, [course]);

  // Fallback to default values if data is missing
  const {
    courseTitle,
    courseDescription,
    category,
    price,
    rating,
    reviewsCount,
    thumbnail,
    instructor = { name: "Instructor Name" },
    duration,
    lessonsCount,
  } = course || defaultCourse;

  return (
    <div className="course-card transition-all duration-300 rounded-lg overflow-hidden bg-white shadow-lg hover:transform hover:scale-105 hover:shadow-2xl flex flex-col max-w-xs mx-2 my-3">
      {loading ? (
        // Skeleton Loader
        <div className="animate-pulse">
          <div className="h-36 bg-gray-300 rounded-t-lg"></div>
          <div className="p-3">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      ) : (
        // Course Content
        <Link to={`/coursedetail/${course.id}`} className="block h-full">
          <div className="relative course-image overflow-hidden h-36">
            <img
              src={`http://localhost:8080${thumbnail}`}
              alt={courseTitle}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              onError={(e) => (e.target.src = "/path/to/placeholder-image.jpg")}
            />
            <div className="price-tag absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-lg font-semibold text-xs backdrop-blur-md">
              NRS {price}
            </div>
          </div>
          <div className="p-3 flex-grow flex flex-col">
            <div className="flex items-center mb-1">
              <div className="rating-stars flex items-center text-yellow-500">
                <FaStar className="w-3 h-3" />
                <span className="ml-1 text-sm">{4.7}</span>
              </div>
              <span className="ml-2 text-xs text-gray-500">(1220)</span>
            </div>
            <h3 className="text-sm font-semibold text-[#3B3F58] mb-1 line-clamp-2 h-10">{courseTitle}</h3>
            <div className="flex items-center mt-auto pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-600">Dinesh Paudel</span>
            </div>
          </div>
          <div className="bg-[#F3F4F6] px-3 py-2 flex justify-between items-center text-xs">
            <div className="flex items-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              10 total hours
            </div>
            <div className="flex items-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              20
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default CourseCard;
