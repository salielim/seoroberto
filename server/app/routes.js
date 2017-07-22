module.exports = function(app, passport) {

    // Protected
    // app.get("/protected/", checkLoggedin, function(req, res){
    //     if(req.user == null){
    //         res.redirect("/#!/login");
    //     }
    // })

    // Return success or failed
    app.use('/returnSuccess', function(req, res){
        console.log('in returnSuccess');
        res.send("successful");
    });

    app.use('/returnFailed', function(req, res){
        console.log('in returnFailed');
        res.send(null);
    });

    // Login
    app.get("/login", function(req, res) {
        res.render("/app/login/login.html");
    });

    // Process login form
    app.post("/login", passport.authenticate("local-login", {
        successRedirect : "/returnSuccess",
        failureRedirect : "/returnFailed",
    }));

    // Register
    app.get("/register", function(req, res) {
        res.render("/app/register/register.html");
    });

    // Process register form
    app.post("/register", passport.authenticate("local-register", {
        successRedirect : "/returnSuccess",
        failureRedirect : "/returnFailed",
    }));

    // Account Settings
    app.get("/settings", function(req, res) {
        res.render("/app/protected/settings/settings.html", {
            user : req.user // get the user out of session and pass to template
        });
    });

    // Logout
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/#!/login");
    });

    // Loggedin
    app.get("/loggedin", function(req, res) {
      res.send(req.isAuthenticated() ? req.user : '0');
    });

};