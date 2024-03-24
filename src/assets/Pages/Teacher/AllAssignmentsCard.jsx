/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const AllAssignmentsCard = ({ id, token }) => {
  const [allAssignments, setAssignments] = useState([]);
  const fetchData = async () => {
    try {
      const data = await axios.post(
        `http://localhost:9000/teachers/getassignments/${id}`,
        { token, id }
      );
      setAssignments(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function deleteAssignment(assignmentId) {
    try {
      const res = await axios.post(
        `http://localhost:9000/teachers/deleteAssignment/${assignmentId}`,
        { token, id }
      );
      if (res.status === 200) {
        toast.success(" Assessment deleted successfully", {
          onClose: () => fetchData(),
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  function dateCompare(pubDate, deadline) {
    const pubd = Date.parse(pubDate);
    const dead = Date.parse(deadline);
    return pubd > dead;
  }

  return (
    <div>
      <ToastContainer />
      {allAssignments === null || allAssignments.length === 0 ? (
        <div className="text-center col-span-2 mt-10">
          No Assignments Posted!
        </div>
      ) : (
        <div className="text-center col-span-2 mt-10 ">
          {allAssignments.map((assignment) => (
            <div key={assignment._id}>
              {console.log(new Date(assignment.publishDate))}
              <p>
                status:{" "}
                {dateCompare(assignment.publishDate, assignment.deadline)
                  ? "inactive"
                  : "active"}
              </p>
              <p>title: {assignment.assignmentTitle}</p>

              <p>
                Publish date : {new Date(assignment.publishDate).toDateString()}
              </p>
              <p>deadline: {new Date(assignment.deadline).toDateString()}</p>
              <p>grade: {assignment.grade}</p>
              <p>subj: {assignment.subject}</p>
              <p>submissions: {assignment.submissions.length}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteAssignment(assignment.assignmentId);
                }}
              >
                delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAssignmentsCard;
