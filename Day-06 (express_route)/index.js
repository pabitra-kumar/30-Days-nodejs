
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/greet', (req, res) => {
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}!`);
    }
    else {
        res.send('Hello, Guest!');
    }
});

app.listen(PORT, () => console.log(`server listening at PORT ${PORT}`))