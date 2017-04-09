var mongoose = require('mongoose');
var jobSchema = new mongoose.Schema({
  title: String,
  budget: String,
  description: String,
  employer: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

var Job = mongoose.model("Job", jobSchema);

module.exports = Job;