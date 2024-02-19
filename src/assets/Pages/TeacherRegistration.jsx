import React, { useState } from "react";
import Button from "../Components/Button";
import FormInput from "../Components/FormInput";
import FormCheckboxGroup from "../Components/FormCheckBoxGroup";
import axios from "axios";
const formFields = [
  { label: "Name", id: "name", placeholder: "Enter name", required: true },
  {
    label: "Email",
    id: "email",
    placeholder: "Enter email",
    required: true,
    type: "email",
  },
  {
    label: "Age",
    id: "Age",
    placeholder: "Enter Age",
    required: true,
    type: "number",
  },
  {
    label: "Gender",
    id: "gender",
    type: "select",
    options: ["Male", "Female", "Prefer not to say"],
    required: true,
  },
  {
    groupLabel: "Subject Expertise",
    id: "subjectExpertise",
    type: "checkbox",
    options: [
      { label: "Telugu", value: "telugu" },
      { label: "Hindi", value: "hindi" },
      { label: "English", value: "english" },
      { label: "Maths", value: "maths" },
      { label: "Science", value: "science" },
      { label: "Social", value: "social" },
    ],
  },
  {
    label: "Qualification",
    id: "qualification",
    placeholder: "Enter qualification",
    required: true,
  },
  {
    label: "Institution",
    id: "institution",
    placeholder: "Enter institution",
    required: true,
  },
  {
    label: "Phone number",
    id: "phone number",
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
const TeacherRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    qualification: "",
    subjectExpertise: [],
    resumeLink: "",
    phoneNumber: "",
    password: "",
  });
  const [isSubjectExpertiseValid, setIsSubjectExpertiseValid] = useState(true);
  //* State to track if subject expertise validation passes

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      //* Handle checkbox change
      const updatedSubjectExpertise = checked
        ? [...formData.subjectExpertise, value]
        : formData.subjectExpertise.filter((subject) => subject !== value);
      setFormData((prevState) => ({
        ...prevState,
        subjectExpertise: updatedSubjectExpertise,
      }));
      //* Validate checkbox group on change
      setIsSubjectExpertiseValid(updatedSubjectExpertise.length > 0);
    } else {
      //* Handle other input changes
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if at least one checkbox is checked
    if (!formData.subjectExpertise.length) {
      setIsSubjectExpertiseValid(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3301/", formData);
      console.log("Form Data submitted successfully", res.data);
      // Optionally reset form or redirect user after successful submission
    } catch (error) {
      console.log("Error submitting registration form", error);
    }
  };

  return (
    <div className="xl:mx-auto">
      <p className="text-center mt-5 font-bold font-Montserrat text-3xl">
        Teacher Signup
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-10 my-2 xl:grid xl:grid-cols-2  gap-4"
      >
        {formFields.map((field, index) =>
          field.type === "checkbox" ? (
            <FormCheckboxGroup
              key={index}
              {...field}
              onChange={handleChange}
              required={!isSubjectExpertiseValid}
            />
          ) : (
            <FormInput key={field.id} {...field} onChange={handleChange} />
          )
        )}

        <Button style="border-none text-white font-Montserrat text-3xl xl:text-2xl leading-normal rounded bg-[#917A68] my-2.5 mx-auto px-10 mt-2 shadow-lg w-full py-4 hover:bg-[#282323] hover:font-bold cursor-pointer col-span-2">
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default TeacherRegistration;
