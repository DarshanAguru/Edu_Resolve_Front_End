import React from "react";

const PostCardComments = ({ reply }) => {
  const {senderGender,senderName,senderType,message}=reply
  return (
    <div className=" bg-white shadow-custom p-2 px-5 flex flex-col gap-6 mt-5 mb-10 mx-2 rounded-md">
      <div className="flex items-center gap-2.5">
        {console.log(reply)}
        <img
          src={senderGender === "Male" ? Male : Female}
          alt="profile-img"
          className="w-10 h-10"
        />
        <p className="font-bold">{senderName}</p>
      </div>
      <p>{message} </p>
    </div>
  );
};

export default PostCardComments;
