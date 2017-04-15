var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('../models/users');
var Jobs = require('../models/jobs');
var flash = require('connect-flash');
var passwordHash  = require('password-hash');




router.use(require('express-session')({
  secret: "Rusty piece of shit",
  resave: false,
  saveUnitialized: false
}))


router.use(function(req, res, next){
  res.locals.msg = "";
  res.locals.userId = req.session.userId;
  res.locals.userType = req.session.userType;
  next();
});


function isLoggedIn(req, res, next){
  if(req.session.userId){
    return next();
  }
  res.locals.msg = "You must be logged in"
  res.render('auth/auth');
  console.log(req.session.userId)
}

// ================ User Authentication =====================


router.get('/register', function(req, res){
  res.render('auth/auth');
  console.log(msg);
});

router.post('/sign-up', function(req, res){
  User.find({username: req.body.username}).then(function(user){
    
    if(user.length != 0){
      res.locals.msg = "This Username is already taken";
      return res.render('auth/auth');
      
    }else{
      User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          who: req.body.who,
          password: passwordHash.generate(req.body.password)
      }).then(function(user){
        
        res.locals.msg = "Success";
        req.session.userId = user.id;
        req.session.userName = user.username;
        req.session.userType = user.who;
        res.redirect('/');
        console.log('Sign Up',req.session.userId)
      })
    }
  })
});

router.post('/login', function(req, res){
  const username = req.body.username;
  const password = req.body.password;
    User.find({ username: username})
          .then(function(user){
            console.log(user)
            const pass = passwordHash.verify(password, user[0].password);
            console.log("before pass", user[0]._id)
            console.log(pass);
            if(pass){
              
              res.locals.msg = "Wrong Email/Password. Please check your email/password!";
              req.session.userId = user[0].id;
              req.session.userName = user[0].username;
              req.session.userType = user[0].who;

              res.redirect('/')
            }else{
              res.locals.msg = "Wrong Email/Password. Please check your email/password!";
              return res.render('auth/auth');
            }
    }).catch((err)=>{
      res.locals.msg = "No account found under this username. Please creat an account!";
      return res.render('auth/auth');
    })
});

router.get('/logout', function(req, res){
  req.session.userId = null;
  res.redirect('/');
  res.locals.msg = "Log Out";

  console.log('Log Out',req.session.userId)
})






/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




module.exports = router;
