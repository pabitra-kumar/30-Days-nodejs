// Problem: Express Caching Middleware

// Problem Statement: Implement a caching middleware for an Express application. The middleware should cache responses based on the request URL and return cached responses for subsequent identical requests. Allow cache expiration after a specified time.

// Function Signature:

// /**
//  * Caching middleware for Express
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @param {Function} next - Express next function
//  */
// function cachingMiddleware(req, res, next) {
//   // Your implementation here
// }
// Expected Output:

// Cached responses should be returned for identical requests within the cache expiration time.
// Subsequent requests after cache expiration should trigger a new response.
// Test Cases:

// Make a request, cache the response, and make the same request again within the cache expiration time.
// Make a request, cache the response, wait for cache expiration, and make the same request again.

// Notes:

// You can use the following Express application to test your middleware:

const express = require('express');
const app = express();


function cachingMiddleware(req, res, next) {
    console.log('Caching middleware');
    const key = req.originalUrl;
    console.log('Key:', key);
    if (cache[key]) {
        console.log('Cache hit!');
        const cached = cache[key];
        console.log('Cached:', cached);
        const now = new Date();
        const diff = now - cached.timestamp;
        console.log('Diff:', diff);
        if (diff < cacheExpiration) {
            console.log('Cache hit within expiration time');
            res.send(cached.response);
            return;
        }
    }
    console.log('Cache miss');
    next();
}
const cache = {
    '/test': {
        timestamp: new Date(),
        response: 'Day 14 of 30DaysOfNodeJs: Express Caching Middleware'
    }
};
const cacheExpiration = 10000; // 10 seconds

app.use(cachingMiddleware);

app.get('/test', (req, res) => {
    res.send('Hello, World!');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
