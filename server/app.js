// Dependencies
var express = require("express");
var app = express();
var path = require("path");
var mongoose = require("mongoose");
var passport = require("passport");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");

// API Controllers
require("./api/scan.controller.js")(app);
require("./api/data.controller.js")(app);
require("./api/user.routes.js")(app, passport);

// Passport
require("./config/passport")(passport);

// Paths
const CLIENT_FOLDER = path.join(__dirname + "/../client");
const MSG_FOLDER = path.join(CLIENT_FOLDER + "/assets/messages");
app.use(express.static(CLIENT_FOLDER));

// Database
var configDB = require("./config/database.js");
mongoose.connect(process.env.MONGODB_URI || configDB.url);

// Error Handling
app.use(function(req, res) {
  res.status(404).sendFile(path.join(MSG_FOLDER + "/404.html"));
});

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).sendFile(path.join(MSG_FOLDER + "/500.html")); // server error
});

// Server & Port Setup
var NODE_PORT = process.env.PORT || 8080;
app.listen(NODE_PORT, function() {
  console.log("Server running at http://localhost:" + NODE_PORT);
});
