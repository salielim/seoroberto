module.exports = function(app, passport) {

    // app.get('/', function(req, res) {
    //     res.render('login.html');
    // });

    // Login
    app.get('/login', function(req, res) {
        res.render('login.html', { message: req.flash('loginMessage') }); 
    });

    // Process Login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the register page if there is an error
        failureFlash : true // allow flash messages
    }));

    // Register
    app.get('/register', function(req, res) {
        res.render('register.html', { message: req.flash('registerMessage') });
    });

    // Process register form
   app.post('/register', passport.authenticate('local-register', {
        successRedirect : '/profile',
        failureRedirect : '/register',
        failureFlash : true
    }));

    // Account Settings
    app.get('/settings', isLoggedIn, function(req, res) {
        res.render('settings.html', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // Logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to ensure logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated, carry on 
    if (req.isAuthenticated())
        return next();

    // if user is not authenticated, redirect to home page
    res.redirect('/');
}