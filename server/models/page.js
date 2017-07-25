var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    // auto-incrementing ID is added by mongoDB automatically
    date: String,
    url: String,
    meta_robots: String,
    title: String,
    meta_desc: String,
    og_title: String,
    og_desc: String
    , _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        } // userforeign key
}, {
    timestamps: true
});

// create model for pages
module.exports = mongoose.model('Page', pageSchema);