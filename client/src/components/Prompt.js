import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import prompts from '../assets/js/prompts';
import axios from 'axios';

function Prompt(props) {
  const [randomPrompt, setRandomPrompt] = useState('');
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

  const [formState, setFormState] = useState({
    prompt: '',
    entry: '',
    user: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      prompt: randomPrompt,
    }));
  }, [randomPrompt]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createEntry = async (event) => {
    event.preventDefault();
    console.log('Entry submitted.');
    ;
    
    try {
      const res = await axios.post('/api/prompt', {
        ...formState,
        user: props.user._id, 
      });
      setFormState({
        prompt: '',
        entry: '',
      });
      console.log(formState)
      navigate('/entries')
    } catch (err) {
      if (err.code === 402) {
        console.log(err);
      }
    }
  };

  if(props && props.user && props.user.email) {
    // console.log(' this is the true condition ')

      return (
      <>
        {showPrompt && (
          <div className='prompt-container'>
            <div className='prompt' name='prompt' value={formState.prompt}>
              {randomPrompt}
            </div>
          </div>
        )}

        <div className='footer-buttons'>
          <button className='new-prompt prompt-button' onClick={handleNewPrompt}>
            New Prompt
          </button>

          <button
            className='clear-prompt prompt-button'
            onClick={handleClearPrompt}
          >
            Clear Prompt
          </button>
        </div>

        <form className='new-entry' onSubmit={createEntry}>
          <textarea
            rows='8'
            cols='50'
            className='textarea'
            name='entry'
            value={formState.entry}
            onChange={handleFormChange}
          ></textarea>
          <button className='save'>Save</button>
        </form>
      </>
    );      
  }
  else {
    console.log(' this is the false condition ', JSON.stringify(props))
    return '';
  }
}

export default Prompt;
