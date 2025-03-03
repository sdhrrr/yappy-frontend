import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// I used the IP address of the server container i deployed in azure.
// can change this to local ip address of the server in case forked and want to test 
const SERVER_IP = 'curbchatapi.azurewebsites.net/ws';
const WEBSOCKET_ENDPOINT = `wss://${SERVER_IP}/ws`;
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
      
      // Subscribing to the public chat
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