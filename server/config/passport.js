var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
    
    // passport serialize & unserialize users out of session, required for persistent login sessions

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Register
    passport.use('local-register', new LocalStrategy({
        usernameField : 'email', // override with email
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        // asynchronous, User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        User.findOne({ 'email' :  email }, function(err, user) {
            if (err)
                return done(err);

            if (user) {
                return done(null, false);
            } else {

                // if no user with that email, create the user
                var newUser = new User();

                // set user's local credentials
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

    // Login
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        // console.log('hello from local');
        // find a user whose email is the same as the forms email
        User.findOne({ 'email' :  email }, function(err, user) {
            if (err)
                return done(err);

            // if no user found, return message
            if (!user)
                return done(null, false);

            // if user found but password is wrong
        
            if (!user.validPassword(password)){
                // console.log('invalid password');
                // console.log(user);
                return done(null, false); 
            }
            // return successful user
            // console.log('hello from local hey');
            return done(null, user);
        });

    }));

};