import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import prompts from "../assets/js/prompts";

function Prompt(props) {
  const [randomPrompt, setRandomPrompt] = useState("");

  // Random Prompt Generator
  useEffect(() => {
    generateRandomPrompt();
  }, []);

  const generateRandomPrompt = () => {
    const newRandomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setRandomPrompt(newRandomPrompt);
  };

  const handleNewPrompt = () => {
    generateRandomPrompt();
  };

  return (
    <>
      <div className="prompt-container">
        <div className="prompt">{randomPrompt}</div>
      </div>

      <div className="footer-buttons">
        <button className="new-prompt prompt-button" onClick={handleNewPrompt}>
          New Prompt
        </button>
        <button className="clear-prompt prompt-button">Clear Prompt</button>
      </div>
    </>
  );
}

export default Prompt;