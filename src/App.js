import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const initialCount = 9;
  const [checkboxes, setCheckboxes] = useState(Array(initialCount).fill(false));
  const innerContainerRef = useRef(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const beforeInstallPromptHandler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler
      );
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("User installed the PWA");
        } else {
          console.log("User dismissed the install prompt");
        }
        setShowInstallPrompt(false);
      });
    }
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
      {showInstallPrompt && (
        <div className="install-banner">
          <p>Install this app for a better experience!</p>
          <button onClick={handleInstall}>Download App</button>
        </div>
      )}
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
