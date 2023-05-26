import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import prompts from "../assets/js/prompts";

function Prompt(props) {
  const [randomPrompt, setRandomPrompt] = useState("");
  const [showPrompt, setShowPrompt] = useState(true);

  // Random Prompt Generator
  useEffect(() => {
    generateRandomPrompt();
  }, []);

  const generateRandomPrompt = () => {
    const newRandomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setRandomPrompt(newRandomPrompt);
    setShowPrompt(true);
  };

  const handleNewPrompt = () => {
    generateRandomPrompt();
  };

  const handleClearPrompt = () => {
    setShowPrompt(false);
  };

  return (
    <>
      {showPrompt && (
        <div className="prompt-container">
          <div className="prompt">{randomPrompt}</div>
        </div>
      )}

      <div className="footer-buttons">
        <button className="new-prompt prompt-button" onClick={handleNewPrompt}>
          New Prompt
        </button>

        <button
          className="clear-prompt prompt-button"
          onClick={handleClearPrompt}
        >
          Clear Prompt
        </button>
      </div>

      <form className="new-entry">
        <textarea
          rows="8"
          cols="50"
          className="textarea"
          // placeholder="If you only had 1 minute to journal about your day, what would you record?"
        ></textarea>
        <button className="save">Save</button>
      </form>
    </>
  );
}

export default Prompt;
