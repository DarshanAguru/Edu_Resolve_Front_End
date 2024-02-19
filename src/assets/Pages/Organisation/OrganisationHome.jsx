import React, { useState } from "react";
import Table from "../../Components/Table";
import axios from "axios";
const students = [
  {
    id: 1,
    name: "Raghava",
    email: "sairaghava032@gmail.com",
    grade: "6th",
    status: "Accepted",
  },
];
const teachers = [
  {
    id: 2,
    name: "Raghava",
    email: "sairaghava032@gmail.com",
    subjectExpertise: ["Maths", "Science", "Social"],
    status: "Accepted",
  },
  // Add more users as needed
];
const OrganisationHome = () => {
  const [table, setTable] = useState(true);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(
          "http://localhost:9000/globaladmins/getAllLocalAdmins"
        );
        console.log(res);
      } catch (error) {
        console.log("My eroor", error);
      }
    }
    fetchData();
  }, []);
  function toggle() {
    setTable((prev) => !prev);
  }
  return (
    <>
      <ul className="list-none flex justify-center gap-10 mt-10 ">
        <li>
          <button
            disabled={!table}
            className={`border-none font-Montserrat text-xl rounded my-2.5 mx-auto px-5  w-full py-2 ${table ? "text-slate-600 cursor-pointer" : "text-slate-300 cursor-not-allowed "}`}
            onClick={toggle}
          >
            Students
          </button>
        </li>
        <li>
          <button
            className={`border-none font-Montserrat text-xl rounded my-2.5 mx-auto px-5  w-full py-2  ${!table ? "text-slate-600 cursor-pointer" : "text-slate-300 cursor-not-allowed "}`}
            onClick={toggle}
            disabled={table}
          >
            Teachers
          </button>
        </li>
      </ul>
      {console.log(table)}
      {table ? (
        <Table users={teachers} type="teachers" />
      ) : (
        <Table users={students} type="students" />
      )}
    </>
  );
};

export default OrganisationHome;
