import React from "react";

const viewQuestions = ({ questions }) => {
  console.log(questions);
  const { AssignmentData, studentData } = questions;
  console.log(AssignmentData, studentData);
  return (
    <>
      {Object.entries(questions).length > 0 && (
        <div className=" m-5 p-5 border">
          {AssignmentData.map((assignment, index) => {
            return (
              <div>
                <p className=" font-semibold">
                  <span className=" font-medium tracking-wide">
                    {index + 1}
                    {")  "}
                  </span>
                  {assignment.text}
                </p>

                <div className="flex flex-wrap gap-2 mt-1 mb-4">
                  {assignment.options.map((option, index) => {
                    return (
                      <p
                        className={`flex-grow  ${option.isChecked ? "bg-emerald-200 text-emerald-950 font-semibold px-2 py-1 rounded-lg" : ""}`}
                      >{`${String.fromCharCode(index + 97)}) ${option.value}`}</p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default viewQuestions;
