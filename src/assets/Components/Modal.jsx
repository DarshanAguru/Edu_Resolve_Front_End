import React, { useState, useEffect } from "react";
const Modal = ({ isOpen, onClose, user, type }) => {
  if (!isOpen) return null;
  const [data, setData] = useState("");
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("admin")));
  }, [setData]);
  async function acceptData() {
    try {
      const userType =
        type === "org"
          ? "verifyLocalAdmin"
          : type === "mentors"
            ? "verifyMentor"
            : "verfiyTeacher";
      const status = await axios.post(
        "http://localhost:9000/globaladmins/${userType}/${user._id}, {token: data.token, id:data._id}"
      );
      // console.log(status);
      if (status.data.message === "Verified") {
        console.log("verified");
      } else {
        console.log(status.data.message);
      }
    } catch (err) {
      console.log(err);
    }
    console.log("Accepted");
  }
  async function deleteData() {
    try {
      const userType =
        type === "org"
          ? "rejectLocalAdmin"
          : type === "mentors"
            ? "rejectMentor"
            : "rejectTeacher";
      const status = await axios.post(
        "http://localhost:9000/globaladmins/${userType}/${user._id}, {token: data.token, id:data._id}"
      );
      // console.log(status);
      if (status.data.message === "Rejected") {
        console.log("Rejected");
      } else {
        console.log(status.data.message);
      }
    } catch (err) {
      console.log(err);
    }
    console.log("Rejected");
  }
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={onClose}
    >
      {console.log(user, type)}
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {user.name}
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">Email: {user.emailId}</p>
            <p className="text-sm text-gray-500">
              {`Institution: ${type === "org" && user.institution}`}
              {type === "students" && user.grade}
              {(type === "mentors" || type === "teachers") &&
                user.subjectExpertise.join(", ")}
            </p>
            <p className="text-sm text-gray-500">
              VerificationStatus: {user.verificationStatus}
            </p>
            <p className="text-sm text-gray-500">
              phoneNumber: {user.phoneNumber}
            </p>
            <p className="text-sm text-gray-500">
              {user.designation && `Designation: ${user.designation}`}
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              onClick={() => acceptData()}
            >
              Accept
            </button>
            <button
              id="cancel-btn"
              className="mt-3 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => deleteData()}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
