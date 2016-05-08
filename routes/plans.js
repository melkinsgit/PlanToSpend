// plan main js
var express = require('express');
var router = express.Router();

var Spend = require('../models/spend.js');
var UserCats = require('../models/userCats.js');
var User = require('../models/user.js');

var netSpend = 0;
var startCash = 1000;


/* GET listing - lists all spending so far with option to delete or update */
router.get('/listing', function(req, res, next) {
	
	var username = req.user.local.username;
	
	Spend.find( { } ).sort ({'date' : 1 }).exec(function(err, spendDocs){
		if (err) { 
			return next(err); 
		}
		// total the spending, get the values for the listing
		spendDocs=getCashFlow(spendDocs);
		// render the listing jade with all the spend records for this user, their starting cash for the year and their net spending for the year
		return res.render('listing', { spends: spendDocs, startCash: '1000', netSpending: netSpend, error: req.flash('error') });
  });
});

/* GET enterData page */
router.get('/enterData', function (req, res, next) {
	
	// get the user name from the request via passport feature
	var username = req.user.local.username;
	
	// find the user's categories
	UserCats.findOne({'catsUser': username}, function (err, foundUserCats) {
		if (err) {
          return next(err);    //database error
        }
		if(!foundUserCats){
			console.log('did not get categories from ' + username);
			// ************* decide what I want to happen here
			//req.flash('error', 'You need to choose categories before you spend.');
			return res.render('planmain', {message : 'You need to choose categories before you spend.'}); 
		}
		// send the array to the enterData render for category drop down
		res.render('enterData');
	}); // end of find
}); // end of get

router.post('/enterOneLine', function(req, res, next){
	// cast the req.body as a Spend object
	var newSpend = Spend(req.body);
	newSpend.spendUser = req.user.local.username;
	var thisUser = req.user;
	
	if (!newSpend.date){
		newSpend.date = Date.now();
	}
	newSpend.cashFlow='0';
	
	// save the complete object
	newSpend.save(function (err, savedSpend) {
		if (err) {
			if (err.name == "ValidationError"){
				req.flash('error', 'Invalid data');
				return res.redirect('/');
			}
			else if (err.code == 11000){  // make this work
				req.flash('error', 'An expense for that date and that category with that description already exists.');
				return res.redirect('/');
			}
			else {
				req.flash('error', 'Invalid data');
				return res.redirect('/plans/enterData');
			}
			return next(err) ;
		}
		res.status (201);
		console.log('the saved object is ' + savedSpend);
		return res.redirect('/plans/enterData');  // redirects are absolute because each post and get is complete
	} );
});  // end of post

/* GET dataDashboard page */
router.get('/dataDashboard', function (req, res, next) {
	var username = req.user.local.username;

	Spend.find({ 'spendUser' : username}, function(err, spendDocs){
		if (err) { return next(err); }
		spendDocs=getCashFlow(spendDocs);
		var moneyToPlayWith = netSpend - startCash;
		return res.render('dataDashboard', {netSpending: netSpend, yearStart: startCash, moneyLeft: moneyToPlayWith});
	});
}); // end of post

/* GET enterSpend page */
router.get('/defineSpend', function (req, res, next) {
	res.redirect('/plans/enterData');
}); // end of post

function getCashFlow(spendDocs){
		var cFlow1 = startCash;
		for(var spend in spendDocs){
			spendDocs[spend].cashFlow.actual = {};
			if(spendDocs[spend].actual.value==0)
			{
				spendDocs[spend].cashFlow.value = cFlow1 + Number(spendDocs[spend].budget.value);
			}
			else
			{
				spendDocs[spend].cashFlow.value = cFlow1 + Number(spendDocs[spend].actual.value);
			}
			cFlow1 = Number(spendDocs[spend].cashFlow.value);
		}
		netSpend = cFlow1;
		return spendDocs
}

module.exports = router;