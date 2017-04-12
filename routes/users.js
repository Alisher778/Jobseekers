var express = require('express');
var router = express.Router();
var User = require("../models/users");


router.get('/sign-up', function(req, res){
  res.render('users/sign-up');
});


// ################### All Users ################################
router.get('/', function(req, res){
  User.find({}).then(function(users){
    res.render('users/index', {user: users})
  }).catch(function(err){
    res.send(err)
  })
});

router.get('/:id', function(req, res){
  User.findById(req.params.id).then(function(user){
    res.render('users/show', {user:user})
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


// ################### Destroy User ############# 
router.get('/:id/delete', function(req, res){
  User.findByIdAndRemove(req.params.id).then(function(){
    res.redirect('/users')
  })
})














module.exports = router;
