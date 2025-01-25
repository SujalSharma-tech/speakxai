import React, { useState, useEffect } from "react";
import "./Anagramstyle.css";
const AnagramGame = ({ question }) => {
  const { blocksList, solution, title } = question;

  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [usedIndexes, setUsedIndexes] = useState([]);

  useEffect(() => {
    if (blocksList) {
      const letters = blocksList.map((block) => block.text);
      setShuffledLetters(shuffleArray(letters));
    }
  }, [blocksList]);

  const shuffleArray = (array) => {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const handleLetterClick = (letter, index) => {
    if (!usedIndexes.includes(index)) {
      setUserAnswer((prev) => [...prev, letter]);
      setUsedIndexes((prev) => [...prev, index]);
    }
  };

  const resetGame = () => {
    setUserAnswer([]);
    setUsedIndexes([]);
    setShuffledLetters(shuffleArray(blocksList.map((block) => block.text)));
  };

  const normalizeText = (text) => text.toLowerCase().replace(/\s+/g, "").trim();

  return (
    <div className="anagram-game">
      <h2>{title}</h2>
      <div className="shuffled-letters">
        {shuffledLetters.map((letter, index) => (
          <button
            key={index}
            className="letter-button"
            onClick={() => handleLetterClick(letter, index)}
            disabled={usedIndexes.includes(index)}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="user-answer">
        <h3>Your Answer:</h3>
        <p>{userAnswer.join(" ")}</p>
      </div>
      <div className="controls">
        <button onClick={resetGame}>Reset</button>
        <button
          onClick={() => {
            if (
              normalizeText(userAnswer.join("")) === normalizeText(solution)
            ) {
              setSelectedAnswer("Correct");
            } else {
              setSelectedAnswer("Incorrect");
            }
          }}
        >
          Submit
        </button>
      </div>
      {selectedAnswer && (
        <h3 className={selectedAnswer === "Correct" ? "correct" : "incorrect"}>
          Your Answer is {selectedAnswer}
        </h3>
      )}
    </div>
  );
};

export default AnagramGame;
