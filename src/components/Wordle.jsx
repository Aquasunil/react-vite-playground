import React, { useState } from "react";
import "./wordle.css";

// Wordle component definition
function Wordle() {
  // 6 rows x 5 columns grid
  const [grid, setGrid] = useState(
    Array.from({ length: 6 }, () => Array(5).fill(""))
  );

  // 1. Add state for the word guess
  const [guess, setGuess] = useState("");

  // 2. Add logic for handling key presses
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
    // 4. Call updateGrid to refresh the grid
    updateGrid();
  };

  // 3. Add logic for checking the guess
  const checkGuess = () => {
    // Implementation goes here
  };

  // 5. Add logic for updating the grid
  const updateGrid = () => {
    // Implementation goes here
  };

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
              // 6. Attach the handleKeyPress function to the button onClick event
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
