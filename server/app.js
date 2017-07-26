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

// Fix bson bug
bson = require('./node_modules/mongoose/node_modules/bson/browser_build/bson.js');

// Database
var configDB = require('./config/database.js');
mongoose.connect(process.env.MONGOLAB_URI || configDB.url);
// mongoose.connect(configDB.url);

// Models
var Page = require('./models/page');
var User = require('./models/user');

var scanner = require("./config/scanner.js");

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

// *** APIs - move & export this into API folder later
// For complete list of API Endpoints, refer to image in readme.md 
// Scan
app.post("/api/scan", function (req, res) {
    console.log("hi api scan");
    scanner.scan(req.body.domain);
});

// Retrieve All
app.get("/api/data", function (req, res) {
    Page.find({}, function (err, data) {
            if (err) 
                return err;
            if (data) 
                console.log(data);
                res.send(data);
        });
    }
);

// Find via URL
// app.get("/api/data", function (req, res) {
//     Page.find({ "scanned.url": "https://www.shopback.sg/health-beauty" }, function (err, data) {
//             if (err) 
//                 return err;
//             if (data) 
//                 console.log(data);
//                 res.send(data);
//         });
//     }
// );

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