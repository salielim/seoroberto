var Page = require("../models/page");
var User = require("../models/user");

module.exports = function(app, passport) {

    // For complete list of API Endpoints, refer to image in readme.md 

    // Return success or failed
    app.use("/returnSuccess", function(req, res){
        console.log("in returnSuccess");
        res.send("successful"); // in lieu of using res.status(200)
    });

    app.use("/returnFailed", function(req, res){
        console.log("in returnFailed");
        res.send(null);
    });

    // Login
    app.get("/login", function(req, res) {
        res.status(200);
    });

    // Process login form
    app.post("/login", passport.authenticate("local-login", {
        successRedirect : "/returnSuccess", 
        failureRedirect : "/returnFailed",
    }));

    // Register
    app.get("/register", function(req, res) {
        res.status(200);
    });

    // Process register form
    app.post("/register", passport.authenticate("local-register", {
        successRedirect : "/returnSuccess",
        failureRedirect : "/returnFailed",
    }));

    // Profile & Settings
    app.get("/settings", function(req, res) {
            var user = req.user; // get the user out of session and pass to template
            console.log(req.user);
    });

    // Logout
    app.post("/logout", function(req, res) {
        req.logout();
        res.send(200);
        // res.redirect("/#!/login");
    });

    // Loggedin
    app.get("/loggedin", function(req, res) {
      res.send(req.isAuthenticated() ? req.user : "0");
    });

    // Protected
    // app.get("/protected/", checkLoggedin, function(req, res){
    //     if(req.user == null){
    //         res.redirect("/#!/login");
    //     }
    // })

};