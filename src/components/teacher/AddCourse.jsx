import React, { useState, useEffect, useContext } from "react";
import CourseContext from "../../context/CourseInfoProvider"; // Adjust the import path as necessary

const AddCourse = () => {
  const [course, setCourse] = useState({
    courseTitle: "",
    courseDescription: "",
    category: "",
    price: "",
    instructorId: "", // Will be set from localStorage
    language: "",
  });

  console.log(course)

  const { categoryInfo, addCourse } = useContext(CourseContext); // Fetch categoryInfo and addCourse from context

  useEffect(() => {
    // Retrieve the instructor ID from localStorage and set it in the state
    const instructorId = localStorage.getItem("teacherid");
    if (instructorId) {
      setCourse((prevCourse) => ({
        ...prevCourse,
        instructorId: instructorId,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Course Data:", course);

    // Ensure the category field is not empty
    if (!course.category) {
      alert("Please select a category.");
      return;
    }

    // Retrieve the authentication token from localStorage
    const token = localStorage.getItem("token");

    try {
      // Call the addCourse function from the context
      await addCourse(course, token); // Pass only course data and token
      alert("Course added successfully!");
      // Reset the form (except instructorId)
      setCourse({
        courseTitle: "",
        courseDescription: "",
        category: "",
        price: "",
        instructorId: course.instructorId, // Keep the instructorId from localStorage
        language: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Error adding course. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Course</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          {/* Course Title */}
          <div className="mb-6">
            <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Course Title
            </label>
            <input
              type="text"
              id="courseTitle"
              name="courseTitle"
              value={course.courseTitle}
              onChange={handleChange}
              placeholder="Enter course title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Course Description */}
          <div className="mb-6">
            <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Course Description
            </label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={course.courseDescription}
              onChange={handleChange}
              placeholder="Enter course description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-6">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (NRS)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={course.price}
              onChange={handleChange}
              placeholder="Enter course price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Language */}
          <div className="mb-6">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={course.language}
              onChange={handleChange}
              placeholder="Enter course language"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={course.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categoryInfo && categoryInfo.map((category) => (
                <option key={category.id} value={category.Name}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;