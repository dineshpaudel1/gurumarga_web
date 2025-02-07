import React from "react";
import Courses from "../../pages/student/Courses ";
import Hero from "./Hero";
import Category from "./Category";
import { UserInfoProvider } from "../../context/UserInfoProvider";

const Home = () => {
  return (
    <div>
      <UserInfoProvider>
        <Hero />
        <Courses />
        <Category />
      </UserInfoProvider>
    </div>
  );
};

export default Home;
