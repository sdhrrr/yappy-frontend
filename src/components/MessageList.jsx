import React, { useEffect, useRef } from 'react';
import './MessageList.css';

const JOIN = 'JOIN';
const CHAT = 'CHAT';
const LEAVE = 'LEAVE';

function MessageList({ messages, username }) {
  const messageListRef = useRef(null);
  
  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const renderMessage = (message, index) => {
    // Handle JOIN and LEAVE messages
    if (message.type === JOIN || message.type === LEAVE) {
      const emoji = message.type === JOIN ? '👋' : '👋';
      return (
        <div key={index} className="system-message-container">
          <div className="system-message">
            {emoji} {message.content}
          </div>
        </div>
      );
    }

    // Handle regular CHAT messages
    return (
      <div 
        key={index} 
        className={`message-wrapper ${
          message.sender === username ? 'sent' : 'received'
        }`}
      >
        <div className="sender-name">{message.sender}</div>
        <div className="message">
          {message.content}
        </div>
      </div>
    );
  };

  return (
    <div className="message-list" ref={messageListRef}>
      {messages.map(renderMessage)}
    </div>
  );
}

export default MessageList;