var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    // auto-incrementing ID is added by mongoDB automatically
    email: String,
    password: String,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// generating hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// create model for users
module.exports = mongoose.model('User', userSchema);