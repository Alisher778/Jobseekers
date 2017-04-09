var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Job = require("../models/jobs");
var User = require("../models/users");

router.get('/new', function(req, res){
  res.render('jobs/new');
});


router.get('/', function(req, res){
  Job.find({}).then(function(job){
    res.render('jobs/index', {job: job})
  })
});


router.post('/new', function(req, res){
  Job.create({
    title: req.body.title,
    budget: req.body.budget,
    description: req.body.description,
    employer: req.body.employer,
  }).then(function(job){
    res.redirect('/')
  }).catch(function(err){
    res.send("Something went wrong")
  })
})

// #################### Show Jobs ###########################
router.get('/:id', function(req, res){
  Job.findById(req.params.id).then(function(job){
    res.render('jobs/show', {job: job});
  }).catch(function(err){
    res.send(err)
  })
})


// ################## Edit job info ############################

router.get('/:id/edit', function(req, res){
  Job.findById(req.params.id).then(function(job){
    res.render('jobs/edit', {job:job})
  }).catch(function(err){
    res.send(err)
  })
})

router.post("/:id", function(req, res){
  Job.findById(req.params.id).then(function(job){
    job.update({
      title: req.body.title,
      budget: req.body.budget,
      description: req.body.description,
      employer: req.body.employer
    }).then(function(job){
      res.redirect('/')
    }).catch(function(err){
      res.send("Something went wrong")
    })
  })
})


// ################### Destroy job ############################### 
router.get('/:id/delete', function(req, res){
  Job.remove(req.params.id).then(function(){
    res.redirect('/jobs')
  })
})

















module.exports = router;