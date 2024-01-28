import React, { useState, useEffect } from "react";
import "./wordle.css";
//declaring a secret word which would be guessed by user
const secretWord = "react";

// Wordle component definition
function Wordle() {
  // 6 rows x 5 columns grid
  const [grid, setGrid] = useState(
    Array.from({ length: 6 }, () => Array(5).fill(""))
  );

  // 1. Add state for the word guess
  const [guess, setGuess] = useState("");

  // 2. Add state for attempts
  const [attempts, setAttempts] = useState(0);

  // 3. Add state for feedback
  const [feedback, setFeedback] = useState(
    Array.from({ length: 6 }, () => Array(5).fill(""))
  );

  // 4. Add logic for handling key presses
  const handleKeyPress = (key) => {
    // Check if key is an alphabet letter and guess is less than 5 letters
    if (/^[a-zA-Z]$/.test(key) && guess.length < 5) {
      setGuess((prevGuess) => prevGuess + key.toLowerCase());
    } else if (key === "Backspace" && guess.length > 0) {
      // Check if key is Backspace and guess is greater than 0 letters
      setGuess((prevGuess) => prevGuess.slice(0, -1));
    } else if (key === "Enter" && guess.length === 5) {
      // Check if key is Enter and guess is exactly 5 letters
      checkGuess();
    }
    // 5. Call updateGrid to refresh the grid
    updateGrid();
  };

  // 6. Add logic for checking the guess
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

    setFeedback((prevFeedback) => {
      const newFeedbackState = [...prevFeedback];
      newFeedbackState[attempts] = newFeedback;
      return newFeedbackState;
    });

    setAttempts((prevAttempt) => prevAttempt + 1);

    if (newFeedback.every((status) => status === "correct")) {
      handleEndGame(true);
    } else if (attempts + 1 === 6) {
      handleEndGame(false);
    }

    // Clear the guess state after checking
    setGuess("");
  };

  // 7. Add logic for updating the grid
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

  // 8. Add useEffect to handle key events
  useEffect(() => {
    const handleKeyDown = (event) => {
      handleKeyPress(event.key);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess, attempts]);

  // Add logic for rendering the grid
  return (
    <div className="wordle-container">
      <h1>Wordle</h1>
      <div className="wordle-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((col, colIndex) => (
              <div key={colIndex} className="grid-box">
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
              // 10. Attach the handleKeyPress function to the button onClick event
              <button
                key={colIndex}
                className="button"
                onClick={() => handleKeyPress(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Export the Wordle component
export default Wordle;
