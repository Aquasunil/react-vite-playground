import { useEffect, useState } from "react";
import "./wordle.css";
//declaring a secret word which would be guessed by user
const secretWord = "react
  
const WordleGame = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: 6 }, () => Array(5).fill(""))
  );
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(
    Array.from({ length: 6 }, () => Array(5).fill(""))
  );
  const [letterFeedback, setLetterFeedback] = useState({});

  const handleKeyPress = (key) => {
    if (/^[a-zA-Z]$/.test(key) && guess.length < 5) {
      setGuess((prevGuess) => prevGuess + key.toLowerCase());
    } else if (key === "Backspace" && guess.length > 0) {
      setGuess((prevGuess) => prevGuess.slice(0, -1));
    } else if (key === "Enter" && guess.length === 5) {
      checkGuess();
    }
    updateGrid();
  };

  const checkGuess = () => {
    const newFeedback = Array(secretWord.length).fill("incorrect");

    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord.includes(guess[i])) {
        if (secretWord[i] === guess[i]) {
          newFeedback[i] = "correct";
        } else {
          newFeedback[i] = "misplaced";
        }
      }
    }

    newFeedback.forEach((fb, index) => {
      const letter = guess[index];
      setLetterFeedback((prev) => {
        if (prev[letter] !== "correct") {
          return {
            ...prev,
            [letter]: fb,
          };
        }
        return prev;
      });
    });

    setFeedback((prevFeedback) => {
      const newFeedbackState = [...prevFeedback];
      newFeedbackState[attempts] = newFeedback;
      return newFeedbackState;
    });

    setAttempts((prevAttempt) => prevAttempt + 1);

    updateGrid();
    setGuess("");
  };

  const updateGrid = () => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const currentRow = newGrid[attempts].slice();

      for (let i = 0; i < 5; i++) {
        currentRow[i] = i < guess.length ? guess[i].toUpperCase() : "";
      }

      newGrid[attempts] = currentRow;
      return newGrid;
    });
  };

  useEffect(() => {
    if (attempts < 6) {
      updateGrid();
    }
    const handleKeyDown = (event) => {
      handleKeyPress(event.key);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess, attempts]);

  const resetGame = () => {
    setGuess("");
    setAttempts(0);
    setFeedback(Array.from({ length: 6 }, () => Array(5).fill("")));
    setLetterFeedback({});
    setGrid(Array.from({ length: 6 }, () => Array(5).fill("")));
  };

  const getFeedbackClass = (feedbackValue) => {
    switch (feedbackValue) {
      case "correct":
        return "correct";
      case "misplaced":
        return "misplaced";
      case "incorrect":
        return "incorrect";
      default:
        return "";
    }
  };

  const getLetterClass = (letter) => {
    if (!letterFeedback[letter]) return "";
    switch (letterFeedback[letter]) {
      case "correct":
        return "correct";
      case "misplaced":
        return "misplaced";
      case "incorrect":
        return "incorrect";
      default:
        return "";
    }
  };

  return (
    <div className="wordle-container">
      <h1>Wordle</h1>
      <div className="wordle-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((col, colIndex) => (
              <div
                key={colIndex}
                className={`grid-box ${getFeedbackClass(
                  feedback[rowIndex]?.[colIndex]
                )}`}
              >
                {col}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="letter-buttons">
        {[
          ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
          ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
          ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
        ].map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((letter, colIndex) => (
              <button
                key={colIndex}
                onClick={() => {
                  handleKeyPress(letter);
                }}
                className={`button ${getLetterClass(letter.toLowerCase())} `}
              >
                {letter}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordleGame;
