// index js handles sign up, login and logout

var express = require('express');
var router = express.Router();
var passport = require('passport');

//var Spend = require('../models/spend.js');

/* GET home page. renders index jade */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Plan To Spend' });
});  // end get


/* GET signup page - can't get message anymore */
router.get('/signup', function (req, res, next) {
	res.render('signup', {message: req.flash('signupMessage')})
});

// POST what happens when user clicks signup button
router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/planmain/planMain',
	failureRedirect: '/signup',
	failureFlash: true
}));

// Get login page
router.get('/login', function(req, res, next){
	res.render('login', {message: req.flash('loginMessage')})
});

// Post login - when clicking login button - what's supposed to happen
router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/planmain/planMain',  // is req.user for this now set to the user?
	failureRedirect: '/login',
	failureFlash: true
}));


/* GET Logout */
router.get('/logout', function(req, res, next) {
  req.logout();         //passport middleware adds these functions to req.
  res.render('logout');
});

module.exports = router;
