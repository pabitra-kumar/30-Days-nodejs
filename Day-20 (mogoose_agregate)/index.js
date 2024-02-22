const express = require('express');
const mongoose = require('mongoose');

// Assuming you have a User model defined with a 'age' field
const User = require('./models/User');

const app = express();
const port = 3000;

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect('your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true });

// Express route to calculate the average age of all users in MongoDB
app.get('/average-age', async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $group: {
                    _id: null,
                    averageAge: { $avg: '$age' }
                }
            }
        ]);

        if (result.length === 0) {
            // Handle case where there are no users in the database
            return res.status(404).json({ error: 'No users found' });
        }

        const averageAge = result[0].averageAge;

        res.json({ averageAge });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
