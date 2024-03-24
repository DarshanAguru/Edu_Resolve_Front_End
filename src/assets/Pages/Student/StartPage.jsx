import React from "react";

const StartPage = ({ start }) => {
  return (
    <form onSubmit={start} className="text-left lg:m-5">
      <p className="font-bold font-Montserrat my-2 ">Begin Your Assessment</p>
      <p>
        Welcome to your assessment! This process will help you understand your
        preferences and provide personalized recommendations.
      </p>

      <p className="font-bold font-Montserrat my-2 ">How It Works</p>
      <p>
        This assessment consists of multiple-choice questions with single select
        or multiple select options.
      </p>

      <p className="font-bold font-Montserrat my-2">What You Will Need</p>
      <ul>
        <li>A quiet room without distractions</li>
        <li>Pen and paper (optional)</li>
      </ul>

      <p className="font-bold font-Montserrat my-2">Privacy and Data Use</p>
      <p>
        Your responses are confidential. We will use your data to provide
        personalized recommendations.
      </p>
      <input
        type="checkbox"
        id="consent"
        name="consent"
        className="my-5"
        required
      />
      <label htmlFor="consent" className="  my-5">
        {" "}
        I agree to the terms and conditions
      </label>

      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded block mx-auto">
        Start Assessment
      </button>
    </form>
  );
};

export default StartPage;
