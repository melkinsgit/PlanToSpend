var express = require('express');
var router = express.Router();
var passport = require('passport');

var Spend = require('../models/spend.js');

/* GET home page. renders index jade */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Plan To Spend' });
});  // end get

/* GET seePlan */
router.get('/seePlan', function (req, res, next){
	res.render('seePlan');
});

/* GET signup page - can't get message anymore */
router.get('/signup', function (req, res, next) {
	res.render('signup', {message: req.flash('signupMessage')})
});

/* GET signup page - can't get message anymore */
router.get('/planMain', function (req, res, next) {
	res.render('planMain', {message: req.flash('signupMessage')})
});

/* POST planMain page */
router.post('/planMain', function (req, res, next) {
	res.render('login');
	// res.render('planMain');
}); // end of post

/* POST see current plan */
router.post('/seePlan', function (req, res, next){
	Spend.find(function(err, spendDocs){
	if (err) { return next(err); }
	return res.render('index', { spends: spendDocs, error: req.flash('error') });  // returns an array of JSON ojbects type Spend called spends; planItems.jade deals with spends, displaying them etc.
  });
}); // end of post

// POST what happens when user clicks signup button
router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/seePlan',
	failureRedirect: '/signup',
	failureFlash: true
}));

/* POST renders planMain jade when user clicks signup button */
// router.post('/signup', function(req, res, next){
	// res.render('planMain');
// });

// router.get('/secret', isLoggedIn, function(req, res, next) {
	// res.render('secret', {user: req.user, updateMessage: req.flash('updateMsg')});
// } );


/* Middleware function. If user is logged in, call next - this calls the next
middleware (if any) to continue chain of request processing. Typically, this will
end up with the route handler that uses this middleware being called,
for example GET /secret.
If the user is not logged in, call res.redirect to send them back to the home page
Could also send them to the login or signup pages if you prefer
res.redirect ends the request handling for this request,
so the route handler that uses this middleware (in this example, GET /secret) never runs.
 */

// function isLoggedIn(req, res, next){
	// if (req.isAuthenticated()){
		// return next();
  // }
  // res.redirect('/');
// }

// Get login page
router.get('/login', function(req, res, next){
	res.render('login', {message: req.flash('loginMessage')})
});

// Post login - when clicking login button - what's supposed to happen
router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/planMain',
	failureRedirect: '/login',
	failureFlash: true
}));

// Post login - when clicking login button
// router.post('/login', function(){
	// res.render('enterSpend');
// });

/* GET Logout */
router.get('/logout', function(req, res, next) {
  req.logout();         //passport middleware adds these functions to req.
  res.render('logout');
});

// Verify if user is logged in
// router.post('/saveSecretInfo', isLoggedIn, function(req, res, next){

  //Since we are letting the user update one or none or both, need to
  //check that there is a value to update.

  // var newData = {};

  // if (req.body.favoriteColor != '') {
     // newData.favoriteColor = req.body.favoriteColor;
  // }
  // if (req.body.luckyNumber != '') {
    // newData.luckyNumber = req.body.luckyNumber;
  // }

  //Update our user with the new data.
  // req.user.update(newData, function(err) {
    // if (err) {
      // console.log('error ' + err);
      // req.flash('updateMsg', 'Error updating');
     // }

    // else {
      // console.log('updated');
      // req.flash('updateMsg', 'Updated data');
    // }

    //Redirect back to secret page, which will fetch and show the updated data.
    // res.redirect('/security/secret');

  // });

// });

module.exports = router;
