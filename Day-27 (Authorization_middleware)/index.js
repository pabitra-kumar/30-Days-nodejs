const express = require('express');
const authenticateAndAuthorize = require('./auth');

const app = express();

// Example protected route
app.get('/admin/dashboard', authenticateAndAuthorize, (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard!' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
