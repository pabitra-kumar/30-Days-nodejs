
const express = require('express');
const app = express();

function positiveIntegerHandler(req, res) {
    let number = req?.query?.number;
    console.log(number);
    number = parseInt(number);
    if (Number.isInteger(number) && number > 0) {
        res.send("The number is positive");
    } else {
        throw new Error('Invalid Input');
    }
}

function errorHandler(err, req, res, next) {
    res.status(400).send('Invalid Input');
}

app.get('/positive', positiveIntegerHandler);
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
