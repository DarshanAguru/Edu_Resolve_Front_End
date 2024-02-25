import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Notifications from "../../Components/Notifications";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaRegBell, FaBell } from "react-icons/fa6";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { BiNotepad } from "react-icons/bi";
import { BiSolidNotepad } from "react-icons/bi";
import { RiHome3Line, RiHome3Fill, RiLoginBoxLine } from "react-icons/ri";
import axios from "axios";
const StudentNavbar = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("student"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // Popover state

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev); // Toggle popover visibility
  };

  const activeStyle = {
    color: "#917A68",
    boxShadow: "0.5px 0.5px 20px 1px rgba(0,0,0,0.1)",
    borderRadius: "50%",
    padding: "6px",
  };
  const notifications = () => {};
  async function logout() {
    try {
      const status = await axios.post(
        `http://localhost:9000/globaladmins/logout/${data._id}`,
        { token: data.token }
      );
      if (status.data.message === "Logged out Successfully!") {
        localStorage.clear();
        console.log("logged out successfully");
        navigate("/studentLogin");
      } else {
        console.log(status.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <nav className="bg-white text-black shadow-lg flex justify-between items-center px-2 md:px-8 sticky top-0 w-full z-50 ">
      <div className="text-xl font-MajorMono">
        Edu <span className="font-extrabold">R</span>esolve
      </div>
      {/* Toggle button */}
      <div className="md:hidden flex items-center ">
        <button
          className="py-5 px-3 text-black font-Montserrat hover:underline"
          onClick={togglePopover}
        >
          <FaRegBell className="text-xl" />
        </button>
        {isPopoverOpen && <Notifications data={data} />}
        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="h-6 w-6 text-black" />
          ) : (
            <FaBars className="h-6 w-6 text-black" />
          )}
        </button>
      </div>
      {/* Mobile Menu*/}
      <div
        className={`${isMenuOpen ? "block" : "hidden"} z-50 absolute top-[3.5rem] w-full left-0 right-0  bg-[#615353]  md:hidden rounded-sm py-4 `}
      >
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-4 text-lg underline font-Montserrat text-white hover:text-lg"
              : "block py-2 px-4 text-sm font-Montserrat text-white hover:text-lg"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-4 text-lg underline font-Montserrat text-white hover:text-lg"
              : "block py-2 px-4 text-sm font-Montserrat text-white hover:text-lg"
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="assessments"
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-4 text-lg underline font-Montserrat text-white hover:text-lg"
              : "block py-2 px-4 text-sm font-Montserrat text-white hover:text-lg"
          }
        >
          Assessments
        </NavLink>
        <button
          onClick={logout}
          className="w-full text-left py-2 px-4 text-sm font-Montserrat text-white hover:text-lg "
        >
          Logout
        </button>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex py-2 items-center justify-center  gap-10 box-border">
        <NavLink
          to="."
          end
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          {({ isActive }) =>
            isActive ? (
              <RiHome3Fill className="text-3xl" />
            ) : (
              <RiHome3Line className="text-xl" />
            )
          }
        </NavLink>

        <NavLink
          to="profile"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          {({ isActive }) =>
            isActive ? (
              <FaUserCircle className="text-3xl" />
            ) : (
              <FaRegUserCircle className="text-xl" />
            )
          }
        </NavLink>

        <NavLink
          to="assessments"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          {({ isActive }) =>
            isActive ? (
              <BiSolidNotepad className="text-3xl" />
            ) : (
              <BiNotepad className="text-xl" />
            )
          }
        </NavLink>

        <button
          className="py-5 px-3 text-black  hover:underline relative"
          onClick={togglePopover}
        >
          <FaRegBell className="text-xl" />
          <span className="  absolute -top-0.5 -right- bg-yellow-900 text-white text-xs rounded-full px-2 py-1">
            2
          </span>
        </button>
        {isPopoverOpen && <Notifications data={data} />}
        <button
          onClick={logout}
          className=" font-Montserrat py-2 px-3 hover:text-white hover:bg-red-500 rounded text-red-500 hover:text-lg transition duration-300 text-xl"
        >
          <RiLoginBoxLine />
        </button>
      </div>
    </nav>
  );
};

export default StudentNavbar;
