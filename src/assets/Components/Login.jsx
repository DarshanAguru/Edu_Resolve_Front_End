import React from "react";
import Button from "./Button";
import FormInput from "./FormInput";
import { Link } from "react-router-dom";
const formFields = [
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
const Login = ({ user, onChange, data, onSubmit, isAdmin = false }) => {
  return (
    <div className="xl:mx-auto">
      <p className=" capitalize text-center mt-10 font-bold font-Montserrat text-3xl">
        {user} Login
      </p>
      <form onSubmit={onSubmit} className=" mx-10 ">
        {formFields.map((field) => (
          <FormInput
            key={field.id}
            {...field}
            value={data[field.id]}
            onChange={onChange}
          />
        ))}
        <Link
          to=" "
          className="block text-2xl font-Montserrat mt-10 hover:underline-offset-4"
        >
          Forgot password?
        </Link>
        <Button
          style="border-none text-white font-Montserrat text-3xl leading-normal rounded bg-[#917A68] my-2.5 mx-auto px-10 py-1 mt-10 shadow-lg w-full py-4 hover:bg-[#282323] hover:font-bold cursor-pointer"
          type="submit"
        >
          Login
        </Button>

        {!isAdmin && (
          <>
            <p className="text-3xl font-light">New user?</p>
            <Button
              goTo={`/${user}Registration`}
              style=" bg-white font-Montserrat text-2xl leading-normal rounded-2xl text-[#917A68] my-2.5  underline underline-offset-8 mt-5"
            >
              Sign up as a {user}
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
