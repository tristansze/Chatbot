import { WebSocketServer } from 'ws';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';

// Spinning the HTTP server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

// Maintaining all active connections in this object
const clients = {};

// A new client connection request received
wsServer.on('connection', (connection) => {
  // Generate a unique code for every user
  const userId = uuidv4();
  console.log(`Received a new connection.`);

  // Store the new connection and handle messages
  clients[userId] = connection;
  console.log(`${userId} connected.`);
});

