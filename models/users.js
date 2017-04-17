var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Job = require('./jobs'); 

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: {type: String, unique : true},
  who: {type: String, default: "worker"},
  password: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
});

userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', userSchema);

module.exports = User;
