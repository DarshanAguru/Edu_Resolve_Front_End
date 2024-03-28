import React, { useState } from "react";
import right from "../../images/Right.svg";
import Denied from "../../images/Denied.svg";
import False from "../../images/False.svg";
const ProgressCard = ({ view }) => {
  return (
    <>
      {view && (
        <div className=" bg-white  p-5 px-5 flex flex-col gap-6 mt-5 mb-10 mx-2 rounded-md border shadow-lg ">
          <p className=" font-semibold text-md tracking-wide  font-Montserrat">
            Assessments Status
          </p>
          <div className="flex gap-10 flex-wrap font-Montserrat">
            <div className="flex gap-2 ">
              <img src={right} />
              <p className=" text-sm font-semibold tracking-wide text-gray-800">
                Submitted{" "}
                <span className=" bg-emerald-100 ml-2 px-2 py-1 text-sm  text-gray-800 font-bold rounded-full">
                  {" "}
                  5
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <img src={Denied} />
              <p className=" text-sm font-semibold tracking-wide text-gray-800">
                Pending{" "}
                <span className=" bg-yellow-100 ml-2 px-2 py-1 text-sm font-Montserrat text-gray-800 font-bold rounded-full">
                  {" "}
                  5
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <img src={False} />
              <p className=" text-sm font-semibold tracking-wide text-gray-800">
                Not Submitted{" "}
                <span className="bg-red-100 ml-2 px-2 py-1 text-sm font-Montserrat text-gray-800 font-bold rounded-full">
                  {" "}
                  5
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressCard;
