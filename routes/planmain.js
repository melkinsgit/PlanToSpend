// plan main js

var express = require('express');
var router = express.Router();
var passport = require('passport');

var Spend = require('../models/spend.js');

/* GET signup page - can't get message anymore */
router.get('/planMain', function (req, res, next) {
	// could I send the user to planMain and then pass it to the other pages?
	res.render('planMain', {message: req.flash('signupMessage')})
});

/* GET seePlan */
router.get('/seePlan', function (req, res, next){
	res.render('seePlan');
});

/* GET signup page - can't get message anymore */
router.get('/signup', function (req, res, next) {
	res.render('signup', {message: req.flash('signupMessage')})
});

/* POST see current plan */
router.post('/seePlan', function (req, res, next){
	Spend.find(function(err, spendDocs){
	if (err) { return next(err); }
	return res.render('index', { spends: spendDocs, error: req.flash('error') });  // returns an array of JSON ojbects type Spend called spends; planItems.jade deals with spends, displaying them etc.
  });
}); // end of post

module.exports = router;