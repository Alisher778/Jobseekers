var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/linkedin_app');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  role: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;