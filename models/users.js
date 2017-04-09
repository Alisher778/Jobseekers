var mongoose = require('mongoose');
var Job = require("./jobs");

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  password: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  jobs: [{type: mongoose.Schema.Types.ObjectId, ref: "Job"}]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
