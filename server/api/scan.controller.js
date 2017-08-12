// Models
var Page = require("../models/page");
var User = require("../models/user");

// Scanners
var scanner = require("../config/scanner.js");
var scheduledScanner = require("../config/scheduled-scanner.js");

// Bodyparser
var bodyParser = require("body-parser");

// Passport, Session
var passport = require("passport");
var session = require("express-session");

module.exports = function (app) {
  // Middleware
  app.use(session({ secret: "ilovescotchscotchyscotchscotch" }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser());
  
  // Scan
  app.post("/api/scan", function(req, res) {
    scanner.scan(req.body.domain, req.user);
  });

  // Scheduled Scan
  app.post("/api/scheduled-scan", function(req, res) {
    scheduledScanner.scheduledScan();
  });

  // Schedule Form
  app.post("/api/schedule", function(req, res) {
    User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          schedule_domain: req.body.domain,
          schedule_freq: req.body.frequency
        }
      },
      { new: true },
      function(err, doc) {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
          res.send(doc);
        }
      }
    );
  });

  // Retrieve User Schedule
  app.get("/api/schedule", function(req, res) {
    User.find({ _id: req.user.id }, function(err, data) {
      if (err) return err;
      if (data) res.send(data);
    });
  });
}