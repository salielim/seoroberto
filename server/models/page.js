var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    // auto-incrementing ID is added by mongoDB automatically
    date: { type: Date, default: Date.now }, // mongoose inbuilt timestamp doesn't work, neither does the plugin
    url: String,
    meta_robots: String,
    title: String,
    meta_desc: String,
    og_title: String,
    og_desc: String,
    user_id: String, // foreign key
});

// create model for pages
module.exports = mongoose.model('Page', pageSchema);