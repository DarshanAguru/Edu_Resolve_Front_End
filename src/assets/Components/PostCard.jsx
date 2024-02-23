import React from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import Male from "../images/boy.png";
import Female from "../images/girl.png";

export default function PostCard({ post = false, user }) {
  const [showComments, setShowComments] = React.useState(false);
  const { messageData, messageSenderGender, messageSenderName } = user;
  console.log(messageSenderGender);
  return (
    <div className="border border-gray-300 bg-white shadow-sm p-2 px-5 flex flex-col gap-6 mt-5 mb-10 mr-5">
      <div className="flex items-center gap-2.5">
        <img
          src={messageSenderGender === "Male" ? Male : Female}
          alt="profile-img"
          className="w-10 h-10"
        />
        <p className="font-bold">{messageSenderName}</p>
      </div>
      <p>{messageData} </p>
      <div className="flex items-center gap-2.5">
        <button>
          <AiOutlineLike className="text-blue-500 text-xl" />
        </button>
        <p>112</p>
        <button>
          <AiOutlineDislike className="text-red-500 text-xl" />
        </button>

        <p>2</p>
        <button onClick={() => setShowComments((prev) => !prev)}>
          <RiQuestionAnswerLine className="text-xl" />
        </button>
        <p>2 answered</p>
        {post && (
          <>
            <LiaHandsHelpingSolid className="text-green-500" />
          </>
        )}
      </div>
      <div className={`${!showComments && "hidden"}`}>
        <p>comments</p>
      </div>
    </div>
  );
}
