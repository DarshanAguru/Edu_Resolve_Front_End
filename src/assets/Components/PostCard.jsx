import React from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import boy from "../images/boy.png";

export default function QueryCard({ post = false }) {
  return (
    <div className="border border-gray-300 bg-white shadow-sm p-2 px-5 flex flex-col gap-6 mt-5 mb-10">
      <div className="flex items-center gap-2.5">
        <img src={`${boy}`} alt="profile-img" className="w-10 h-10" />
        <p className="font-bold">Saran Kowshik</p>
      </div>
      <p> What is the real time scenario for newtons first law?</p>
      <div className="flex items-center gap-2.5">
        
        <button>
          <AiOutlineLike className="text-blue-500 text-xl" />
        </button>
        <p>112</p>
        <button>
          <AiOutlineDislike className="text-red-500 text-xl" />
        </button>

        <p>2</p>
        <button>
          <RiQuestionAnswerLine className="text-xl" />
        </button>
        <p>2 answered</p>
        {post && (
          <>
            <LiaHandsHelpingSolid className="text-green-500" />
          </>
        )}
      </div>
    </div>
  );
}
