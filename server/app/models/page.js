var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
        // auto-incrementing ID is added by mongoDB automatically
        // user: // foreign key
        date: String,
        url: String,
        meta_robots: String,
        title: String,
        meta_desc: String,
        og_title: String,
        og_desc: String
});

// create model for pages
module.exports = mongoose.model('Page', pageSchema);