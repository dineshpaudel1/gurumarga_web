import React from "react";
import Courses from "../CourseSection/Courses ";
import Cover from "./Cover";
import Category from "./Category";

const Home = () => {
  return (
    <div>
      <Cover />
      <Courses />
      <Category />
    </div>
  );
};

export default Home;
