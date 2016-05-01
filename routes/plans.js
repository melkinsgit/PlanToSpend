// plan main js
var express = require('express');
var router = express.Router();

var Spend = require('../models/spend.js');
var UserCats = require('../models/userCats.js');
var User = require('../models/user.js');

/* GET listing page. */
router.get('/listing', function(req, res, next) {
	Spend.find( { } ).sort ({'date' : 1 }).exec(function(err, spendDocs){
		if (err) { return next(err); }
		for (var doc in spendDocs){
			if (spendDocs[doc].date == ''){
				spendDocs[doc].date = Date.now();
			}
		}
		return res.render('listing', { spends: spendDocs, error: req.flash('error') });  // returns an array of JSON ojbects type Spend
  });
});

/* GET enterData page */
router.get('/enterData', function (req, res, next) {
	// find the user's categories
	
	console.log('what is in the req.query.pickuser ');
	console.log(req.query.pickuser);
	
	User.findOne({'local.username': username}, function (err, user) {
		if (err) {
          return done(err);    //database error
        }
		
		if(!user){
			console.log('did not get a user from ' + username);
		}

        //Check to see if there is already a user with that username
        if (user) {
          console.log('user with that name exists');
		  for (var cat in local.thisUserCats){
				console.log('in function to set array');
				console.log(local.thisUserCats[cat]);
			}
        }
		var Categories = user.local.thisUserCats;
		// var Categories=["Option1", "Option2", "Option3"];
		res.render('enterData', {categories: Categories});
	});
}); // end of get

router.post('/enterOneLine', function(req, res, next){
	// cast the req.body as a Spend object
	var newSpend = Spend(req.body);
	if (!newSpend.actual){
		newSpend.actual = {};
		newSpend.actual.value = '0';
	}
	// save the complete object
	newSpend.save(function (err, savedSpend) {
		if (err) {
			if (err.name == "ValidationError"){
				req.flash('error', 'Invalid data');
				return res.redirect('/');
			}
			if (err.code == 11000){  // make this work
				req.flash('error', 'An expense for that date and that category with that description already exists.');
				return res.redirect('/');
			}
			return next(err) ;
		}
		res.status (201);
		return res.redirect('/plans/enterData');  // redirects are absolute because each post and get is complete
	} );
});  // end of post

/* GET dataDashboard page */
router.get('/dataDashboard', function (req, res, next) {
	res.render('dataDashboard');
}); // end of post

/* GET enterSpend page */
router.get('/defineSpend', function (req, res, next) {
	res.render('defineSpend');
}); // end of post

module.exports = router;