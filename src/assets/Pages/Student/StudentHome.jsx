import React from "react";
import { data } from "../../data/facts";
import { quotes } from "../../data/quotes";
import FormInput from "../../Components/FormInput";
import Button from "../../Components/Button";
import PostCard from "../../Components/PostCard";
const StudentHome = () => {
  const backgroundImages = [
    "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  ];

  return (
    <div className="flex flex-col md:flex-row gap-5 m-5 ">
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
              {data[Math.floor(Math.random() * data.length)]}
            </p>
          </div>
        </div>
      </div>
      {/* Posts */}
      <div className=" flex-col w-full flex  xl:w-1/2">
        <form>
          <textarea
            placeholder="Post the queries here"
            className="bg-white rounded-lg border resize-none border-gray-300 shadow-lg w-full py-2 px-2 text-lg"
          ></textarea>

          <button
            type="submit"
            className="border-none text-white  text-xl leading-normal rounded bg-[#917A68]  mx-auto  py-1 mt-2 shadow-lg w-full  hover:bg-[#282323] hover:font-bold cursor-pointer"
          >
            Upload
          </button>
        </form>
        <div
          style={{
            maxHeight: "calc(100vh - 16rem)",
            overflowY: "auto",
            marginTop: "10px",
          }}
        >
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
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
              {quotes[Math.floor(Math.random() * quotes.length)]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
