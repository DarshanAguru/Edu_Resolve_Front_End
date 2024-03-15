import React, { useState } from "react";

const QuestionCard = () => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('single');
  const [options, setOptions] = useState([
    { id: 1, value: "", isChecked: false },
    { id: 2, value: "", isChecked: false },
    { id: 3, value: "", isChecked: false },
    { id: 4, value: "", isChecked: false }
  ]);
  const [marks, setMarks] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const addOption = () => {
    const newOptionId = options[options.length - 1].id + 1;
    setOptions([...options, { id: newOptionId, value: "", isChecked: false }]);
  };

  const updateOptionValue = (id, value) => {
    const newOptions = options.map(option => option.id === id ? { ...option, value } : option);
    setOptions(newOptions);
  };

  const toggleOptionCheck = (id) => {
    if (questionType === 'single') {
      const newOptions = options.map(option => ({ ...option, isChecked: option.id === id }));
      setOptions(newOptions);
    } else {
      const newOptions = options.map(option => option.id === id ? { ...option, isChecked: !option.isChecked } : option);
      setOptions(newOptions);
    }
  };

  const submitQuestion = () => {
    const newQuestion = {
      text: questionText,
      type: questionType,
      options,
      marks
    };
    const newAnswers = options.filter(option => option.isChecked).map(option => option.value);

    setQuestions([...questions, newQuestion]);
    setAnswers([...answers, newAnswers]);

    // Reset form
    setQuestionText('');
    setQuestionType('single');
    setOptions([
      { id: 1, value: "", isChecked: false },
      { id: 2, value: "", isChecked: false },
      { id: 3, value: "", isChecked: false },
      { id: 4, value: "", isChecked: false }
    ]);
    setMarks('');
  };


  return (
    <div>
      <div className="question-creation-form">
        <input
          type="text"
          placeholder="Enter Question here"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="col-span-2 mb-4"
        />
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="col-span-2 mb-4"
        >
          <option value="single">Single Choice</option>
          <option value="multiple">Multiple Choice</option>
        </select>
        <input
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          className="col-span-2 mb-4"
        />
        {options.map((option) => (
          <div key={option.id} className="flex items-center col-span-2">
            <input
              type={questionType === "single" ? "radio" : "checkbox"}
              name="questionOption"
              checked={option.isChecked}
              onChange={() => toggleOptionCheck(option.id)}
              className="mr-2"
            />
            <input
              type="text"
              placeholder={`Option ${option.id}`}
              value={option.value}
              onChange={(e) => updateOptionValue(option.id, e.target.value)}
              className="flex-grow mr-2"
            />
          </div>
        ))}
        <button onClick={addOption}>+ Add Option</button>
        <button onClick={submitQuestion}>Submit Question</button>
      </div>
      <div className="questions-display">
      {questions.map((question, index) => (
          <div key={index}>
            <p>Question: {question.text}</p>
            <p>Marks: {question.marks}</p>
            <p>Type: {question.type}</p>
            <p>Options:</p>
            <ul>
              {question.options.map(option => (
                <li key={option.id}>{option.value}</li>
              ))}
            </ul>
            <p>Answers:</p>
            <ul>
              {answers[index].map((answer, ansIndex) => (
                <li key={ansIndex}>{answer}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button onClick={() => console.log({questions,answers})}>Post Assessment</button>
    </div>
  );
};

export default QuestionCard;
