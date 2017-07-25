var Page = require('../app/models/page');
var User = require('../app/models/user');

module.exports = function(app) {

    // For complete list of API Endpoints, refer to image in readme.md 

    // Scan
    app.post("/api/scan", function (req, res) {
        scanner.scan(req.body.domain);
    });

    // Retrieve All
    app.get("/api/data", function (req, res) {
        Page.find({}, function (err, data) {
                if (err) 
                    return err;
                if (data) 
                    console.log(data);
                    res.send(data);
            });
        }
    );


    // Find via URL
    // app.get("/api/data", function (req, res) {
    //     Page.find({ "scanned.url": "https://www.shopback.sg/health-beauty" }, function (err, data) {
    //             if (err) 
    //                 return err;
    //             if (data) 
    //                 console.log(data);
    //                 res.send(data);
    //         });
    //     }
    // );
}