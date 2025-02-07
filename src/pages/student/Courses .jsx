import React, { useContext, useEffect, useState } from "react";
import ScrollableCourseSection from "./ScrollableCourseSection ";
import { fetchCourses } from "../../Apis/CourseApi";
import CourseContext from "../../context/CourseInfoProvider";

const Courses = () => {
  const { courses } = useContext(CourseContext);

  return (
    <div className="relative container mx-auto px-4 py-8">
      <ScrollableCourseSection title="Featured Courses" courses={courses} />
      <ScrollableCourseSection title="Highest Rank Course" courses={courses} />
    </div>
  );
};

export default Courses;
