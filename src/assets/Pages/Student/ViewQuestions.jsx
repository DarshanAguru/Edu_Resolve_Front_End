import React from "react";

const viewQuestions = ({ questions }) => {
  console.log(questions);
  const { AssignmentData, studentData } = questions;
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

                <div className="flex gap-2 mb-2">
                  {assignment.options.map((option, index) => {
                    return (
                      <p className="">{`${String.fromCharCode(index + 97)}) ${option.value}`}</p>
                    );
                  })}
                </div>
                {/* <div className="flex gap-10">
                  <div>
                    <p className=" font-semibold">Correct Answers</p>
                    <p>4</p>
                    <p>four</p>
                  </div>
                  <div>
                    <p className=" font-semibold">Your answers</p>
                    <p>4</p>
                    <p>four</p>
                  </div>
                </div> */}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default viewQuestions;
