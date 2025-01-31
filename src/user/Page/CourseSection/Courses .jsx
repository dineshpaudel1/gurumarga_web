import React, { useEffect, useState } from "react";
import ScrollableCourseSection from "./ScrollableCourseSection ";
import { fetchCourses } from "../../../components/Apis/CourseApi";

const Courses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const courses = await fetchCourses();
      setData(courses);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative container mx-auto px-4 py-8">
      <ScrollableCourseSection title="Featured Courses" courses={data} />
    </div>
  );
};

export default Courses;
