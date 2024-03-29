import { Outlet } from "react-router-dom";
import StudentNavbar from "../Pages/Student/StudentNavbar";
const StudentLayout = () => {
  return (
    <>
      <StudentNavbar />
      <Outlet />
    </>
  );
};

export default StudentLayout;
