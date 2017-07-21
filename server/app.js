// Dependencies
var express = require("express");
var app = express();

var path = require("path");
var bodyParser = require("body-parser");

var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// Database
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

// Constants
const NODE_PORT = process.env.NODE_PORT || 8080;

// Paths
const CLIENT_FOLDER = path.join(__dirname + '/../client');
const MSG_FOLDER = path.join(CLIENT_FOLDER + '/assets/messages');

// Middlewares
require('./config/passport')(passport); 

app.use(express.static(CLIENT_FOLDER));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// Passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Routes
require('./app/routes.js')(app, passport);

// Error Handling
app.use(function (req, res) {
    res.status(404).sendFile(path.join(MSG_FOLDER + "/404.html"));
});

// Error handler: server error
app.use(function (err, req, res, next) {
    res.status(500).sendFile(path.join(MSG_FOLDER + '/500.html'));
});

// Server & Port Setup
app.listen(NODE_PORT, function () {
    console.log("Server running at http://localhost:" + NODE_PORT);
});
