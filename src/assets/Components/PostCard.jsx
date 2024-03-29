/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { RiQuestionAnswerLine } from "react-icons/ri";
import api from '../api'
import { IoMdSend } from "react-icons/io";
import { TiUpload } from "react-icons/ti";

import PostCardComments from "./PostCardComments";
import useSenderImage from "../hooks/useSenderImage";

export default function PostCard({ user, userType, refresh }) {
  const { _id, name, gender, token } = JSON.parse(
    localStorage.getItem(userType)
  );

  const profileImg = useSenderImage(gender, "students");
  const [showComments, setShowComments] = React.useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
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

  useEffect(() => {
    setLiked(upvote.filter((user) => user === _id).length > 0);
    setDisliked(downvote.filter((user) => user === _id).length > 0);
  }, [upvote, downvote, _id]);

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
    const res = await api.post(
      `/messages/addreply/${messageId}`,
      {
        senderId: _id,
        senderType:
          userType === "student"
            ? "students"
            : userType === "teacher"
              ? "teachers"
              : "mentors",
        senderName: name,
        message: comment,
        senderGender: messageSenderGender,
        imageLink: imageURL,
        token: token,
        id: _id,
      }
    );
    setCommentData({ comment: "", imageURL: "" });
    refresh();
  };

  //Handle Like
  const handleLike = async () => {
    // e.preventDefault();
    const res = await api.post(
      `/messages/upvote/${messageId}`,
      { token: token, id: _id, userId: _id }
    );
    console.log(res.data);
    refresh();
  };

  //Handle DisLike
  const handleDisLike = async () => {
    // e.preventDefault();
    await api.post(`/messages/downvote/${messageId}`, {
      token: token,
      id: _id,
      userId: _id,
    });

    refresh();
  };

  return (
    <div className=" bg-white shadow-custom p-2 px-5 flex flex-col gap-6 mt-5 mb-10 mx-2 rounded-md">
      <div className="flex items-center gap-2.5">
        <img src={profileImg} alt="profile-img" className="w-10 h-10" />
        <div>
          <p className="font-bold">{messageSenderName}</p>
          <p className="text-sm font-light">{school}</p>
        </div>
      </div>
      <p>{messageData} </p>
      <div className="flex  items-center gap-2.5">
        <div className="flex">
          <button onClick={() => handleLike()}>
            {!liked ? (
              <AiOutlineLike className="text-blue-500 text-xl" />
            ) : (
              <AiFillLike className="text-blue-500 text-xl" />
            )}
          </button>
          <p>{upvote.length}</p>
        </div>
        <div className="flex ">
          <button onClick={() => handleDisLike()}>
            {!disliked ? (
              <AiOutlineDislike className="text-red-500 text-xl" />
            ) : (
              <AiFillDislike className="text-red-500 text-xl" />
            )}
          </button>

          <p>{downvote.length}</p>
        </div>
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
          <div className="flex ">
            <div className="relative w-full">
              <textarea
                name="comment"
                onChange={handleChange}
                value={commentData.comment}
                className="border border-[#917a686f] pl-4 pt-2 text-lg w-full resize-none box-border h-16"
                placeholder="Enter your answer here"
              />
              <button type="button" onClick={handleImageUpload}>
                <TiUpload
                  className={`absolute top-0 bottom-0 right-3 my-auto text-xl text-[#917a68d2] ${showImage && "animate-bounce"}`}
                />
              </button>
            </div>
            <button
              type="submit"
              className="text-[#917A68] border border-[#917a686f] rounded-r-full  px-5 h-16  hover:bg-[#917A68] hover:text-white"
            >
              <IoMdSend />
            </button>
          </div>
        </form>
        {replies.length > 0 &&
          replies.map((reply, index) => (
            <>
              {console.log(reply)}
              <PostCardComments key={index} reply={reply} />
            </>
          ))}
      </div>
    </div>
  );
}
