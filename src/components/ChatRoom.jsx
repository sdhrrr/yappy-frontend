import React, { useEffect, useState, useRef } from 'react';
import WebSocketService from '../WebSocketService';
import Navbar from './Navbar';
import './ChatRoom.css';

const JOIN = 'JOIN';
const CHAT = 'CHAT';
const LEAVE = 'LEAVE';

function ChatRoom({ username, onLogout }) {
  const [messages, setMessages] = useState([]);
  const webSocketService = useRef(null);

  useEffect(() => {
    if (!webSocketService.current) {
      webSocketService.current = new WebSocketService();
      webSocketService.current.connect(onConnected, onMessageReceived);
    }

    return () => {
      webSocketService.current.disconnect();
    };
  }, []);

  const onConnected = () => {
    const chatMessage = {
      sender: username,
      content: `${username} has joined the chat`,
      type: 'system',
    };
    webSocketService.current.addUser(chatMessage);
  };

  const onMessageReceived = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = (messageContent) => {
    if (messageContent.trim() !== '') {
      const chatMessage = {
        sender: username,
        content: messageContent,
        type: CHAT,
      };
      webSocketService.current.sendMessage(chatMessage);
    }
  };

  return (
    <div className='app-container'>
      <Navbar />
      <div className='chat-room'>
        <div className='chat-list'>
          <header className='chat-room-header'>
            <h2>Chats</h2>
            <button className='logout-btn' onClick={onLogout}>
              Logout
            </button>
          </header>
          {/* Add chat list items here */}
        </div>
        <div className='chat-area'>
          <MessageList messages={messages} username={username} />
          <MessageInput onSendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

function MessageList({ messages, username }) {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${
            message.type === 'system'
              ? 'system'
              : message.sender === username
              ? 'sent'
              : 'received'
          }`}
        >
          {message.type !== 'system' && (
            <div className="sender">{message.sender}</div>
          )}
          <div>{message.content}</div>
        </div>
      ))}
    </div>
  );
}

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatRoom;