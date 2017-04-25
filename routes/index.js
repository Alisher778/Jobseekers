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
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// ######################################################################
// ######################     FACEBOOK LOGIN           ##################
// ######################################################################

var d = ''
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: '1770374113292163',
    clientSecret: 'cd59c8b0a66966b89df4c9cf2762e9d6',
    callbackURL: 'http://localhost:3000/login/facebook/return',
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    
    d = profile.id;
    console.log(d)
    return cb(null, profile);
  }));


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

router.use(passport.initialize());
router.use(passport.session());


router.get('/login/facebook',
  passport.authenticate('facebook', { scope : ['email'] }));

router.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/jobs' }),
  function(req, res) {
    res.redirect('/contact');
    console.log(profile)
    console.log(req.user)
  });







// ######################################################################
// ######################################################################

router.use(require('express-session')({
  secret: "Rusty piece of shit",
  resave: false,
  saveUnitialized: false
}))


router.use(function(req, res, next){
  res.locals.msg = "";
  res.locals.userId = d || req.session.userId;
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
  req.logout();
  res.redirect('/');
  res.locals.msg = "Log Out";

  console.log('Log Out',req.session.userId)
})






/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jobseekers' });
});


// ============ Contact Page ===========================
router.get('/contact', function(req, res){
  res.render('contact');
  console.log('contact -------------------',d)
})

router.post('/contact', function(req, res){

  var body = req.body;

  var options = {
      service: 'gmail',
      auth: {
        user: "web.alisher89@gmail.com",
        pass: 'alisher66'
      }
    };

  var transporter = nodemailer.createTransport(smtpTransport(options));
  var mailOptions = {
    from: body.email,
    to: 'web.alisher89@gmail.com', 
    subject: body.subject,
    replay: body.email,
    text: body.message,
    html: `${body.emails} ${body.message}`
  }
 // let transporter = nodemailer.createTransport(smtpTransport(options));


  transporter.sendMail(mailOptions, function(error){
      if(error){
          console.log(error);
          res.send(error)
      }else{
        console.log('Message sent');
        res.redirect('/');
      }
  });

})


router.get('/search', function(req, res){
  res.render('search');
});

router.post('/search', function(req, res){
  console.log(req.body.search)
  Jobs.find({$text: {$search: req.body.search}})
   .exec(function(err, search){
    if(err){
      res.send(err)
    }else{
      res.render('search_result', {search: search})
    }
   })
})


module.exports = router;
