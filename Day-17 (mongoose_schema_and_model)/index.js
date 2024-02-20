


const express = require('express');
const app = express();

const { addUserToDatabase } = require('./user.model');

app.use(express.json());

app.post('/users', (req, res) => {

    if (!req.body.name || !req.body.email) {
        res.status(400).send('Bad request');
    }
    const user = {
        name: req.body.name,
        email: req.body.email
    };
    addUserToDatabase(user)
        .then((user) => {
            res.status(201).send(user);
        })
        .catch(() => {
            res.status(500).send('Internal server error');
        });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});