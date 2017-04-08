var express = require('express');
var router = express.Router();
var passwordHash  = require('password-hash');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/linkedin_app');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  password: String
});

var User = mongoose.model('User', userSchema);

router.get('/sign-up', function(req, res){
  res.render('users/sign-up');
});

// ################## Create New User ##########################
router.post('/new', function(req, res){
  User.create({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: passwordHash.generate(req.body.password)
  }).then(function(user){
    res.redirect('/users')
  }).catch(function(err){
    res.send(err)
  })
});

// ################### All Users ################################
router.get('/', function(req, res){
  User.find({}).then(function(users){
    res.render('users/index', {user: users})
  }).catch(function(err){
    res.send(err)
  })
})


module.exports = router;
