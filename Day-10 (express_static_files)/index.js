const express = require('express');
const app = express();
const path = require('path');

function staticFileServer(req, res) {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    res.sendFile(path.join(__dirname, 'public', filePath));
}
app.get('/', staticFileServer);
app.get('/styles/style.css', staticFileServer);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});