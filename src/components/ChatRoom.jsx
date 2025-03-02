import React, { useEffect, useState, useRef } from 'react';
import WebSocketService from '../WebSocketService';
import Navbar from './Navbar';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './ChatRoom.css';

const JOIN = 'JOIN';
const CHAT = 'CHAT';
const LEAVE = 'LEAVE';

function ChatRoom({ username, onLogout }) {
    const [messages, setMessages] = useState([]);
    const webSocketService = useRef(null);
    const isFirstConnect = useRef(true);

    useEffect(() => {
        if (!webSocketService.current) {
            webSocketService.current = new WebSocketService();
            webSocketService.current.connect(onConnected, onMessageReceived);
        }

        return () => {
            const leaveMessage = {
                sender: username,
                content: `${username} has left the chat`,
                type: LEAVE
            };
            webSocketService.current.sendMessage(leaveMessage);
            webSocketService.current.disconnect();
        };
    }, [username]);

    const onConnected = () => {
        if (isFirstConnect.current) {
            const joinMessage = {
                sender: username,
                content: `${username} has joined the chat`,
                type: JOIN
            };
            webSocketService.current.addUser(joinMessage);
            isFirstConnect.current = false;
        }
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
            <Navbar onLogout={onLogout} />
            <div className='chat-room'>
                <div className='chat-area'>
                    <MessageList messages={messages} username={username} />
                    <MessageInput onSendMessage={sendMessage} />
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;