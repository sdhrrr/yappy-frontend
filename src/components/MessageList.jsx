// src/components/MessageList.js
import React, { useEffect, useRef } from 'react';
import './MessageList.css';

function MessageList({ messages, username }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const renderMessage = (message, index) => {
    if (message.type === 'JOIN' || message.type === 'LEAVE') {
      return (
        <div key={index} className='message-item system-message'>
          <div className='message-content'>{message.content}</div>
        </div>
      );
    } else {
      const isOwnMessage = message.sender === username;
      const className = isOwnMessage ? 'my-message' : 'other-message';

      return (
        <div key={index} className={`message-item ${className}`}>
          <div className='message-sender'>{message.sender}</div>
          <div className='message-content'>{message.content}</div>
        </div>
      );
    }
  };

  return (
    <div className='message-list'>
      {messages.map(renderMessage)}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;