var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/sign-up', function(req, res, next) {
  res.render('auth/sign-up');
});

module.exports = router;
