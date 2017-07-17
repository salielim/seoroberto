// Dependencies
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var Sequelize = require("sequelize");

var session = require("express-session");
var watch = require("connect-ensure-login");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// Constants
const NODE_PORT = process.env.NODE_PORT || 8080;

// Paths
const CLIENT_FOLDER = path.join(__dirname + '/../client');  // CLIENT FOLDER is the public directory
const MSG_FOLDER = path.join(CLIENT_FOLDER + '/assets/messages');

// MySQL configuration
const MYSQL_USERNAME = 'root';
const MYSQL_PASSWORD = 'root';

// Other vars
var app = express();

// DBs, Models
var sequelize = new Sequelize(
    'data',
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    {
        host: 'localhost',         // default port    : 3306
        logging: console.log,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

// Models
var User = require('./models/user')(sequelize, Sequelize);
var Data = require('./models/data')(sequelize, Sequelize);
User.hasMany(Data, { foreignKey: 'user_id' });

// Middlewares
app.use(express.static(CLIENT_FOLDER));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


// ROUTE HANDLERS
// ....

// Error Handling
app.use(function (req, res) {
    res.status(404).sendFile(path.join(MSG_FOLDER + "/404.html"));
});

// Error handler: server error
app.use(function (err, req, res, next) {
    res.status(500).sendFile(path.join(MSG_FOLDER + '/500.html'));
});

// ***Passport
var authenticate = function (username, password, done) {
    var valid = password123; //authenticate with credentials, not shown
    if (valid)
        return (done(null, username));
    return (done(null, false));
}

app.post("/login", passport.authenticate("local", {
  successRedirect: "/status/202",
  failureRedirect: "/status/403" }));

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, authenticate));

// passport.serializeUser(function(username, done) {
//     done(null, username);
// });

// passport.deserializeUser(function(id, done) {
//     var userObject = ...  //Construct user profile based on id
//     done(null, userObject);
// });

app.use(session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Server & Port Setup
app.listen(NODE_PORT, function () {
    console.log("Server running at http://localhost:" + NODE_PORT);
});
