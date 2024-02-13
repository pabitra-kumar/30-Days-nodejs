// Problem: Express WebSocket Integration

// Problem Statement: Extend an existing Express application to include WebSocket support. Create a WebSocket server that echoes back any message it receives from a client. Implement an endpoint "/websocket" that serves an HTML page with JavaScript to establish a WebSocket connection.

// Function Signature:

// /**
//  * WebSocket server for Express
//  * @param {Object} server - HTTP server instance
//  */
// function setupWebSocket(server) {
//   // Your implementation here
// }
// Expected Output:

// Clients should be able to establish a WebSocket connection to "/websocket".
// Messages sent by clients should be echoed back by the server.
// Test Cases:

// Establish a WebSocket connection and send a message; it should be echoed back.


// Solution:

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/websocket', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        ws.send(message);
    });
});

server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

// index.html

// The server listens on port 3000 and serves an HTML page with JavaScript to establish a WebSocket connection. The WebSocket server echoes back any message it receives from a client.