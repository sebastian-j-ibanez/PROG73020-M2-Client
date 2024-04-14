// Imports.
const express = require('express');

// Setup express app.
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

const port = 8000;

app.listen(port, function() {
    let address = `http://localhost:${port}`;
    console.log(`Listening on ${address}`);
});