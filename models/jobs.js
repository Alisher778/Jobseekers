var mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
	company: String,
		title: String,
		level: String,
		location: String,
		jobType: String,
		salary: String,
		description: String,
		likes: {type: Number, default: 0},
		author: String,
		createdAt: {type: Date, default: Date.now},
	    updatedAt: {type: Date, default: Date.now}
    })

var Job = mongoose.model('Job', jobSchema);

module.exports = Job;