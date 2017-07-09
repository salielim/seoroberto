// Dependencies
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var Sequelize = require("sequelize");

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
User.hasMany(Data, {foreignKey: 'user_id'});

// Middlewares
app.use(express.static(CLIENT_FOLDER));
app.use(bodyParser.json());


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


// Server & Port Setup
app.listen(NODE_PORT, function () {
    console.log("Server running at http://localhost:" + NODE_PORT);
});
