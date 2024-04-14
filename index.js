// Imports.
const express = require('express');

// Setup express app.
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get("/", function(req, res) {
    const page = '/public/Login.html';
    res.sendFile(__dirname + page);
});

const port = 8000;
app.listen(port, function() {
    let address = `http://localhost:${port}`;
    console.log(`Listening on ${address}`);
});