var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Job = require('../models/jobs');




function isLoggedIn(req, res, next){
  if(req.session.userId){
    return next();
  }
  res.locals.msg = "You must be logged in"
  res.render('auth/auth');
  console.log(req.session.userId)
}

// ============= List of all jobs ================================
router.get('/jobs',  function(req, res, next) {
  Job.find({}).then(function(jobs){
  	res.render('jobs/index', {job: jobs})
  });
});

// ============= Create a job route ==============================

router.get('/jobs/new', function(req, res){
	res.render('jobs/new');
});

router.post('/users/:id/jobs/new', function(req, res){
	Job.create({
		company: req.body.company,
		location: req.body.location,
		title: req.body.title,
		level: req.body.level,
		jobType: req.body.type,
		salary: req.body.salary + "/"+req.body.extension,
		description: req.body.description,
		author: req.params.id,
	}).then(function(job){
		res.locals.msg = "JOb is created successfully.";
		res.redirect('/jobs/'+job.id)
		console.log()
	}).catch(function(err){
		res.locals.msg = "Something went wrong. Try again!";
		res.render('jobs/new');
	})
});

// ============= show specific job ==================================
router.get('/jobs/:id', function(req, res){
	Job.findById(req.params.id).then(function(job){
		res.render('jobs/show', {job: job});
		console.log(job)
	}).catch(function(err){
		console.error(err);
		res.locals.msg = "Something went wrong";
		res.render('jobs/index');
	})
});

router.get('/jobs/:id/delete', function(req, res){
	Job.findByIdAndRemove(req.params.id).then(function(){
		res.locals.msg = "The job is deleted successfully";
		res.redirect('/jobs');
	}).catch(function(err){
		res.send(err)
	})
});

// ================= Update ==========================================

router.get('/jobs/:id/edit', function(req, res){
	Job.findById(req.params.id).then(function(job){
		res.render('jobs/edit', {job: job});
	}).catch(function(err){
		console.error(err);
		res.locals.msg = "Something went wrong";
		res.render('jobs/index');
	})
});

router.post('/jobs/:id/edit', function(req, res){
	Job.findById(req.params.id).then(function(job){
		job.update({
			company: req.body.company,
			location: req.body.location,
			title: req.body.title,
			level: req.body.level,
			jobType: req.body.type,
			salary: req.body.salary + "/"+req.body.extension,
			description: req.body.description,
			updatedAt: new Date()
		}).then(function(job){
			res.redirect('/');
			console.log(job)
		}).catch(function(err){
			console.error(err);
			res.render('jobs/new', {job: job});
		})
	}).catch(function(err){
		console.error(err);
		res.locals.msg = "Something went wrong";
		res.render('jobs/index');
	})
});

// ===== FInd all job that created current user ============================


router.get('/user/:id/job_list', function(req, res){
	Job.find({author:req.params.id}).then(function(job){
		res.render('users/jobs/index', {job: job});
		console.log(job)
	}).catch(function(err){
		console.error(err);
		res.locals.msg = "Something went wrong";
		res.render('jobs/index');
	})
});



























module.exports = router;