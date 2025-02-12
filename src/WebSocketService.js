// src/WebSocketService.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const WEBSOCKET_ENDPOINT = 'http://localhost:8080/chat'; // Ensure this matches your backend
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
      debug: function (str) {
        console.log(str);
      },
    });

    this.stompClient.onConnect = () => {
      this.connected = true;
      onConnected();

      this.stompClient.subscribe(TOPIC_PUBLIC, (message) => {
        const body = JSON.parse(message.body);
        onMessageReceived(body);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient && this.connected) {
      this.stompClient.deactivate();
      this.connected = false;
      console.log('Disconnected.');
    }
  }

  sendMessage(chatMessage) {
    if (this.stompClient && this.connected) {
      this.stompClient.publish({
        destination: SEND_MESSAGE,
        body: JSON.stringify(chatMessage),
      });
    }
  }

  addUser(chatMessage) {
    if (this.stompClient && this.connected) {
      this.stompClient.publish({
        destination: ADD_USER,
        body: JSON.stringify(chatMessage),
      });
    }
  }
}

export default WebSocketService;