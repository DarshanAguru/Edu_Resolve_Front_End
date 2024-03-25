import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StartPage from "./StartPage";
import axios from "axios";
import Confetti from "react-confetti";
const AssessmentCard = ({ id, token, userId, name }) => {
  const [answers, setAnswers] = useState([]);
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [marks, setMarks] = useState("1/3");
  const handleStartClick = () => {
    setStart((prev) => !prev);
  };
  useEffect(() => {
    async function getAssignmentQuestions() {
      const res = await axios.post(
        `http://localhost:9000/students/getAssignment/${id}`,
        { token, id: userId }
      );
      console.log(JSON.parse(localStorage.getItem("student")));
      setQuestions(res.data._doc.questions);
      console.log(questions);
    }
    getAssignmentQuestions();
  }, []);
  const handleOptionChange = (questionIndex, option, isMultiple) => {
    setAnswers((prevAnswers) => {
      // Clone the previous answers to avoid direct state mutation
      const updatedAnswers = [...prevAnswers];
      console.log(updatedAnswers);
      if (isMultiple === "multiple") {
        // Ensure there's an array to work with for this question
        if (!updatedAnswers[questionIndex]) updatedAnswers[questionIndex] = [];

        const currentAnswers = updatedAnswers[questionIndex];
        const optionIndex = currentAnswers.indexOf(option);

        if (optionIndex > -1) {
          // Option already selected, remove it
          updatedAnswers[questionIndex] = currentAnswers.filter(
            (opt) => opt !== option
          );
        } else {
          // Option not selected, add it
          updatedAnswers[questionIndex] = [...currentAnswers, option];
        }
      } else {
        // For single choice, directly set or replace the answer
        updatedAnswers[questionIndex] = [option];
      }

      return updatedAnswers;
    });
  };

  // Example adjustment in handleSubmit for consistent identification using questionIndex
  const handleSubmit = (e) => {
    e.preventDefault();

    const isEveryQuestionValid = questions.every((question, questionIndex) => {
      const questionId = questionIndex.toString(); // Use questionIndex for identification

      if (question.type === "single") {
        return answers[questionId] !== undefined;
      }

      if (question.type === "multiple") {
        const questionAnswers = answers[questionId];
        return (
          questionAnswers &&
          Object.values(questionAnswers).some((isSelected) => isSelected)
        );
      }

      return false; // Fallback for invalid question type
    });

    if (!isEveryQuestionValid) {
      toast.warn(
        "Please select at least one option for all multiple choice questions."
      );
      return; // Prevent form submission if validation fails
    }

    // Proceed with form submission logic...
    console.log("Submitted Answers:", answers);
    toast.success("Answers submitted successfully!");
    async function submitAnswers() {
      const res = await axios.post(
        `http://localhost:9000/students/submitAssignment/${id}`,
        {
          token,
          id: userId,
          senderId: userId,
          senderName: name,
          assignmentAnswers: answers,
        }
      );
      console.log(res);
      setMarks(res.data.marks);
    }
    submitAnswers();
  };

  return (
    <div>
      <ToastContainer />
      {!start ? (
        // <StartPage start={handleStartClick} />
        <div className=" shadow-custom rounded-lg p-10">
          {marks.split("/")[0] > marks.split("/")[1] / 2 ? (
            <>
              <Confetti />
              <p className=" font-MajorMono font-extrabold">you scored</p>
              <p className=" font-Montserrat tracking-wider font-bold ">
                {marks.split("/")[0]} out of {marks.split("/")[1]}
              </p>
              <p className=" font-Montserrat mt-20 tracking-wider">
                Good performance, keep it up
              </p>
            </>
          ) : (
            <>
              <p className=" font-MajorMono font-extrabold">you scored</p>
              <p className=" font-Montserrat tracking-wider font-bold ">
                {marks.split("/")[0]} out of {marks.split("/")[1]}
              </p>
              <p className=" font-Montserrat mt-20 tracking-wider">
                Try to improve next time
              </p>
            </>
          )}
         
        </div>
      ) : !marks ? (
        <form
          onSubmit={handleSubmit}
          className=" shadow-md  border rounded-lg lg:mx-10 mt-3 p-5 text-left"
        >
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className=" border-b-2 py-2">
              {" "}
              <p>
                {questionIndex + 1}. {question.text}
              </p>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  {" "}
                  {/* Similarly, ensure each option has a unique key */}
                  <input
                    type={question.type === "single" ? "radio" : "checkbox"}
                    name={questionIndex.toString()}
                    id={questionIndex}
                    value={option.value}
                    onChange={() =>
                      handleOptionChange(
                        questionIndex.toString(),
                        option.value,
                        question.type
                      )
                    }
                  />
                  <label htmlFor={`${questionIndex}`}>
                    {" " + option.value}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded block mx-auto"
          >
            Submit Assessment
          </button>
        </form>
      ) : (
        <>
          <Confetti />
          <div>
            <p>marks:{marks}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default AssessmentCard;
