import React, { useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiQuestionAnswerLine } from "react-icons/ri";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import { TiUpload } from "react-icons/ti";
import Male from "../images/boy.png";
import Female from "../images/girl.png";
import PostCardComments from "./PostCardComments";

export default function PostCard({ user, refresh }) {
  const { _id, name, gender, token } = JSON.parse(
    localStorage.getItem("student")
  );
  const [showComments, setShowComments] = React.useState(false);
  const {
    messageData,
    messageSenderGender,
    messageSenderName,
    messageId,
    replies,
    school,
    upvote,
    downvote,
  } = user;
  console.log(replies);
  // UseStates
  const [showImage, setShowImage] = useState(false);
  const [commentData, setCommentData] = useState({ comment: "", imageURL: "" });

  // Handling Image Upload
  const handleImageUpload = () => setShowImage((prev) => !prev);

  // Handling the change in the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prev) => ({ ...prev, [name]: value }));
  };

  // Reply handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { comment, imageURL } = commentData;
    const res = await axios.post(
      `http://localhost:9000/messages/addreply/${messageId}`,
      {
        senderId: _id,
        senderType: "students",
        senderName: name,
        message: comment,
        senderGender: gender,
        imageLink: imageURL,
        token: token,
        id: _id,
      }
    );
    console.log(res);
    setCommentData({ comment: "", imageURL: "" });
    refresh();
  };

  //Handle Like
  const handleLike = async () => {
    const res = await axios.post(
      `http://localhost:9000/messages/upvote/${messageId}`,
      { token: token, id: _id, userId: _id }
    );
    console.log(res);
    refresh();
  };

  //Handle DisLike
  const handleDisLike = async () => {
    const res = await axios.post(
      `http://localhost:9000/messages/downvote/${messageId}`,
      { token: token, id: _id, userId: _id }
    );
    console.log(res);
    refresh();
  };

  return (
    <div className=" bg-white shadow-custom p-2 px-5 flex flex-col gap-6 mt-5 mb-10 mx-2 rounded-md">
      <div className="flex items-center gap-2.5">
        <img
          src={messageSenderGender === "Male" ? Male : Female}
          alt="profile-img"
          className="w-10 h-10"
        />
        <div>
          <p className="font-bold">{messageSenderName}</p>
          <p className="text-sm font-light">{school}</p>
        </div>
      </div>
      <p>{messageData} </p>
      <div className="flex items-center gap-2.5">
        <button onClick={handleLike}>
          <AiOutlineLike className="text-blue-500 text-xl" />
        </button>
        <p>{upvote.length}</p>
        <button onClick={handleDisLike}>
          <AiOutlineDislike className="text-red-500 text-xl" />
        </button>

        <p>{downvote.length}</p>
        <button onClick={() => setShowComments((prev) => !prev)}>
          <RiQuestionAnswerLine className="text-xl" />
        </button>
        <p>{replies.length} answered</p>
      </div>
      <div className={`${!showComments && "hidden"}`}>
        <p className="font-bold">Comments</p>
        <form className=" m-2 " onSubmit={handleSubmit}>
          {showImage && (
            <input
              type="text"
              className="border border-[#917a686f]  py-2 pl-4 mb-2 text-lg w-full "
              placeholder="Enter your ImageURL here"
              name="imageURL"
              value={commentData.imageURL}
              onChange={handleChange}
            />
          )}
          <div className="flex">
            <div className="relative w-full">
              <input
                type="text"
                name="comment"
                onChange={handleChange}
                value={commentData.comment}
                className="border border-[#917a686f]   py-2 pl-4 text-lg w-full "
                placeholder="Enter your answer here"
              />
              <button type="button" onClick={handleImageUpload}>
                <TiUpload className="absolute top-0 bottom-0 right-3 my-auto text-xl text-[#917a68d2]" />
              </button>
            </div>
            <button
              type="submit"
              className="text-[#917A68] border border-[#917a686f] rounded-r-full px-5 hover:bg-[#917A68] hover:text-white"
            >
              <IoMdSend />
            </button>
          </div>
        </form>
        {replies.length > 0 &&
          replies.map((reply, index) => (
            <PostCardComments key={index} reply={reply} />
          ))}
      </div>
    </div>
  );
}
