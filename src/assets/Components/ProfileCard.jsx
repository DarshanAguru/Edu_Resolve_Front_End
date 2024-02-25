import React from "react";
import useSenderImage from "../hooks/useSenderImage";
const ProfileCard = ({ data, userType }) => {
  const { _id, gender, name, grade, school, age, phoneNumber, emailId } = data;
  const image = useSenderImage(gender, userType);
  const editProfile = () => {};
  return (
    <div className=" shadow-custom p-5 m-5 box-border rounded-2xl lg:h-[80vh] flex flex-col flex-wrap gap-5 justify-center items-center">
      <p className="font-bold text-2xl font-MajorMono text-center ">profile</p>
      <div className="flex flex-wrap justify-center items-center gap-5">
        <div className="w-1/3">
          <img src={image} className=" border-2 border-black rounded-full " />
        </div>
        <div className=" font-Montserrat font-normal flex flex-col gap-3">
          <p className="font-bold">
            Name : <span className=" font-normal font-sans">{name}</span>
          </p>
          <p className="font-bold">
            Grade : <span className=" font-normal font-sans">{grade}</span>
          </p>

          <p className="font-bold">
            School :<span className=" font-normal font-sans"> {school}</span>
          </p>

          <p className="font-bold">
            Age : <span className=" font-normal font-sans">{age}</span>
          </p>

          <p className="font-bold">
            Phone Number :
            <span className=" font-normal font-sans"> {phoneNumber}</span>
          </p>

          <p className="font-bold">
            Email ID : <span className=" font-normal font-sans">{emailId}</span>
          </p>
        </div>
      </div>
      <button
        className="border-none text-white text-lg leading-normal rounded bg-[#917A68] mx-auto py-1 mt-2 shadow-lg w-1/3 hover:bg-[#282323] hover:font-bold cursor-pointer"
        onClick={editProfile}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
