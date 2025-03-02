// src/WebSocketService.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// Use your IP address for both local and phone testing
const SERVER_IP = '192.168.137.1:8080';
const WEBSOCKET_ENDPOINT = `http://${SERVER_IP}/ws`;
const TOPIC_PUBLIC = '/topic/public';
const SEND_MESSAGE = '/app/chat.sendMessage';
const ADD_USER = '/app/chat.addUser';

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.connected = false;
  }

  connect(onConnected, onMessageReceived) {
    const socket = new SockJS(WEBSOCKET_ENDPOINT);

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: function (str) {
        console.log(str);
      },
    });

    this.stompClient.onConnect = () => {
      this.connected = true;
      console.log('Connected to WebSocket!');
      
      // Subscribe to the public topic
      this.stompClient.subscribe(TOPIC_PUBLIC, (message) => {
        const body = JSON.parse(message.body);
        onMessageReceived(body);
      });

      onConnected();
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.onWebSocketClose = () => {
      console.log('WebSocket Connection Closed');
      this.connected = false;
    };

    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient && this.connected) {
      this.stompClient.deactivate();
      this.connected = false;
      console.log('Disconnected from WebSocket');
    }
  }

  sendMessage(chatMessage) {
    if (this.stompClient && this.connected) {
      this.stompClient.publish({
        destination: SEND_MESSAGE,
        body: JSON.stringify(chatMessage),
      });
    } else {
      console.log('Not connected to WebSocket');
    }
  }

  addUser(chatMessage) {
    if (this.stompClient && this.connected) {
      this.stompClient.publish({
        destination: ADD_USER,
        body: JSON.stringify(chatMessage),
      });
    } else {
      console.log('Not connected to WebSocket');
    }
  }
}

export default WebSocketService;