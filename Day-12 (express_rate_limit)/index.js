// Expected Output:

// If the number of requests from a single IP is below the limit, allow the request to proceed.
// If the limit is exceeded, return a 429 Too Many Requests status.
// Test Cases:

// Send requests within the limit; all should proceed.
// Send requests exceeding the limit; some should return a 429 status.

const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

function rateLimitMiddleware(req, res, next) {
    console.log('Too Many Requests')
    res.status(429).send('Too Many Requests');
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: rateLimitMiddleware,
    message: 'Too Many Requests'
});

app.use(limiter);

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

app.listen(3000, () => console.log('Server started on port 3000'));

// The rateLimit function from the express-rate-limit package is used to create a middleware that limits the number of requests from a single IP address. The windowMs option sets the time window for the limit, and the max option sets the maximum number of requests allowed within the window. If the limit is exceeded, the rateLimitMiddleware function is called, which returns a 429 Too Many Requests status. The limiter middleware is then applied to all routes using app.use(limiter). This ensures that all requests are subject to the rate limit.