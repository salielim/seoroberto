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
mongoose.connect(process.env.MONGODB_URI || configDB.url);

// Models
var Page = require('./models/page');
var User = require('./models/user');

var scanner = require("./config/scanner.js");
var scheduledScanner = require("./config/scheduled-scanner.js");

// Constants
var NODE_PORT = process.env.PORT || 8080;

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
require('./config/user.routes.js')(app, passport);

// *** APIs
// Scan 
app.post("/api/scan", function (req, res) {
    scanner.scan(req.body.domain, req.user);
});

// Scheduled Scan 
app.post("/api/scheduled-scan", function (req, res) {
    scheduledScanner.scheduledScan();
});

// Schedule Form
app.post("/api/schedule", function (req, res) {
    User.findOneAndUpdate({ '_id': req.user.id }, { $set: { schedule_domain: req.body.domain, schedule_freq: req.body.frequency } }, { new: true }, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
            res.send(doc);
        }
    });
});

// Retrieve User Schedule
app.get("/api/schedule", function (req, res) {
    User.find({ _id: req.user.id }, function (err, data) {
        if (err)
            return err;
        if (data)
            res.send(data);
    });
});

// Retrieve All Data
app.get("/api/data", function (req, res) {
    Page.find({ user_id: req.user.id }, function (err, data) {
        if (err)
            return err;
        if (data)
            res.send(data);
    });
});

// Retrieve Scanned Today Data
app.get("/api/scanned", function (req, res) {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    Page.find({ user_id: req.user.id, created_at: { $gte: startOfToday } }, function (err, data) {
        if (err)
            return err;
        if (data)
            res.send(data);
    });
}
);

// Error Handling
app.use(function (req, res) {
    res.status(404).sendFile(path.join(MSG_FOLDER + "/404.html"));
});

// Error handler: server error
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).sendFile(path.join(MSG_FOLDER + '/500.html'));
});

// Server & Port Setup
app.listen(NODE_PORT, function () {
    console.log("Server running at http://localhost:" + NODE_PORT);
});