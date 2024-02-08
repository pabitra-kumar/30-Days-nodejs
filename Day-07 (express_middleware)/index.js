
const express = require('express');
const app = express();

function requestLoggerMiddleware(req, res, next) {
    console.log(`${new Date()} - ${req.method} request received`);
    res.send('Logged the request');
    next();
}

app.use(requestLoggerMiddleware);


app.listen(3000, () => console.log('Server listening at PORT 3000'));