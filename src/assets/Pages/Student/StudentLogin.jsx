import { useState } from "react";
import Login from "../../Components/Login";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const notify = (message) => toast.error(message);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/students/login",
        formData
      );
      localStorage.setItem("student", JSON.stringify(response.data));
      navigate("/student");
    } catch (error) {
      notify("Invalid Username Or Password");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Login
        user="student"
        data={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default StudentLogin;