import React, { useEffect, useState, useRef } from 'react';
import WebSocketService from '../WebSocketService';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
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
  }, []); // Ensure the dependency array is empty to run only once

  const onConnected = () => {
    const chatMessage = {
      sender: username,
      type: JOIN,
    };
    webSocketService.current.addUser(chatMessage);
  };

  const onMessageReceived = (message) => {
    console.log("Message received: ", message);
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
    <div className='chat-room'>
      <header className='chat-room-header'>
        <h2>Chat Room</h2>
        <button className='logout-btn' onClick={onLogout}>
          Logout
        </button>
      </header>
      <MessageList messages={messages} username={username} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
}

export default ChatRoom;