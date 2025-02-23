import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const innerContainerRef = useRef(null);
  const modalRef = useRef(null); // Reference for the <dialog> popup

  // Load checkboxes from localStorage or initialize with 9 unchecked
  const [checkboxes, setCheckboxes] = useState(() => {
    const savedCheckboxes = localStorage.getItem("checkboxes");
    return savedCheckboxes ? JSON.parse(savedCheckboxes) : Array(9).fill(false);
  });

  // Load saved ratings (if any)
  const [currentRating, setCurrentRating] = useState(
    () => localStorage.getItem("currentRating") || ""
  );
  const [goalRating, setGoalRating] = useState(
    () => localStorage.getItem("goalRating") || ""
  );

  const [currentInput, setCurrentInput] = useState(currentRating); // Input for current rating
  const [goalInput, setGoalInput] = useState(goalRating); // Input for goal rating

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

  useEffect(() => {
    if (innerContainerRef.current) {
      innerContainerRef.current.scrollTop =
        innerContainerRef.current.scrollHeight;
    }
  }, [checkboxes]);

  const openModal = () => {
    setCurrentInput(currentRating); // Reset input field to saved current rating
    setGoalInput(goalRating); // Reset input field to saved goal rating
    if (modalRef.current) modalRef.current.showModal();
  };

  const closeModal = () => {
    if (modalRef.current) modalRef.current.close();
  };

  const handleModalSubmit = () => {
    if (/^\d{4}$/.test(currentInput) && /^\d{4}$/.test(goalInput)) {
      setCurrentRating(currentInput);
      setGoalRating(goalInput);
      localStorage.setItem("currentRating", currentInput);
      localStorage.setItem("goalRating", goalInput);
      closeModal();
    } else {
      alert("Please enter valid 4-digit numbers for both fields.");
    }
  };

  return (
    <div className="container">
      <div className="title-bar">
        <h1>Checkbox Grid</h1>
        <button className="restart-button" onClick={openModal}>
          Restart
        </button>
      </div>

      <dialog ref={modalRef} className="popup-modal">
        <h2>Enter Your Ratings</h2>

        {/* Current Rating - Now Matches Goal Rating */}
        <div className="modal-row">
          <label>Current Rating:</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="modal-input"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="4-digit number"
          />
        </div>

        {/* Goal Rating - Now Matches Current Rating */}
        <div className="modal-row">
          <label>Goal Rating:</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="modal-input"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            placeholder="4-digit number"
          />
        </div>

        {/* Buttons moved to a new row with spacing applied via CSS */}
        <div className="modal-button-row">
          <button className="modal-button" onClick={handleModalSubmit}>
            OK
          </button>
          <button className="modal-button cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </dialog>

      <div className="inner-container" ref={innerContainerRef}>
        <div className="grid">
          {checkboxes.map((isChecked, i) => (
            <input
              key={i}
              type="checkbox"
              className="big-checkbox"
              checked={isChecked}
              onClick={(e) => e.preventDefault()}
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
