import { useState } from "react";
import "./wordle.css";

// Wordle component definition
function Wordle() {
  // 6 rows x 5 columns grid
  const [grid, setGrid] = useState(
    Array.from({ length: 6 }, () => Array(5).fill(""))
  );

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
    </div>
  );
}

// Export the Wordle component
export default Wordle;
