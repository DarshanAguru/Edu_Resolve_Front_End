import React from "react";
const FormInput = ({
  label,
  id,
  type = "text",
  options,
  comment,
  onChange,
  required,
  pattern,
  title,
  is = "",
  placeholder = "",
}) => (
  <div className="mt-10 xl:mt-3">
    <label
      htmlFor={id}
      className={
        is === "dashboard"
          ? `hidden`
          : `text-2xl xl:text-xl xl:flex xl:gap-4  xl:items-center font-Montserrat cursor-pointer`
      }
    >
      {label}
      {comment ? (
        <span className="xl:text-sm text-red-300 text-center">{comment}</span>
      ) : (
        ""
      )}
    </label>
    {type === "select" ? (
      <select
        id={id}
        className={
          is === "dashboard"
            ? `form-select absolute top-48 right-auto left-auto font-Montserrat border-[#D3C9C9] bg-white shadow-lg py-2 px-2  xl:top-32 xl:right-20 `
            : `form-select border font-Montserrat border-[#D3C9C9] bg-white shadow-lg w-full mt-5 xl:py-2 py-5 px-2 text-xl xl:text-lg`
        }
        onChange={onChange}
        required={required}
      >
        <option value="">{placeholder || "Please select..."}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        className="form-input border font-Montserrat border-[#D3C9C9] bg-white shadow-lg w-full mt-5 xl:py-2 py-5 px-2 text-xl xl:text-lg"
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        pattern={pattern}
        title={title}
      />
    )}
  </div>
);
export default FormInput;