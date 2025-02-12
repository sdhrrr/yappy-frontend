// src/components/JoinChat.js
import React, { useState } from 'react';

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
    <div className='joinchat'>
      <h2>Join Chat</h2>
      <input
        type='text'
        placeholder='Enter username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSubmit}>Join</button>
    </div>
  );
}

export default JoinChat;