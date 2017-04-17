var mongoose = require('mongoose');

var savedJobSchema = new mongoose.Schema({
		user_id: String,
		saved_job: {},
		createdAt: {type: Date, default: Date.now},
	    updatedAt: {type: Date, default: Date.now}
    })

var SavedJob = mongoose.model('SavedJob', savedJobSchema);

module.exports = SavedJob;