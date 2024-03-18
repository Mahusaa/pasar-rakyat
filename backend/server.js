const express = require('express');
const firebaseAdmin = require('firebase-admin');
const cors = require('cors');
const WebSocket = require('ws');
require('dotenv').config();

const app = express();
const port = 5000;

// Initialize Firebase Admin SDK
const serviceAccount = require('./private/serviceAccountKey.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://pasar-rakyat-f571b-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = firebaseAdmin.database();

app.use(cors());
app.use(express.json());

// Create HTTP server
const server = app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

// Create a WebSocket server using the HTTP server
const wss = new WebSocket.Server({ server });

// Function to send data to all connected clients
const sendDataToClients = () => {
  db.ref('messages').once('value', snapshot => {
    const messages = snapshot.val();
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(messages));
      }
    });
  });
};

// WebSocket connection handler
wss.on('connection', ws => {
  console.log('Client connected');

  // Send initial data to client
  sendDataToClients();

  ws.on('message', message => {
    console.log('Received message from client:', message);
    // Save the message to Firebase
    db.ref('messages').push({
      text: message,
      timestamp: firebaseAdmin.database.ServerValue.TIMESTAMP
    });
  });

  // Listen for changes in Firebase data and send updates to clients
  const listener = db.ref('messages').on('value', () => {
    sendDataToClients();
  });

  // Handle WebSocket close event
  ws.on('close', () => {
    console.log('Client disconnected');
    db.ref('messages').off('value', listener);
  });
});

console.log('WebSocket server is running...');
