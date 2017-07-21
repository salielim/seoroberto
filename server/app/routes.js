module.exports = function(app, passport) {

    // app.get("/", function(req, res) {
    //     res.render("login.html");
    // });

    // Users API
    // app.get("/api/users", isAuthenticated, UserController.list);
    // app.post("/api/users", isAuthenticated, UserController.create);

    // Data API
    // ...

    // Protected
    // app.get("/protected/", isAuthenticated, function(req, res){
    //     if(req.user == null){
    //         res.redirect("/#!/login");
    //     }
    // })

    // function isAuthenticated(req, res, next) {
    //     if (req.isAuthenticated())
    //         return next();
    //     res.redirect(SIGNIN_PAGE);
    // }
    // app.use(function(req, res, next){
    //     if(req.user == null){
    //         res.redirect(SIGNIN_PAGE);
    //     }
    //     next();
    // });

    // Login
    app.get("/login", function(req, res) {
        res.render("login.html", { message: req.flash("loginMessage") }); 
    });

    // Process login form
    app.post("/login", passport.authenticate("local-login", {
        successRedirect : "/#!/scan",
        failureRedirect : "/#!/login",
        failureFlash : true
    }));

    // Register
    app.get("/register", function(req, res) {
        res.render("register.html", { message: req.flash("registerMessage") });
    });

    // Process register form
    app.post("/register", passport.authenticate("local-register", {
        successRedirect : "/#!/scan",
        failureRedirect : "/",
        failureFlash : true
    }));

    // Account Settings
    app.get("/settings", isLoggedIn, function(req, res) {
        res.render("settings.html", {
            user : req.user // get the user out of session and pass to template
        });
    });

    // Logout
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });
};

// route middleware to ensure logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated, carry on 
    if (req.isAuthenticated())
        return next();

    // if user is not authenticated, redirect to home page
    res.redirect("/");
}