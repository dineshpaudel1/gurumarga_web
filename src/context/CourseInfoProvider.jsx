import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const CourseContext = createContext();
const BASE_URL = "http://localhost:8080/api";

export const CourseInfoProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/courses`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const deleteCourse = async (id, accessToken) => {
    try {
      const response = await fetch(`${BASE_URL}/teacher/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete course");
      }
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const addCourse = async (courseData, thumbnail, accessToken) => {
    const formData = new FormData();
    formData.append("course", JSON.stringify(courseData));
    formData.append("file", thumbnail);

    try {
      const response = await fetch(`${BASE_URL}/teacher/add`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const newCourse = await response.json();
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const updateCourse = async (
    courseId,
    updatedCourseData,
    thumbnail,
    accessToken
  ) => {
    const formData = new FormData();
    formData.append("course", JSON.stringify(updatedCourseData));
    if (thumbnail) {
      formData.append("file", thumbnail);
    }

    try {
      const response = await fetch(`${BASE_URL}/admin/${courseId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const updatedCourse = await response.json();
      setCourses(
        courses.map((course) =>
          course.id === courseId ? updatedCourse : course
        )
      );
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/category`);
      setCategoryInfo(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        categoryInfo,
        fetchCourses,
        deleteCourse,
        addCourse,
        updateCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
