import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Importing the star icon

const CourseCard = ({ course }) => {
  const [message, setMessage] = useState("");

  const addToCart = () => {
    // Get existing cart from localStorage or initialize an empty array
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the course is already in the cart
    const isCourseInCart = existingCart.some((item) => item.id === course.id);

    if (isCourseInCart) {
      alert("This course is already in the cart.");
      return;
    }

    // Add the course to the cart
    const updatedCart = [
      ...existingCart,
      { ...course, quantity: 1 }, // Add default quantity of 1
    ];

    // Save updated cart in localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("Course added to cart!");
  };

  return (
    <div className="bg-white shadow-md rounded-lg flex-shrink-0 w-72">
      <Link>
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

          {/* Rating Design */}
          <div className="flex items-center mt-2">
            <FaStar className="w-4 h-4 text-yellow-500" />
            <span className="ml-1 text-yellow-500">4.7</span>
            <span className="ml-2 text-sm text-gray-500">(1,234 ratings)</span>
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
    </div>
  );
};

export default CourseCard;
