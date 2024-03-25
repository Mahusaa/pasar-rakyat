require('dotenv').config({ path: './backend/.env' });
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const firebaseApp = require('./config/firebaseConfig');
const routes = require('./routes/stock');



const app = express();
const server = http.createServer(app); 
const wss = new WebSocket.Server({ server });


app.use(bodyParser.json());
app.use('/api', routes);

wss.on('connection', (ws) => {
  console.log('Client connected');


  const db = firebaseApp.database();
  const menuRef = db.ref('menu');

  menuRef.on('value', (snapshot) => {
    const menuData = snapshot.val();
    ws.send(JSON.stringify(menuData));
  });

  ws.on('close', () => {
    menuRef.off();
    console.log('Client disconnected');
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
