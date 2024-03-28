import React, { useState } from "react";
import Table from "../../Components/Table";
import axios from "axios";
const OrganisationHome = () => {
  const [teachers, setTeachers] = React.useState([]);
  const { _id, token, institution } = JSON.parse(
    localStorage.getItem("localAdmin")
  );
  const fetchTeachersData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9000/localadmins/getTeachers",
        { token: token, id: _id, school: institution }
      );
      setTeachers(res.data);
    } catch (error) {
      console.error("My error", error);
    }
  };

  React.useEffect(() => {
    fetchTeachersData();
  }, []);

  return (
    <>
      <p className="border-none font-Montserrat text-xl rounded mt-12 mx-auto px-5  w-full py-2 text-slate-600 text-center">
        Teachers
      </p>
      <Table users={teachers} type="teachers" refreshData={fetchTeachersData} />
    </>
  );
};

export default OrganisationHome;
