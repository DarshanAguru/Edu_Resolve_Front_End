import React from "react";

const viewQuestions = ({ questions }) => {
  return (
    <div className=" m-5 p-5 border">
      {console.log(questions)}
      <p className=" font-semibold">
        <span>1.{"  "}</span>What is 2+2 ?
      </p>

      <div className="flex gap-2 mb-2">
        <p className=" font-semibold">Options: </p>
        <p className="">a 4</p>
        <p className="">b four</p>
        <p className="">c 4</p>
        <p className="">d 4</p>
      </div>
      <div className="flex gap-10">
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
      </div>
    </div>
  );
};

export default viewQuestions;
