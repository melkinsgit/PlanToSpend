// plan main js
var express = require('express');
var router = express.Router();

var Spend = require('../models/spend.js');
var UserCats = require('../models/userCats.js');
var User = require('../models/user.js');

/* GET listing page. */
router.get('/listing', function(req, res, next) {
	
	var username = req.user.local.username;
	
	Spend.find( { } ).sort ({'date' : 1 }).exec(function(err, spendDocs){
		if (err) { 
			return next(err); 
		}
		var cFlow1 = 1000;
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
		return res.render('listing', { spends: spendDocs, startCash: '1000', error: req.flash('error') });  // returns an array of JSON ojbects type Spend
  });
});

/* GET enterData page */
router.get('/enterData', function (req, res, next) {
	
	// find the user's categories
	
	var username = req.user.local.username;
	console.log('should be NAME user is ************************');
	console.log(username);
	
	
	// var Categories=["Option1", "Option2", "Option3"];
		// res.render('enterData', {categories: Categories});
	
	UserCats.findOne({'catsUser': username}, function (err, foundUserCats) {
		if (err) {
          return next(err);    //database error
        }
		if(!foundUserCats){
			console.log('did not get a user from ' + username);
		}
        // Check to see if there is already a user with that username
        if (foundUserCats) {
          console.log('user with that name exists');
        }
		// var Categories = user.local.thisUserCats;
		// var Categories=["Option1", "Option2", "Option3"];
		var catsToList = JSON.parse(foundUserCats);
		
		for (var cat in catsToList){
			console.log('exploring array from found user cats');
			console.log(catsToList[cat]);
			//catsToList.push(foundUserCats[cat]);
		}
		
		console.log("trying to id the found user cats");
		console.log(catsToList);
		res.render('enterData', {categories: catsToList});
	});
}); // end of get

router.post('/enterOneLine', function(req, res, next){
	// cast the req.body as a Spend object
	var newSpend = Spend(req.body);
	newSpend.spendUser = req.user.local.username;
	var thisUser = req.user;
	
	// these could also be default 0 in the model
	if (!newSpend.actual){
		newSpend.actual = {};
		newSpend.actual.value = '0';
	}
	if (!newSpend.budget){
		newSpend.budget = {};
		newSpend.budget.value = '0';
	}
	if (!newSpend.date){
		newSpend.date = Date.now();
		console.log('the date for doc is ' + newSpend.date);
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
	res.render('dataDashboard');
}); // end of post

/* GET enterSpend page */
router.get('/defineSpend', function (req, res, next) {
	res.render('defineSpend');
}); // end of post

module.exports = router;