var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");

// Mailgun
var api_key = process.env.MY_MAILGUN_KEY;
var domain = process.env.MY_MAILGUN_DOMAIN;
var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

module.exports = function (passport) {
  // passport serialize & unserialize users out of session, required for persistent login sessions

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      user = { email: user.email, id: user._id };
      done(err, user);
    });
  });

  // Register
  passport.use(
    "local-register",
    new LocalStrategy(
      {
        usernameField: "email", // override with email
        passwordField: "password",
        passReqToCallback: true
      },
      function (req, email, password, done) {
        // asynchronous, User.findOne wont fire unless data is sent back
        process.nextTick(function () {
          User.findOne({ email: email }, function (err, user) {
            if (err) return done(err);

            if (user) {
              return done(null, false);
            } else {
              var newUser = new User();

              newUser.email = email;
              newUser.password = newUser.generateHash(password);

              newUser.save(function (err) {
                if (err) throw err;
                return done(null, newUser);
              });

              // Send welcome email on successful registration
              var data = {
                from: "SEORoberto <roberto@seoroberto.com>",
                to: email,
                subject: "Welcome to SEORoberto!",
                text: "Thank you for registering, visit SEO Roberto to start a scan."
              };

              mailgun.messages().send(data, function (error, body) {
                console.log(body);
              });
            }
          });
        });
      }
    )
  );

  // Login
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function (req, email, password, done) {
        User.findOne({ email: email }, function (err, user) {
          if (err) return done(err);

          if (!user) return done(null, false);

          if (!user.validPassword(password)) {
            return done(null, false);
          }
          return done(null, user);
        });
      }
    )
  );
};
