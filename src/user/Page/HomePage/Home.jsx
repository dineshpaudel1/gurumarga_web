import React from "react";
import Courses from "../CourseSection/Courses ";
import Cover from "./Cover";
import Category from "./Category";
import TeacherSection from "./TeacherSection";
import AboutInstructor from "./AboutInstructor";
import BecomeTeacher from "../BecomeTeacher/BecomeTeacher";

const Home = () => {
  return (
    <div>
      <Cover />
      <Courses />
      <Category />
      <BecomeTeacher />
    </div>
  );
};

export default Home;
