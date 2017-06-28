// TODO: Insert and retrieve data to / from MySQL DB
// TODO: 1. Install and load sequelize; install but do not load mysql
// TODO: 2. Set up MySQL connection
// TODO: 3. Define and load models
// TODO: 4. Persist registration information
// TODO: 5. Retrieve department information based on queryString passed. Match queryString to both department name
// TODO: 5. department number
// TODO: 6. Perform eager loading so that the returned data includes the department manager id and name


// DEPENDENCIES ------------------------------------------------------------------------------------------------------
// Loads express module and assigns it to a var called express
var express = require("express");

// Loads path to access helper functions for working with files and directory paths
var path = require("path");

// Loads bodyParser to populate and parse the body property of the request object
var bodyParser = require("body-parser");

// TODO: 1.1 Load sequelize, assign it to a variable called Sequelize
// Loads sequelize ORM
var Sequelize = require("sequelize");

// CONSTANTS ---------------------------------------------------------------------------------------------------------
// Defines server port.
// Value of NODE_PORT is taken from the user environment if defined; port 3000 is used otherwise.
const NODE_PORT = process.env.NODE_PORT || 8080;

// Defines paths
// __dirname is a global that holds the directory name of the current module
const CLIENT_FOLDER = path.join(__dirname + '/../client');  // CLIENT FOLDER is the public directory
const MSG_FOLDER = path.join(CLIENT_FOLDER + '/assets/messages');

// TODO: 2.1 Define MYSQL constants
// Defines MySQL configuration
const MYSQL_USERNAME = 'root';
const MYSQL_PASSWORD = 'root';

// OTHER VARS ---------------------------------------------------------------------------------------------------------
// Creates an instance of express called app
var app = express();

// DBs, MODELS, and ASSOCIATIONS ---------------------------------------------------------------------------------------
//TODO :2.2 Create a connection with mysql DB
// Creates a MySQL connection
var sequelize = new Sequelize(
    'employees',
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

//TODO :3.2 Load Department model
// Loads model for department table
var Department = require('./models/department')(sequelize, Sequelize);
//TODO: 6.2 Load Employee and DeptManager model
var Employee = require('./models/employee')(sequelize, Sequelize);
var Manager = require('./models/deptmanager')(sequelize, Sequelize);

// TODO: 6.3 Define relationship between Department and DeptManager, and between DeptManager and Employee
// TODO: 6.3 This is to allow eager loading (getting related information from different tables)
// Associations. Reference: https://dev.mysql.com/doc/employee/en/sakila-structure.html
// Link Department model to DeptManager model through the dept_no FK. This relationship is 1-to-N and so we use hasMany
// Link DeptManager model to Employee model through the emp_no FK. This relationship is N-to-1 and so we use hasOne
Department.hasMany(Manager, {foreignKey: 'dept_no'});
Manager.hasOne(Employee, {foreignKey: 'emp_no'});

// MIDDLEWARES --------------------------------------------------------------------------------------------------------

// Serves files from public directory (in this case CLIENT_FOLDER).
// __dirname is the absolute path of the application directory.
// if you have not defined a handler for "/" before this line, server will look for index.html in CLIENT_FOLDER
app.use(express.static(CLIENT_FOLDER));

// Populates req.body with information submitted through the registration form.
// Default $http content type is application/json so we use json as the parser type
// For content type is application/x-www-form-urlencoded  use: app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// ROUTE HANDLERS -----------------------------------------------------------------------------------------------------

// Defines endpoint handler exposed to client side for registration
app.post("/departments", function (req, res) {
    // Information sent via an HTTP POST is found in req.body
    console.log('\nData Submitted');
    console.log('Dept No: ' + req.body.dept.id);
    console.log('Dept Name: ' + req.body.dept.name);

    // TODO: 4.1 Persist registration information
    Department
        .create({
            dept_no: req.body.dept.id,
            dept_name: req.body.dept.name
        })
        .then(function (department) {
            console.log(department.get({plain: true}));
            res
                .status(200)
                .json(department);
        })
        .catch(function (err) {
            console.log("error: " + err);
            res
                .status(500)
                .json(err);

        });
});


// Defines endpoint handler exposed to client side for retrieving all department information (static)
app.get("/departments", function (req, res) {

    // Departments contain all departments and is the data returned to client
    var departments = [
        {
            deptNo: 1001,
            deptName: 'Admin'
        }
        , {
            deptNo: 1002,
            deptName: 'Finance'
        }
        , {
            deptNo: 1003,
            deptName: 'Sales'
        }
        , {
            deptNo: 1004,
            deptName: 'HR'
        }
        , {
            deptNo: 1005,
            deptName: 'Staff'
        }
        , {
            deptNo: 1006,
            deptName: 'Customer Care'
        }
        , {
            deptNo: 1007,
            deptName: 'Support'
        }
    ];

    // Return departments as a json object
    res.status(200).json(departments);
});

// TODO: 5.1 Retrieve all department records that match query string passed. Match against dept name and dept no
// Defines endpoint handler exposed to client side for retrieving department information from database. Client side
// sent data as part of the query string, we access query string paramters via the req.query property
app.get("/departmentsDB", function (req, res) {
    Department
    // findAll asks sequelize to search
        .findAll({
            where: {
                // This where condition filters the findAll result so that it only includes department names and
                // department numbers that have the searchstring as a substring (e.g., if user entered 's' as search
                // string, the following
                $or: [
                    {dept_name: {$like: "%" + req.query.searchString + "%"}},
                    {dept_no: {$like: "%" + req.query.searchString + "%"}}
                ]
            }
        })
        .then(function (departments) {
            console.log("departmentsDB then clause");
            res
                .status(200)
                .json(departments);
        })
        .catch(function (err) {
            console.log("departmentsDB error clause: " + err);
            res
                .status(500)
                .json(err);
        });
});


// TODO: 6.4 Retrieve department records that match query string passed. Match against dept name and dept no. Include
// TODO: 6.4 manager information
// Defines endpoint handler exposed to client side for retrieving department records that match query string passed.
// Match against dept name and dept no. Includes manager information. Client side sent data as part of the query
// string, we access query string paramters via the req.query property
app.get("/deptManagers", function (req, res) {
    Department
    // Use findAll to retrieve multiple records
        .findAll({
            // Use the where clause to filter final result; e.g., when you only want to retrieve departments that have
            // "s" in its name
            where: {
                // $or operator tells sequelize to retrieve record that match any of the condition
                $or: [
                    // $like + % tells sequelize that matching is not a strict matching, but a pattern match
                    // % allows you to match any string of zero or more characters
                    {dept_name: {$like: "%" + req.query.searchString + "%"}},
                    {dept_no: {$like: "%" + req.query.searchString + "%"}}
                ]
            }
            // What Include attribute does: Join two or more tables. In this instance:
            // 1. For every Department record that matches the where condition, the include attribute returns
            // ALL employees that have served as managers of said Department
            // 2. model attribute specifies which model to join with primary model
            // 3. order attribute specifies that the list of Managers be ordered from latest to earliest manager
            // 4. limit attribute specifies that only 1 record (in this case the latest manager) should be returned
            , include: [{
                model: Manager
                , order: [["to_date", "DESC"]]
                , limit: 1
                // We include the Employee model to get the manager's name
                , include: [Employee]
            }]
        })
        // this .then() handles successful findAll operation
        // in this example, findAll() used the callback function to return departments
        // we named it departments, but this object also contains info about the
        // latest manager of that department
        .then(function (departments) {
            res
                .status(200)
                .json(departments);
        })
        // this .catch() handles erroneous findAll operation
        .catch(function (err) {
            res
                .status(500)
                .json(err);
        });
});


// ERROR HANDLING ----------------------------------------------------------------------------------------------------
// Handles 404. In Express, 404 responses are not the result of an error,
// so the error-handler middleware will not capture them.
// To handle a 404 response, add a middleware function at the very bottom of the stack
// (below all other path handlers)
app.use(function (req, res) {
    res.status(404).sendFile(path.join(MSG_FOLDER + "/404.html"));
});

// Error handler: server error
app.use(function (err, req, res, next) {
    res.status(500).sendFile(path.join(MSG_FOLDER + '/500.html'));
});


// SERVER / PORT SETUP ------------------------------------------------------------------------------------------------
// Server starts and listens on NODE_PORT
app.listen(NODE_PORT, function () {
    console.log("Server running at http://localhost:" + NODE_PORT);
});
