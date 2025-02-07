import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const CourseContext = createContext();

export const CourseInfoProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [topcourses, setTopCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/courses");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const deleteCourse = async (id, accessToken) => {
    try {
      const response = await fetch(`http://localhost:8080/api/teacher/${id}`, {
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
      const response = await fetch("http://localhost:8080/api/teacher/add", {
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
      const response = await fetch(
        `http://localhost:8080/api/admin/${courseId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }
      );

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

  return (
    <CourseContext.Provider
      value={{ courses, fetchCourses, deleteCourse, addCourse, updateCourse }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
