import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const innerContainerRef = useRef(null);

  // Load saved checkbox state from localStorage or default to an initial set
  const [checkboxes, setCheckboxes] = useState(() => {
    const savedCheckboxes = localStorage.getItem("checkboxes");
    return savedCheckboxes ? JSON.parse(savedCheckboxes) : Array(9).fill(false);
  });

  // Save checkbox state to localStorage whenever checkboxes change
  useEffect(() => {
    localStorage.setItem("checkboxes", JSON.stringify(checkboxes));
  }, [checkboxes]);

  const handleWin = () => {
    setCheckboxes((prevCheckboxes) => {
      const newCheckboxes = [...prevCheckboxes];
      const nextIndex = newCheckboxes.findIndex((val) => val === false);
      if (nextIndex !== -1) {
        newCheckboxes[nextIndex] = true;
      }
      return newCheckboxes;
    });
  };

  const handleLose = () => {
    setCheckboxes((prevCheckboxes) => [...prevCheckboxes, false]);
  };

  // Auto-scroll to the bottom when a new checkbox is added
  useEffect(() => {
    if (innerContainerRef.current) {
      innerContainerRef.current.scrollTop =
        innerContainerRef.current.scrollHeight;
    }
  }, [checkboxes]);

  return (
    <div className="container">
      <h1>Checkbox Grid</h1>
      <div className="inner-container" ref={innerContainerRef}>
        <div className="grid">
          {checkboxes.map((isChecked, i) => (
            <input
              key={i}
              type="checkbox"
              className="big-checkbox"
              checked={isChecked}
              onClick={(e) => e.preventDefault()} // Prevent manual toggling
            />
          ))}
        </div>
      </div>
      <div className="footer">
        <button onClick={handleWin}>Win</button>
        <button onClick={handleLose}>Lose</button>
      </div>
    </div>
  );
}

export default App;
