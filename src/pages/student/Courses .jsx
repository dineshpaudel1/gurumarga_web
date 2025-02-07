import React, { useEffect, useState } from "react";
import ScrollableCourseSection from "./ScrollableCourseSection ";
import { fetchCourses } from "../../Apis/CourseApi";

const Courses = () => {
  const [ddata, setData] = useState([]);
  const [cdata, setcData] = useState([]);
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
  const fetchcData = async () => {
    try {
      const courses = await fetchCourses();
      setcData(courses);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchcData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative container mx-auto px-4 py-8">
      <ScrollableCourseSection title="Featured Courses" courses={ddata} />
      <ScrollableCourseSection title="Highest Rank Course" courses={cdata} />
    </div>
  );
};

export default Courses;
