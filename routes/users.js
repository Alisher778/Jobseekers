var express = require('express');
var router = express.Router();
var passwordHash  = require('password-hash');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/linkedin_app');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  password: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
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

// ################### Show User Profile ########################

router.get('/:id', function(req, res){
  User.findById(req.params.id).then(function(user){
    res.render('users/show', {user: user});
  }).catch(function(err){
    res.send(err)
  })
})


// ################## Edit User info ############################

router.get('/:id/edit', function(req, res){
  User.findById(req.params.id).then(function(user){
    res.render('users/edit', {user:user})
  }).catch(function(err){
    res.send(err)
  })
})

router.post('/:id', function(req, res){
  User.findById(req.params.id).then(function(user){
    user.update({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      updatedAt: new Date()
    }).then(function(){
      res.redirect('/users/'+user.id)
    })
  }).catch(function(err){
    res.send(err)
  })
})


// ################### Destroy User ############################### 
router.get('/:id/delete', function(req, res){
  User.remove(req.params.id).then(function(){
    res.redirect('/users')
  })
})

























module.exports = router;
