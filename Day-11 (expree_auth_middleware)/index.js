
// Expected Output:

// If a valid JWT is present, allow the request to proceed.
// If no JWT is present or it's invalid, return a 401 Unauthorized status.
// Test Cases:

// Request with a valid JWT should proceed.
// Request without a JWT or with an invalid JWT should return a 401 Unauthorized status.


const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

function authenticationMiddleware(req, res, next) {
    {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send('Unauthorized');
        }

        jwt.verify(token, 'secret', (err, user) => {
            if (err) {
                return res.status(401).send('Unauthorized');
            }
            req.user = user;
            next();
        }
        );
    }
}

app.use(authenticationMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

app.listen(3000, () => console.log('Server started on port 3000'));