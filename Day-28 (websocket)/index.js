const express = require('express');
const http = require('http');
const setupWebSocketServer = require('./ws');

const app = express();
const server = http.createServer(app);

// Your Express routes go here

// Setup WebSocket server
setupWebSocketServer(server);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
