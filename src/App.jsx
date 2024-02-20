import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./assets/Pages/HomePage";
import LoginSignupLayout from "./assets/Layout/LoginSignupLayout";
import StudentLogin from "./assets/Pages/StudentLogin";
import MentorLogin from "./assets/Pages/MentorLogin";
import TeacherLogin from "./assets/Pages/TeacherLogin";
import AdminLogin from "./assets/Pages/AdminLogin";
import OrgLogin from "./assets/Pages/OrgLogin";
import StudentRegistration from "./assets/Pages/StudentRegistration";
import MentorRegistration from "./assets/Pages/MentorRegistration";
import OrgRegistration from "./assets/Pages/OrgRegistration";
import TeacherRegistration from "./assets/Pages/TeacherRegistration";
import StudentLayout from "./assets/Layout/StudentLayout";
import MentorLayout from "./assets/Layout/MentorLayout";
import OrganisationLayout from "./assets/Layout/OrganisationLayout";
import TeacherLayout from "./assets/Layout/TeacherLayout";
import StudentHome from "./assets/Pages/Student/StudentHome";
import OrganisationHome from "./assets/Pages/Organisation/OrganisationHome";
import AdminLayout from "./assets/Layout/AdminLayout";
import AdminHome from "./assets/Pages/Admin/AdminHome";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<LoginSignupLayout />}>
        <Route path="studentLogin" element={<StudentLogin />} />
        <Route path="mentorLogin" element={<MentorLogin />} />
        <Route path="teacherLogin" element={<TeacherLogin />} />
        <Route path="organisationLogin" element={<OrgLogin />} />
        <Route path="adminLogin" element={<AdminLogin />} />
        <Route path="studentRegistration" element={<StudentRegistration />} />
        <Route path="mentorRegistration" element={<MentorRegistration />} />
        <Route path="teacherRegistration" element={<TeacherRegistration />} />
        <Route path="organisationRegistration" element={<OrgRegistration />} />
      </Route>
      <Route path="student" element={<StudentLayout />}>
        <Route index element={<StudentHome />} />
      </Route>
      <Route path="mentor" element={<MentorLayout />}></Route>
      <Route path="teacher" element={<TeacherLayout />}></Route>
      <Route path="organisation" element={<OrganisationLayout />}>
        <Route index element={<OrganisationHome />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
      </Route>
    </Routes>
  );
};

export default App;