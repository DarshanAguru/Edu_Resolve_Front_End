import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StartPage from "./StartPage";
const AssessmentCard = ({ questions }) => {
  const [answers, setAnswers] = useState({});
  const [start, setStart] = useState(false);
  const handleStartClick = () => {
    setStart((prev) => !prev);
  };
  const handleOptionChange = (questionId, option, isMultiple) => {
    if (isMultiple === "multiple") {
      // For multiple choice, update the array of answers
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: {
          ...prevAnswers[questionId],
          [option]: !prevAnswers[questionId]?.[option],
        },
      }));
    } else {
      // For single choice, directly set the answer
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: option,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isMultipleChoiceValid = questions.every((question, index) => {
      if (question.type === "multiple") {
        // Get the answers for the current question from the answers state
        const questionAnswers = answers[index] || {};
        // Check if at least one option is selected
        return Object.values(questionAnswers).some((isChecked) => isChecked);
      }

      return true;
    });

    if (!isMultipleChoiceValid) {
      toast.warn(
        "Please select at least one option for all multiple choice questions."
      );
      return; // Prevent form submission if validation fails
    }
    console.log("Submitted Answers:", answers);
    toast.success("Answers submitted successfully!");
  };

  return (
    <div>
      <ToastContainer />
      {!start ? (
        <StartPage start={handleStartClick} />
      ) : (
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
      )}
    </div>
  );
};

export default AssessmentCard;
