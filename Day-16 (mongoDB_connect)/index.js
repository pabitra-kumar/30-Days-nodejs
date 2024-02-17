/**
 * Establishes a connection to MongoDB using Mongoose
 */

require('dotenv').config();
const mongoose = require('mongoose');
connectToMongoDB();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

function connectToMongoDB() {

    mongoose.connect(process.env.DATABASE_URI);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
}

app.get('/', (req, res) => {
    res.send('Hello World');
});


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});



