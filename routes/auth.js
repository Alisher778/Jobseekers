var express = require('express');
var router = express.Router();
var models = require('../models');
var passwordHash  = require('password-hash');

models.sequelize.sync();

router.get('/sign-up', function(req, res, next) {
  res.render('auth/sign-up');
});

router.post('/sign-up', function(req, res, next){
  models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: passwordHash.generate(req.body.password)
  }).then(function(user){
    req.session.username = user.id;
    res.redirect('/')
  });
  console.log('Hello');
});




router.get('/logout', function(req, res){
    req.session.username = null;
    res.redirect('/')
    console.log("--------------logged out----------------")
});

router.use(function(req, res, next) {
  if (req.session.username){
    next();
    return;
  }
    res.redirect('/');   
});


module.exports = router;
