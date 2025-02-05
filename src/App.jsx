import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./UserLayout";
import Home from "./user/Page/HomePage/Home";
import Login from "./components/login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./user/Page/UserProfile/Profile";
import { UserInfoProvider } from "./components/context/UserInfoProvider";
import AdminLayout from "./AdminLayout"; // Update the path if necessary
import Dashboard from "./admin/Pages/Dashboard";
import Coursedetail from "./user/Page/CourseDetail/Coursedetail";
import CourseAdmin from "./admin/Pages/CourseAdmin";
import SettingAdmin from "./admin/Pages/SettingAdmin";
import EnrollmentUser from "./user/Page/EnrollmentUser/EnrollmentUser";
import TeacherSection from "./user/Page/HomePage/TeacherSection";
import EsewaPayment from "./user/Page/EsewaPayment/EsewaPayment";
import UserAdmin from "./admin/Pages/UserAdmin";
import CategoryInfo from "./user/Page/CategoryInfo/CategoryInfo";
import CategoryAdmin from "./admin/Pages/CategoryAdmin";
import MyCourse from "./user/Page/MyCourse/MyCourse";
import BecomeTeacher from "./user/Page/BecomeTeacher/BecomeTeacher";
import Cart from "./user/Page/Cart/Cart";
import TeacherLayout from "./TeacherLayout";
import TeacherDashboard from "./teacher/Pages/TeacherDashboard";
import TeacherCourses from "./teacher/Pages/TeacherCourses";
import MasterAdmin from "./admin/Pages/MasterAdmin";
import EnrolledUser from "./teacher/Pages/EnrolledUser";
import AdminNotification from "./admin/Pages/AdminNotification";

function App() {
  return (
    <UserInfoProvider>
      <BrowserRouter>
        <Routes>
          {/* User routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/coursedetail/:id" element={<Coursedetail />} />
            <Route path="enrollmentuser" element={<EnrollmentUser />} />
            <Route path="sewa" element={<EsewaPayment />} />
            <Route path="teachersection" element={<TeacherSection />} />
            <Route path="/categories/:id" element={<CategoryInfo />} />
            <Route path="mycourse" element={<MyCourse />} />
            <Route path="becometeacher" element={<BecomeTeacher />} />
            <Route path="cart" element={<Cart />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="courseadmin" element={<CourseAdmin />} />
            <Route path="settingadmin" element={<SettingAdmin />} />
            <Route path="useradmin" element={<UserAdmin />} />
            <Route path="categoryadmin" element={<CategoryAdmin />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="adminnotification" element={<AdminNotification />} />
          </Route>

          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboard />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="settingadmin" element={<SettingAdmin />} />
            <Route path="teachercourse" element={<TeacherCourses />} />
            <Route path="enrolleduser" element={<EnrolledUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserInfoProvider>
  );
}

export default App;
