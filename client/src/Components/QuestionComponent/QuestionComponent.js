import React, { useState } from "react";
import "./Mcqstyle.css";
const QuestionComponent = ({ question }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="option-container">
      <h3>Select an Option Below</h3>
      <div className="option-box">
        {question.optionsList.map((option, index) => (
          <span className="option-label" key={index}>
            {String.fromCharCode(65 + index)}.
            <button
              className="option-text"
              onClick={() => {
                if (option.iscorrectanswer) {
                  setSelectedAnswer("Correct");
                } else {
                  setSelectedAnswer("Incorrect");
                }
                setSelectedOption(option.text);
              }}
            >
              <p>{option.text}</p>
            </button>
          </span>
        ))}
      </div>

      {selectedAnswer && (
        <div className="feedback">
          <h3
            className={`${
              selectedAnswer === "Correct" ? "correct" : "incorrect"
            }`}
          >
            Your Selected Option "{selectedOption}" is {selectedAnswer}
            {selectedAnswer === "Incorrect" ? <p>Please Try Again </p> : ""}
          </h3>
        </div>
      )}
    </div>
  );
};

export default QuestionComponent;
