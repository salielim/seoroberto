var User = require("../../database").User;
var AuthProvider = require("../../database").AuthProvider;
var bcrypt   = require('bcryptjs');
var config = require("../../config");
var api_key = config.mailgun_key;
var domain = config.mailgun_domain;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var mailcomposer = require('mailcomposer');

exports.get = function (req, res) {
    User
        .findById(req.params.id)
        .then(function (user) {

            if (!user) {
                handler404(res);
            }

            res.json(user);
        })
        .catch(function (err) {
            handleErr(res, err);
        });
};

exports.register = function(req, res) {
    if(!req.body.password === req.body.confirmpassword) {
        return res.status(500).json({
            err: err
        });
    }
    console.log(req.body.password);
    var hashpassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    User.findOrCreate({where: {email: req.body.username,},defaults: {
        username: req.body.username,
        email: req.body.username,
        password: hashpassword}})
        .spread(function(user, created) {
            if(created){
                user.password = "";
                res.status(200);
                var data = {
                    from: config.register_email.from,
                    to: user.email,
                    subject: config.register_email.subject,
                    text: config.register_email.email_text
                };
                
                mailgun.messages().send(data, function (error, body) {
                    console.log(body);
                });
                returnResults(user,res);
            }else{
                user.password = "";
                handleErr(res);
            }
        }).error(function(error){
            handleErr(res, err);
    });
};

exports.list = function (req, res) {
    User
        .findAll()
        .then(function (users) {
            res.json(users);
        })
        .catch(function (err) {
            handleErr(res, err);
        });
};