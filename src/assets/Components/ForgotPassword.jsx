import React, { useState } from "react";
import Button from "./Button";
import FormInput from "./FormInput";
import axios from "axios";
import { IoMdArrowBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const forgotPasswordFields = [
  {
    label: "OTP",
    id: "otp",
    placeholder: "Enter OTP",
    required: true,
    pattern: "\\d{6}",
    title: "OTP should be 6 digits",
  },
  {
    label: "New Password",
    id: "newPassword",
    placeholder: "Enter new password",
    type: "password",
    required: true,
    minLength: 8,
    title: "Password must be at least 8 characters long",
  },
  {
    label: "Re-enter New Password",
    id: "confirmNewPassword",
    placeholder: "Re-enter new password",
    type: "password",
    required: true,
    minLength: 8,
    title: "Passwords must match",
  },
];

const ForgotPassword = ({ goBack }) => {
  const [data, setData] = useState({
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const resetPasswordUrl = "http://localhost:9000/reset-password";
    try {
      const response = await axios.post(resetPasswordUrl, {
        otp: data.otp,
        newPassword: data.newPassword,
      });
      console.log(response.data);
      toast.success("Password reset successfully");
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="xl:mx-auto relative">
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
      <p className=" capitalize text-center mt-10 font-bold font-Montserrat text-2xl">
        Forgot Password
      </p>
      <button
        className="absolute top-0 left-0 flex items-center gap-1 font-Montserrat text-amber-700 underline py-2 px-2"
        onClick={() => goBack()}
      >
        <IoMdArrowBack /> Go back to login
      </button>
      <form onSubmit={handleSubmit} className="mx-10">
        {forgotPasswordFields.map((field) => (
          <FormInput
            key={field.id}
            {...field}
            value={data[field.id]}
            onChange={handleChange}
          />
        ))}
        <Button
          style="border-none text-white font-Montserrat text-2xl leading-normal rounded bg-[#917A68] my-2.5 mx-auto px-10 py-1 mt-10 shadow-lg w-full py-4 hover:bg-[#282323] hover:font-bold cursor-pointer"
          type="submit"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
