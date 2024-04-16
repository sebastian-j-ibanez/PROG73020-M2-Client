// Imports.
const express = require('express');

// Set up express app.
const app = express();
app.use(express.json());
app.use(express.static('public'));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Set up authChecker middleware. 
const authChecker = function (req, res, next) {
    const authCookie = req.cookies.vitesse_userauth;
    console.log("--------");
    console.log(`USER ID: ${authCookie}`);
    console.log(`REQ: ${req.path}`);
    if (!authCookie && req.path != "/" && req.path != "/favicon.ico") {
        const status = 401;
        console.log(`RES: ${status}`);
        res.status(status).send("Authentication required.");
    } else {
        next();
    }
};
app.use(authChecker);


// app.use(cors({
//     origin: 'http://localhost:7166',
//     credentials: true
// }))

// Login route.
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

// Listen over specified port.
const port = 8000;
app.listen(port, function() {
    let address = `http://localhost:${port}`;
    console.log(`Listening on ${address}`);
});