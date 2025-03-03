// this is the initial welcome page when connected to the site

import React, { useState } from 'react';
import './JoinChat.css';
import logoImg from '/curb.png';

function JoinChat({ onUsernameSubmission }) {
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    const trimmedName = username.trim();
    if (trimmedName) {
      onUsernameSubmission(trimmedName);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="joinchat-wrapper">
      <div className="joinchat-container">
        <div className="joinchat-left">
          <div className="overlay">
            <img src={logoImg} alt="Chime Logo" className="logo" />
            <p>Connect. Converse. Chill.</p>
          </div>
        </div>
        <div className="joinchat-right">
          <h2>Join the Global Chat</h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSubmit}>Join</button>
        </div>
      </div>
    </div>
  );
}

export default JoinChat;