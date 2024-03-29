import { useState, useEffect } from "react";
import { data } from "../../data/facts";
import { quotes } from "../../data/quotes";
import PostCard from "../../Components/PostCard";
import { TiUpload } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import api from "../../api";

const StudentHome = () => {
  const backgroundImages = [
    "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  ];
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [formData, setFormData] = useState({ postText: "", imageUrl: "" });
  const [randomData, setRandomData] = useState("");
  const [randomQuote, setRandomQuote] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { _id, name, token, gender, school } = JSON.parse(
    localStorage.getItem("student")
  );
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setRandomData(data[Math.floor(Math.random() * data.length)]);
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    async function getMessages() {
      try {
        const { data } = await api.post(
          `/messages/getAllMessages`,
          { token, id: _id }
        );
        setMessages(data.reverse());
      } catch (e) {
        console.log("Messages are not retreived", e);
      }
    }
    getMessages();
  }, [refresh]);

  const handleUploadImageClick = () => {
    setShowImageUpload((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    toast.info("Post submitted!", { position: "top-center" });

    const data = {
      token: token,
      id: _id,
      school: school,
      messageData: formData.postText,
      gender: gender,
      name: name,
      imageLink: formData.imageUrl,
      tags: "",
    };

    await api.post(
      `/messages/addMessage/${_id}@${uuidv4()}`,
      data
    );
    setFormData({ postText: "", imageUrl: "" });
    setRefresh((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 m-5 ">
      <ToastContainer />
      {/* Maths and Science Facts */}
      <div
        className="flex-1 shadow-xl rounded-lg overflow-hidden  px-5 py-10 max-h-96 hidden xl:flex justify-center items-center"
        style={{
          backgroundImage: `url(${backgroundImages[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center justify-center">
          <div className="bg-[#0000008f] bg-opacity-60 backdrop-blur-sm p-5 rounded-lg">
            <h1 className="text-2xl text-center underline underline-offset-4  text-white  drop-shadow-2xl">
              Maths and Science Facts
            </h1>
            <p className="text-sm md:text-base text-white p-5 font-thin">
              {randomData}
            </p>
          </div>
        </div>
      </div>
      {/* Posts */}
      <div className=" flex-col w-full flex xl:w-1/2">
        <form className="relative" onSubmit={handleFormSubmit}>
          <textarea
            name="postText"
            placeholder="Post the queries here"
            className="bg-white pl-2 pt-2 border box-border resize-none border-gray-300 shadow-lg w-full text-lg"
            value={formData.postText}
            onChange={handleInputChange}
            required
          ></textarea>
          <div>
            <div
              className={`absolute top-5 right-3 cursor-pointer ${showImageUpload ? " text-cyan-700 animate-bounce" : " text-cyan-500"}`}
              onClick={handleUploadImageClick}
            >
              <TiUpload className=" text-xl text-[#917a68d2]" />
            </div>
            {showImageUpload && (
              <div>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Enter image URL here (optional)"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="border border-gray-300 shadow-lg py-2 px-2 text-lg w-full"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="border-none text-white text-xl leading-normal rounded bg-[#917A68] mx-auto py-1 mt-2 shadow-lg w-full hover:bg-[#282323] hover:font-bold cursor-pointer"
          >
            upload
          </button>
        </form>
        <div
          style={{
            maxHeight: `${!showImageUpload ? "calc(100vh - 16rem)" : "calc(100vh - 19rem)"}`,
            overflowY: "auto",
            marginTop: "10px",
          }}
        >
          {messages.map((message) => (
            <PostCard
              key={message.messageId}
              user={message}
              userType="student"
              refresh={() => setRefresh((prev) => !prev)}
            />
          ))}
        </div>
      </div>

      {/* Quotes */}
      <div
        className="flex-1 shadow-xl rounded-lg overflow-hidden justify-center items-center px-5 py-10 max-h-96 hidden xl:flex "
        style={{
          backgroundImage: `url(${backgroundImages[1]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center justify-center">
          <div className="bg-[#0000008f] bg-opacity-60 backdrop-blur-sm p-5 rounded-lg">
            <p className="text-sm md:text-base text-white p-5 font-thin">
              {randomQuote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
