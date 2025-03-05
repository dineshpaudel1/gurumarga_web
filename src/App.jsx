import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/student/Home";
import Login from "./components/student/Login";
import Signup from "./components/student/Signup";
import Profile from "./pages/Profile";
import { UserInfoProvider } from "./context/UserInfoProvider";
import Dashboard from "./components/admin/Dashboard";
import Coursedetail from "./pages/student/Coursedetail";
import SettingAdmin from "./components/admin/SettingAdmin";
import EnrollmentUser from "./pages/student/EnrollmentUser";
import TeacherSection from "./pages/student/TeacherSection";
import UserAdmin from "./components/admin/UserAdmin";
import CategoryAdmin from "./components/admin/CategoryAdmin";
import BecomeTeacher from "./components/student/BecomeTeacher";
import Cart from "./components/student/Cart";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import TeacherCourses from "./components/teacher/TeacherCourses";
import MasterAdmin from "./components/admin/MasterAdmin";
import EnrolledUser from "./components/teacher/EnrolledUser";
import AdminNotification from "./components/admin/AdminNotification";
import MasterTeacher from "./components/teacher/MasterTeacher";
import MasterPage from "./components/student/MasterPage";
import { CourseInfoProvider } from "./context/CourseInfoProvider";
import AddCourse from "./components/teacher/AddCourse";

function App() {
  return (
    <UserInfoProvider>
      <CourseInfoProvider>
        <BrowserRouter>
          <Routes>
            {/* User routes */}

            <Route path="/" element={<MasterPage />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="profile" element={<Profile />} />
              <Route path="/coursedetail/:id" element={<Coursedetail />} />
              <Route path="enrollmentuser" element={<EnrollmentUser />} />
              <Route path="teachersection" element={<TeacherSection />} />
              <Route path="becometeacher" element={<BecomeTeacher />} />
              <Route path="cart" element={<Cart />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin" element={<MasterAdmin />}>
              <Route index element={<Dashboard />} />
              <Route path="settingadmin" element={<SettingAdmin />} />
              <Route path="useradmin" element={<UserAdmin />} />
              <Route path="categoryadmin" element={<CategoryAdmin />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="adminnotification" element={<AdminNotification />} />
            </Route>

            <Route path="/teacher" element={<MasterTeacher />}>
              <Route index element={<TeacherDashboard />} />
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="settingadmin" element={<SettingAdmin />} />
              <Route path="teachercourse" element={<TeacherCourses />} />
              <Route path="enrolleduser" element={<EnrolledUser />} />
              <Route path="addcourse" element={<AddCourse />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CourseInfoProvider>
    </UserInfoProvider>
  );
}

export default App;
