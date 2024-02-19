import React, { useState } from "react";
import Button from "../Components/Button";
import FormInput from "../Components/FormInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const formFields = [
  { label: "Name", id: "name", placeholder: "Enter name", required: true },
  {
    label: "Email",
    id: "emailId",
    placeholder: "Enter email",
    required: true,
    type: "email",
  },
  {
    label: "Age",
    id: "age",
    placeholder: "Enter Age",
    required: true,
    type: "number",
  },
  { label: "Grade", id: "grade", placeholder: "Enter Grade", required: true },
  {
    label: "School",
    id: "school",
    placeholder: "Enter School",
    required: true,
  },
  {
    label: "Gender",
    id: "gender",
    type: "select",
    options: ["Male", "Female", "Prefer not to say"],
    required: true,
  },
  {
    label: "Phone number",
    id: "phoneNumber",
    placeholder: "Enter Phone number",
    required: true,
    pattern: "\\d{10}",
    title: "Phone number should be 10 digits",
  },
  {
    label: "Password",
    id: "password",
    placeholder: "Enter password",
    type: "password",
    required: true,
    minLength: 8,
    title: "Password must be at least 8 characters long",
  },
];

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    phonenumber: "",
    name: "",
    emailId: "",
    grade: "",
    age: "",
    gender: "",
    school: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:9000/students/register",
        formData
      );
      console.log("From server", response.data);
      localStorage.setItem("user", response.data);
      navigate("/student");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="xl:mx-auto">
      <p className="text-center mt-5 font-bold font-Montserrat text-3xl">
        Student Signup
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-10 my-2 xl:grid xl:grid-cols-2 gap-4"
      >
        {formFields.map((field) => (
          <FormInput key={field.id} {...field} onChange={handleChange} />
        ))}
        <Button
          type="submit"
          style="border-none text-white font-Montserrat text-3xl xl:text-2xl leading-normal rounded bg-[#917A68] my-2.5 mx-auto px-10 mt-2 shadow-lg w-full py-4 hover:bg-[#282323] hover:font-bold cursor-pointer col-span-2"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default StudentRegistration;
