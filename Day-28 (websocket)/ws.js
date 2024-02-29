const WebSocket = require('ws');

function setupWebSocketServer(server) {
    // Create a WebSocket server by passing the HTTP server instance
    const wss = new WebSocket.Server({ noServer: true });

    // Handle WebSocket connection events
    wss.on('connection', (ws) => {
        console.log('WebSocket connection established');

        // Handle incoming messages from clients
        ws.on('message', (message) => {
            console.log(`Received message: ${message}`);

            // Broadcast the message to all connected clients
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        // Handle WebSocket close events
        ws.on('close', () => {
            console.log('WebSocket connection closed');
        });
    });

    // Upgrade HTTP requests to WebSocket
    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });

    console.log('WebSocket server setup complete');
}

module.exports = setupWebSocketServer;
