import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssessmentCard from "./AssessmentCard";
const StudentAssessments = () => {
  const [formData, setFormData] = useState({
    subject: "",
    assessment: [],
  });
  const [selectedAssessment, setSelectedAssessment] = useState("");

  // Assuming the student's details are stored in localStorage
  const { name, _id, token, school, grade } = JSON.parse(
    localStorage.getItem("student")
  );

  useEffect(() => {
    if (!formData.subject) return;

    const getAssignments = async () => {
      try {
        const response = await axios.post(
          "http://localhost:9000/students/getallassignments",
          {
            subject: formData.subject,
            school,
            grade,
            token,
            id: _id,
          }
        );
        setFormData((prevFormData) => ({
          ...prevFormData,
          assessment: response.data,
        }));
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
        toast.error("Failed to fetch assignments");
      }
    };

    getAssignments();
  }, [formData.subject, grade, school, token, _id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "assessment") {
      setSelectedAssessment(value);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    }
  };

  const notifySuccess = () =>
    toast.success("Assessment submitted successfully");
  const selectedAssessmentDetails = formData.assessment.find(
    (assessment) => assessment._id === selectedAssessment
  );
  return (
    <div>
      <p className="text-xl text-center mt-4 font-bold">Post Assessments</p>
      <div className="mx-10 lg:grid lg:grid-cols-3">
        <div className="lg:col-span-1">
          <form className="lg:mx-5 lg:my-10">
            <div className="gap-10 lg:block">
              {/* Subject Selection */}
              <label htmlFor="subject" className="block mb-2">
                Select Subject:
              </label>
              <select
                id="subject"
                onChange={handleChange}
                value={formData.subject}
                className="form-select border font-Montserrat border-[#D3C9C9] bg-white shadow-lg w-full mt-5 xl:py-2 py-1 px-2 text-sm xl:text-sm"
              >
                <option value="">Select a subject</option>
                {/* List of subjects */}
                {[
                  "Physics",
                  "Maths",
                  "Telugu",
                  "Hindi",
                  "English",
                  "Social",
                  "Chemistry",
                ].map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            {/* Assessment Selection */}
            {formData.subject && (
              <div className="mt-4">
                <label htmlFor="assessment" className="block mb-2">
                  Select Assessment:
                </label>
                <select
                  id="assessment"
                  onChange={handleChange}
                  value={selectedAssessment}
                  className="form-select border font-Montserrat border-[#D3C9C9] bg-white shadow-lg w-full mt-5 xl:py-2 py-1 px-2 text-sm xl:text-sm"
                >
                  <option value="">Select an assessment</option>
                  {formData.assessment.map((assessment) => (
                    <option key={assessment._id} value={assessment._id}>
                      {assessment.assignmentTitle}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form>
          <ToastContainer />
        </div>
        {/* Display Placeholder or Selected Assessment */}
        {!formData.subject || !selectedAssessment ? (
          <div className="col-span-2 flex items-center justify-center">
            Select the Subject and Assessment to submit assessment here.
          </div>
        ) : (
          <div className="text-center col-span-2 mt-10">
            <p>
              Assessment Selected: {selectedAssessmentDetails?.assignmentTitle}
            </p>
            {/* Pass the selected assessment details to the AssessmentCard */}
            <AssessmentCard
              questions={selectedAssessmentDetails?.questions}
              // Add any other props your AssessmentCard might need
            />
            <button
              onClick={notifySuccess}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssessments;
