const express = require('express');
const errorHandler = require('./path-to-error-handler-middleware');

const app = express();

// Your routes and middleware go here

// Add the error handling middleware at the end
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
