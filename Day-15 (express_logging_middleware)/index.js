// Problem: Express Logging Middleware

// Problem Statement: Create a logging middleware for an Express application. The middleware should log detailed information about each incoming request, including the timestamp, HTTP method, URL, request headers, and request body.

// Function Signature:

// /**
//  * Logging middleware for Express
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @param {Function} next - Express next function
//  */
// function loggingMiddleware(req, res, next) {
//   // Your implementation here
// }
// Expected Output:

// Each incoming request should be logged with detailed information.
// Test Cases:

// Make multiple requests and check the server logs for detailed information.
// Hint To create a logging middleware for Express, you'll need to define a function that takes req, res, and next as parameters. Inside this function, use console.log to print the timestamp, HTTP method, URL, headers, and body of the incoming request. Finally, call next() to pass control to the next middleware.

// You can use the following code as a starting point:

const express = require('express');
const app = express();

function loggingMiddleware(req, res, next) {
    console.log('Logging middleware');
    console.log('Timestamp:', new Date());
    console.log('HTTP Method:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
}

app.use(loggingMiddleware);

app.get('/', (req, res) => {
    res.send('Day 15 of 30DaysOfNodeJs: Express Logging Middleware');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});