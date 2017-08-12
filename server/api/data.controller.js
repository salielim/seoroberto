// Models
var Page = require("../models/page");
var User = require("../models/user");

// Passport, Session
var passport = require("passport");
var session = require("express-session");

module.exports = function (app) {
  // Middleware
  app.use(session({ secret: "ilovescotchscotchyscotchscotch" }));
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Retrieve All Data
  app.get("/api/data", function(req, res) {
    Page.find({ user_id: req.user.id }, function(err, data) {
      if (err) return err;
      if (data) res.send(data);
    }).sort({ created_at: "desc" });
  });

  // Retrieve Scanned Today Data
  app.get("/api/scanned", function(req, res) {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    Page.find(
      { user_id: req.user.id, created_at: { $gte: startOfToday } },
      function(err, data) {
        if (err) return err;
        if (data) res.send(data);
      }
    ).sort({ created_at: "desc" });
  });
}