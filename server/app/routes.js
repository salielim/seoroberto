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
        $rootScope.currentUser = response;
    });

    // Logged in
    app.get("/loggedin", function(req, res) {
      res.send(req.isAuthenticated() ? req.user : '0');
    });

    // Process login form
    app.post("/login", passport.authenticate("local-login", {
        successRedirect : "/returnSuccess",
        failureRedirect : "/returnFailed",
    }));

    // Register
    app.get("/register", function(req, res) {
        res.render("/app/register/register.html");
        $rootScope.currentUser = user;
    });

    // Process register form
    app.post("/register", passport.authenticate("local-register", {
        successRedirect : "/returnSuccess",
        failureRedirect : "/returnFailed",
    }));

    // Account Settings
    app.get("/settings", isLoggedIn, function(req, res) {
        res.render("/app/protected/settings/settings.html", {
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

// checkloggedin
var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
  var deferred = $q.defer();

  $http.get('/loggedin').success(function(user) {
    $rootScope.errorMessage = null;
    //User is Authenticated
    if (user !== '0') {
      $rootScope.currentUser = user;
      deferred.resolve();
    } else { //User is not Authenticated
      $rootScope.errorMessage = 'You need to log in.';
      deferred.reject();
      $location.url('/login');
    }
  });
  return deferred.promise;
}