import React, { useState, useEffect } from "react";
import ProfileCard from "../../Components/ProfileCard";
import ProgressCard from "../../Components/ProgressCard";
import PostCard from "../../Components/PostCard";
import axios from "axios";

const StudentProfile = () => {
  const data = JSON.parse(localStorage.getItem("student"));
  const { token, _id } = data;
  const [messages, setMessages] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  console.log(data);
  useEffect(() => {
    async function getMessages() {
      try {
        const { data } = await axios.post(
          `http://localhost:9000/messages/getAllMessages`,
          { token: token, id: _id }
        );
        console.log(data);
        const filteredMessages = data
          .reverse()
          .filter((message) => message.messageId.split("@")[0] === _id);
        setMessages(filteredMessages);
      } catch (e) {
        console.log("Messages are not retreived", e);
      }
    }
    getMessages();
  }, [refresh]);
  const setProgress = () => setShowProgress((prev) => !prev);
  return (
    <div className=" lg:mx-0 lg:grid lg:grid-cols-3 sm:mx-10">
      <ProfileCard className=" col-span-1" data={data} userType="students" />
      <div className="col-span-2    border ">
        <div className="flex justify-center items-start p-5 gap-10 ">
          <button
            className={`${!showProgress ? "shadow-custom p-3 rounded-full w-auto bg-[#917A68] text-white font-Montserrat font-bold" : "p-3 font-bold font-Montserrat"}`}
            disabled={!showProgress}
            onClick={setProgress}
          >
            Progress
          </button>
          <button
            className={`${showProgress ? "shadow-custom p-3 rounded-full w-auto bg-[#917A68] text-white font-Montserrat font-bold" : "p-3 font-bold font-Montserrat"}`}
            disabled={showProgress}
            onClick={setProgress}
          >
            Query Posts
          </button>
        </div>
        {showProgress ? (
          messages.map((message) => (
            <>
              <PostCard
                key={message.messageId}
                user={message}
                refresh={() => setRefresh((prev) => !prev)}
              />
            </>
          ))
        ) : (
          <ProgressCard />
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
