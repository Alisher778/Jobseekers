var express = require('express');
var router = express.Router();
var models = require('../models');

models.Job.hasMany(models.User);

router.get('/new', function(req, res, next) {
  res.render('jobs/new');
});

router.post('/new', function(req, res, next){
  models.Job.create({
    title: req.body.title,
    description: req.body.description,
    budget: req.body.budget,
    level: req.body.level,
    category: req.body.category
  }).then(function(user){
    res.redirect('/')
  }).catch(function(error){
    console.error(error)
  })
});

router.get('/', function(req, res, next) {
  models.Job.findAll().then(function(job){
    res.render('jobs/index', {jobs: job})
  })
});


module.exports = router;