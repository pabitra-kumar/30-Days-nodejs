const mongoose = require('mongoose');

// Define the user schema with validation for the email property
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Custom email validation using a regular expression
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address',
        },
    },
});

// Create a Mongoose model from the schema
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name');

// Function to add a new user to the MongoDB database with validation
function addUserWithValidation(user) {
    // Create a new user instance using the Mongoose model
    const newUser = new User(user);

    // Save the user to the database
    newUser.save((err) => {
        if (err) {
            // Handle validation errors or other errors
            console.error('Error adding user:', err.message);
        } else {
            // User successfully added
            console.log('User added successfully');
        }

        // Close the MongoDB connection (optional)
        mongoose.connection.close();
    });
}

// Test Cases
addUserWithValidation({ username: 'john_doe', email: 'invalid-email' });
