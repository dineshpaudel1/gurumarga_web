import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const CourseCard = ({ course }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (course && Object.keys(course).length > 0) {
        setLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [course]);

  const addToCart = () => {
    if (!course) return;

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isCourseInCart = existingCart.some((item) => item.id === course.id);

    if (isCourseInCart) {
      alert("This course is already in the cart.");
      return;
    }

    const updatedCart = [...existingCart, { ...course, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Course added to cart!");
  };

  return (
    <div className="bg-white shadow-md rounded-lg flex-shrink-0 w-72">
      {loading ? (
        // Skeleton Loader
        <div className="animate-pulse">
          <div className="h-40 bg-gray-300 rounded-t-lg"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      ) : course && Object.keys(course).length > 0 ? (
        // Actual Course Content
        <Link to={`/coursedetail/${course.id}`}>
          <img
            src={`http://localhost:8080${course.thumbnail}`}
            alt="Course Thumbnail"
            className="w-full h-40 object-cover rounded-t-lg"
            onError={(e) => (e.target.src = "/path/to/placeholder-image.jpg")}
          />
          <div className="p-4">
            <h3 className="font-semibold text-xl text-gray-900 truncate">
              {course.courseTitle}
            </h3>
            <p className="text-sm text-gray-500 mt-1 truncate">
              {course.courseDescription}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Category: <span className="font-medium">{course.category}</span>
            </p>

            <div className="flex items-center mt-2">
              <FaStar className="w-4 h-4 text-yellow-500" />
              <span className="ml-1 text-yellow-500">4.7</span>
              <span className="ml-2 text-sm text-gray-500">
                (1,234 ratings)
              </span>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-lg text-gray-800 font-bold">
                NRS {course.price}
              </span>
            </div>
            <button
              onClick={addToCart}
              className="mt-5 w-full bg-[#5e17eb] hover:bg-[#5e17eb]/90 text-white py-2 rounded-lg"
            >
              Add to Cart
            </button>
          </div>
        </Link>
      ) : (
        <p className="text-gray-500 p-4">Course data not available</p>
      )}
    </div>
  );
};

export default CourseCard;
