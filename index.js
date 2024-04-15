// Imports.
const express = require('express');

// Setup express app.
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get("/", function(req, res) {
    const page = '/public/Login.html';
    res.sendFile(__dirname + page);
    console.log(`SERVE: ${page}`);
});

app.get("/cars", function(req, res) {
    const page = '/public/CarList.html';
    res.sendFile(__dirname + page);
    console.log(`SERVE: ${page}`);
});

const port = 8000;
app.listen(port, function() {
    let address = `http://localhost:${port}`;
    console.log(`Listening on ${address}`);
});