// Imports.
const express = require('express');

// Set up express app.
const app = express();
app.use(express.json());
app.use(express.static('public'));
// Set up cookie parser.
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// Set up cors.
const cors = require('cors');
app.use(cors());
// Set up authChecker middleware. 
const authChecker = function (req, res, next) {
    const authCookie = req.cookies.vitesse_userauth;
    console.log("--------");
    console.log(`USER ID: ${authCookie}`);
    console.log(`REQ: ${req.path}`);
    if (!authCookie && req.path != "/") {
        const status = 401;
        console.log(`RES: ${status}`);
        res.status(status).sendFile(__dirname + "/public/AccessDenied.html");
    } else {
        next();
    }
};
app.use(authChecker);

app.use(cors({
    origin: 'https://localhost:7166',
    credentials: true
}))

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

app.get("/profile", function(req, res) {
    const page = '/public/Profile.html';
    res.sendFile(__dirname + page);
    console.log(`SERVE: ${page}`);
});

app.get("/booking", function(req, res) {
    const page = '/public/Booking.html';
    res.sendFile(__dirname + page);
    console.log(`SERVE: ${page}`);
});

// Listen over specified port.
const port = 8000;
app.listen(port, function() {
    let address = `http://localhost:${port}`;
    console.log(`Listening on ${address}`);
});