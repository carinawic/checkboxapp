import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const initialCount = 9;
  const [checkboxes, setCheckboxes] = useState(Array(initialCount).fill(false));
  const innerContainerRef = useRef(null);

  const toggleCheck = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };

  const handleWin = () => {
    const newCheckboxes = [...checkboxes];
    const nextIndex = newCheckboxes.findIndex((val) => val === false);
    if (nextIndex !== -1) {
      newCheckboxes[nextIndex] = true;
      setCheckboxes(newCheckboxes);
    }
  };

  const handleLose = () => {
    setCheckboxes([...checkboxes, false]);
  };

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
              onChange={() => toggleCheck(i)}
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
