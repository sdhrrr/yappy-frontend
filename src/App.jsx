// src/App.js
import { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import JoinChat from './components/JoinChat';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    setUsername('');
  };

  return (
    <div> 
      <div className='app'>
        {username ? (
          <ChatRoom username={username} onLogout={handleLogout} />
        ) : (
          <JoinChat onUsernameSubmission={setUsername} />
        )}
      </div>
    </div>
  );
}

export default App;