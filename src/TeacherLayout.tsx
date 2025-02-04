import React from "react";
import { Outlet } from "react-router-dom";
import MasterDashboard from "./teacher/Pages/MasterDashboard";

const TeacherLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 flex flex-col">
        {/* Dashboard Header */}
        <div className="shadow-md bg-white">
          <MasterDashboard children={undefined} />
        </div>

        
      </main>
    </div>
  );
};

export default TeacherLayout;
