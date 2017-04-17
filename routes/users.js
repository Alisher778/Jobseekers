var express = require('express');
var router = express.Router();
var User = require("../models/users");
var Job = require("../models/jobs");
var SavedJob = require("../models/saved_jobs");


function isLoggedIn(req, res, next){
  if(req.session.userId){
    return next();
  }
  res.locals.msg = "You must be logged in"
  res.render('auth/auth');
  console.log(req.session.userId)
}

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




// ##########################################################################
// ##########################################################################
// =========================== User Saved Jobs =============================
// ##########################################################################

router.post('/:id/saved_job/:job_id/new', isLoggedIn, function(req, res){
  if(req.params.id != 11){
    Job.findById(req.params.job_id).then(function(savedJob){
        SavedJob.create({
          user_id: req.params.id,
          saved_job: savedJob
        }).then(function(job){
          res.redirect('/users/'+req.params.id+'/my_saved_jobs');
          console.log(job)
        }).catch(function(err){
          res.send(err)
          console.log(err)
        })
    })
  }else{
    res.redirect('/jobs');
    // USe Jquery for this route
  }
  
})

// =================== Show all my saved jobs ================================
router.get('/:id/my_saved_jobs', function(req, res){
  SavedJob.find({user_id: req.params.id}).then(function(job){
    res.render('users/jobs/index', {job: job})
    console.log(job.saved_job)
  }).catch(function(err){
    res.send(err)
  })
});

// =================== delete my saved job list ==============================
router.get('/saved_job/:id/delete', function(req, res){
  SavedJob.findByIdAndRemove(req.params.id).then(function(job){
    res.redirect('/users/'+job.user_id+'/my_saved_jobs')
  }).catch(function(err){
    console.log(err);
    res.json(err);
  });
});













module.exports = router;
