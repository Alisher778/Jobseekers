var express = require('express');
var router = express.Router();
var User = require("../models/users");


router.use(function(req, res, next){
  res.locals.msg = "";
  next();
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


router.post('/:id/edit', function(req, res){
  User.findById(req.params.id).then(function(user){
    user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      updatedAt: new Date()
    }).then(function(){
      res.locals.msg = "Nice"
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
