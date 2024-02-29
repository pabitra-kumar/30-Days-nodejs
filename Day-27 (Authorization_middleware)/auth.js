const jwt = require('jsonwebtoken');

// Assuming you have a User model for retrieving user information
const User = require('./models/User'); // Replace with your actual User model path

function authenticateAndAuthorize(req, res, next) {
    // Get the token from the request headers
    const token = req.header('Authorization');

    // Check if the token is present
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'your-secret-key'); // Replace with your actual secret key

        // Attach the user information to the request for further use in routes
        req.user = decoded;

        // Check user role for authorization
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }

        // User is authenticated and authorized
        next();
    } catch (error) {
        console.error('Error authenticating and authorizing:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

module.exports = authenticateAndAuthorize;
