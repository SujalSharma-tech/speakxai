import React, { useState } from "react";
import QuestionComponent from "../QuestionComponent/QuestionComponent";
import AnagramGame from "../AnagramComponent/AnagramGame";
import "./Question.css";
const QuestionCarousel = ({ question, index, currentPage }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div key={question.id} className="carousel">
      <div className="question-card">
        <div className="question-header">
          <span className="question-number">
            Q{(currentPage - 1) * 20 + index + 1}
          </span>
          <span>Type : {question.type.replace(/_/g, " ")}</span>
        </div>
        <p className="question-text">{question.title}</p>
        <button className="dropdown-button" onClick={() => toggleExpand(index)}>
          {expandedIndex === index ? "Hide Details" : "Show Details"}
        </button>
        <div
          className={`dropdown-content ${
            expandedIndex === index ? "expanded" : ""
          }`}
        >
          {expandedIndex === index && (
            <>
              {question.type === "MCQ" ? (
                <QuestionComponent question={question} />
              ) : question.type === "ANAGRAM" ? (
                <AnagramGame question={question} />
              ) : (
                "No Solution Available"
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCarousel;
