var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    scanned: {
        date: String,
        url: String,
        meta_robots: String,
        title: String,
        meta_desc: String,
        og_title: String,
        og_desc: String,
        // h1: String,
        // h2: String
    }
});

// create model for pages
module.exports = mongoose.model('Page', pageSchema);