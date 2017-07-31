var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var api_key = process.env.MAILGUN_KEY;
var domain = 'sandboxbf812b83405d4b6096eaf6293f0a2a96.mailgun.org';
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

var data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'salie.lim@gmail.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
};

module.exports = function (passport) {

    // passport serialize & unserialize users out of session, required for persistent login sessions

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            // user1 = {email: user.email, id: user._id} ;
            // done(err, user1);
            user = { email: user.email, id: user._id };
            done(err, user);
        });
    });

    // Register
    passport.use('local-register', new LocalStrategy({
        usernameField: 'email', // override with email
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {

            // asynchronous, User.findOne wont fire unless data is sent back
            process.nextTick(function () {

                // find a user whose email is the same as the forms email
                User.findOne({ 'email': email }, function (err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, false);
                    } else {

                        // if no user with that email, create the user
                        var newUser = new User();

                        // set user's local credentials
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        // newUser.date = today;

                        // save the user
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });

                        mailgun.messages().send(data, function (error, body) {
                            console.log(body);
                        });
                    }
                });
            });
        }));

    // Login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            // console.log('hello from local');
            // find a user whose email is the same as the forms email
            User.findOne({ 'email': email }, function (err, user) {
                if (err)
                    return done(err);

                // if no user found, return message
                if (!user)
                    return done(null, false);

                // if user found but password is wrong

                if (!user.validPassword(password)) {
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