import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewQuestions from "./ViewQuestions";
const AssessmentStatTable = ({ view, setView }) => {
  const { _id, grade, school, token, assignments } = JSON.parse(
    localStorage.getItem("student")
  );
  const [assignmentId, setAssignmentId] = useState("");
  const [questions, setQuestions] = useState({});
  const [submittedAssigns, setSubmittedAssigns] = useState([]);
  function viewAssignment(assignId) {
    setAssignmentId(assignId);
    setView((prev) => !prev);
  }
  console.log(questions);
  useEffect(() => {
    async function getAssignmentQA(assignment_id) {
      const res = await axios.post(
        `http://localhost:9000/students/getAssignmentScoreAndData/${assignment_id}`,
        { token: token, id: _id }
      );
      setQuestions(res.data);
    }
    if (assignmentId) {
      getAssignmentQA(assignmentId);
    }
  }, [assignmentId]);
  async function fetchData() {
    try {
      let subassigns = [];
      const res = await axios.post(
        "http://localhost:9000/students/getAllAssignmentsForClass",
        { id: _id, token: token, grade: grade, school: school }
      );
      res.data.forEach((assign) => {
        if (assignments.includes(assign.assignmentId)) {
          subassigns.push(assign);
        }
      });
      setSubmittedAssigns(subassigns);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {view ? (
        <div>
          <p className=" drop-shadow-2xl font-bold text-center tracking-wide font-Montserrat">
            Assessment Stat Table
          </p>
          <section className="container mx-auto p-6">
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-semibold font-Montserrat tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th className="px-4 py-3">ASSIGNMENT NAME</th>
                      <th className="px-4 py-3">STATUS</th>
                      <th className="px-4 py-3">MARKS</th>
                      <th className="px-4 py-3">VIEW ASSIGNMENT</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {submittedAssigns.map((assign) => (
                      <tr key={assign.assignmentId} className="text-gray-700">
                        <td className="px-4 py-3 border">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold text-black">
                                {assign.assignmentTitle}
                              </p>
                              <p className="text-xs text-gray-600">
                                Posted at: {assign.publishDate}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs border">
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                            {" "}
                            Submitted{" "}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {
                            assign.submissions.filter(
                              (sub) => sub.senderId === _id
                            )[0].points
                          }
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          <button
                            onClick={() => viewAssignment(assign.assignmentId)}
                            className=" text-blue-800 hover:text-blue-400 underline underline-offset-2"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setView((prev) => !prev)}
            className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded flex items-center gap-2 mb-5 hover:bg-gray-300 mr-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 11H7.414l5.293-5.293-1.414-1.414L3.586 12l7.707 7.707 1.414-1.414L7.414 13H19v-2z" />
            </svg>

            <span>Back to all assignments</span>
          </button>
          <ViewQuestions questions = {questions}/>
        </div>
      )}
    </>
  );
};

export default AssessmentStatTable;
