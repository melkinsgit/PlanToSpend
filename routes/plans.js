// plan main js
var express = require('express');
var router = express.Router();

var Spend = require('../models/spend.js');
var UserCats = require('../models/userCats.js');
var User = require('../models/user.js');

var netSpend = 0;
var startCash = 1000;

var catsArray = [];
var overSpend = [];


/* GET listing - lists all spending so far with option to delete or update */
router.get('/listing', function(req, res, next) {
	
	var username = req.user.local.username;
	
	Spend.find( {spendUser: username } ).sort ({'date' : 1 }).exec(function(err, foundSpends){
		if (err) { 
			return next(err); 
		}
		if (!foundSpends){
			return res.render('listing', {message: 'You have not entered any spending items yet. You need to spend some before you can see your spending.'});
		}
		else {
			console.log('it thinks there is a foundSpends');
			// total the spending, get the values for the listing
			spendDocs=getCashFlow(foundSpends);
			// render the listing jade with all the spend records for this user, their starting cash for the year and their net spending for the year
			return res.render('listing', { spends: spendDocs, startCash: '1000', netSpending: netSpend, error: req.flash('error') });
		}
  });
});

/* GET listing with options */
router.get('/listingWOptions', function(req, res, next) {
	
	var username = req.user.local.username;
	console.log('username is ' + username);
	
	Spend.find( { } ).sort ({'date' : 1 }).exec(function(err, spendDocs){
		if (err) { 
			return next(err); 
		}
		
		UserCats.findOne({'catsUser': username}, function (err, foundUserCats) {
			if (err) {
			  return next(err);    //database error
			}
			if(!foundUserCats){
				console.log('did not get categories from ' + username);
				return res.render('planmain', {message : 'You need to choose categories before you spend.'}); 
			}
			else {
			// total the spending, get the values for the listing
			spendDocs=getCashFlow(spendDocs);	
			
			// set the cats array
			catsArray.push(foundUserCats.housing);
			catsArray.push(foundUserCats.income1);
			catsArray.push(foundUserCats.income2);
			catsArray.push(foundUserCats.income3);
			catsArray.push(foundUserCats.income4);
			catsArray.push(foundUserCats.income5);
			catsArray.push(foundUserCats.util1);
			catsArray.push(foundUserCats.util2);
			catsArray.push(foundUserCats.util3);
			catsArray.push(foundUserCats.util4);
			catsArray.push(foundUserCats.cell1);
			catsArray.push(foundUserCats.cell2);
			catsArray.push(foundUserCats.carPayment1);
			catsArray.push(foundUserCats.carPayment2);
			catsArray.push(foundUserCats.carIns1);
			catsArray.push(foundUserCats.carIns2);
			catsArray.push(foundUserCats.carIns3);
			catsArray.push(foundUserCats.healthIns);
			catsArray.push(foundUserCats.medical1);
			catsArray.push(foundUserCats.medical2);
			catsArray.push(foundUserCats.dental);
			catsArray.push(foundUserCats.creditCard1);
			catsArray.push(foundUserCats.creditCard2);
			catsArray.push(foundUserCats.creditCard3);
			catsArray.push(foundUserCats.creditCard4);
			catsArray.push(foundUserCats.loan1);
			catsArray.push(foundUserCats.loan2);
			catsArray.push(foundUserCats.loan3);
			catsArray.push(foundUserCats.loan4);
			catsArray.push(foundUserCats.saving1);
			catsArray.push(foundUserCats.saving2);
			catsArray.push(foundUserCats.saving3);
			catsArray.push(foundUserCats.saving4);
			catsArray.push(foundUserCats.saving5);
			catsArray.push(foundUserCats.mine1);
			catsArray.push(foundUserCats.mine2);
			catsArray.push(foundUserCats.mine3);
			catsArray.push(foundUserCats.mine4);
			catsArray.push(foundUserCats.mine5);
			catsArray.push(foundUserCats.tax1);
			catsArray.push(foundUserCats.tax2);
			// render the listing jade with all the spend records for this user, their starting cash for the year and their net spending for the year
			console.log('should be about to render');
			return res.render('listingWOptions', { spends: spendDocs, startCash: '1000', netSpending: netSpend, error: req.flash('error') , categories: catsArray});
		}
		});
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
			return res.render('planmain', {message : 'You need to choose categories before you spend.'}); 
		}
		else {
			catsArray.push(foundUserCats.housing);
			catsArray.push(foundUserCats.income1);
			catsArray.push(foundUserCats.income2);
			catsArray.push(foundUserCats.income3);
			catsArray.push(foundUserCats.income4);
			catsArray.push(foundUserCats.income5);
			catsArray.push(foundUserCats.util1);
			catsArray.push(foundUserCats.util2);
			catsArray.push(foundUserCats.util3);
			catsArray.push(foundUserCats.util4);
			catsArray.push(foundUserCats.cell1);
			catsArray.push(foundUserCats.cell2);
			catsArray.push(foundUserCats.carPayment1);
			catsArray.push(foundUserCats.carPayment2);
			catsArray.push(foundUserCats.carIns1);
			catsArray.push(foundUserCats.carIns2);
			catsArray.push(foundUserCats.carIns3);
			catsArray.push(foundUserCats.healthIns);
			catsArray.push(foundUserCats.medical1);
			catsArray.push(foundUserCats.medical2);
			catsArray.push(foundUserCats.dental);
			catsArray.push(foundUserCats.creditCard1);
			catsArray.push(foundUserCats.creditCard2);
			catsArray.push(foundUserCats.creditCard3);
			catsArray.push(foundUserCats.creditCard4);
			catsArray.push(foundUserCats.loan1);
			catsArray.push(foundUserCats.loan2);
			catsArray.push(foundUserCats.loan3);
			catsArray.push(foundUserCats.loan4);
			catsArray.push(foundUserCats.saving1);
			catsArray.push(foundUserCats.saving2);
			catsArray.push(foundUserCats.saving3);
			catsArray.push(foundUserCats.saving4);
			catsArray.push(foundUserCats.saving5);
			catsArray.push(foundUserCats.mine1);
			catsArray.push(foundUserCats.mine2);
			catsArray.push(foundUserCats.mine3);
			catsArray.push(foundUserCats.mine4);
			catsArray.push(foundUserCats.mine5);
			catsArray.push(foundUserCats.tax1);
			catsArray.push(foundUserCats.tax2);
			
			return res.render('enterData', { categories: catsArray, message: '' });  
		}
		// send the array to the enterData render for category drop down
		
	// show the enter data page with categories and no message
	// res.render('enterData', {message: '', categories: catsArray});
	}); // end of find
}); // end of get

router.post('/enterOneLine', function(req, res, next){
	// create a new Spend object - this will have some default values
	var newSpend = Spend();
	// add the current user to the Spend
	var thisUser = req.user.local.username
	newSpend.spendUser = thisUser;
	console.log(newSpend);
	
	console.log('getting null budget value' + req.body.budget + ' that is what we see');
	
	// make sure budget value input is legal
	if (req.body.budget == NaN || !isFinite(req.body.budget) || req.body.budget == ""){
		return res.render('enterData', {message: 'Your entry for budget is not valid. Please enter a dollar amount.', categories: catsArray});
	}
	
	// create a new item for budget.value in the new Spend object and set it equal to the user entered budget value
	newSpend.budget = {};
	newSpend.budget.value = req.body.budget;
	
	// set values in the new Spend object that are not set by defaults, set the new Spend fields to whatever the user entered
	newSpend.category = req.body.category;
	newSpend.payee = req.body.payee;
	newSpend.description = req.body.description;
	console.log('we should have an actual ' + newSpend.actual.value);
	// if the user entered a date, put the user date in the new Spend object; otherwise, the new Spend object has the default date which is OK
	// the date is parsed to remove time information so that date strings in model can be matched later - this match is used to confirm whether the user is attempting to enter a duplicate spend where the date and payee are identical
	if (req.body.date == ''){
		var today = new Date();
		var newYear = today.getUTCFullYear();
		var newMonth = today.getUTCMonth() + 1;
		var newDate = today.getUTCDate();
		newSpend.date = (newMonth + '/' + newDate + '/' + newYear);
		console.log(newSpend.date);
	}
	else{
		var datePieces = req.body.date.split('/');
		newSpend.date = (datePieces[1] + '/' + datePieces[2] + '/' + datePieces[0]);
		console.log('there was a date entered');
		console.log('the new spend date is ' + newSpend.date);
	}
	// first make sure a spend with the same user, date and payee doesn't already exist
	Spend.findOne({'spendUser': thisUser, 'date': newSpend.date, 'payee': newSpend.payee}, function (err, thatSpend){
		if (err){
			return next(err);
		}
		if (thatSpend){
			console.log('that spend exists');
			return res.render('enterData', {message: 'You already have a payment for that payee on that date. You can only have one such payment. You can pick another date, or update your payment in Show Me My Spending.', categories: catsArray});
		}
		else{
			console.log('that spend does not exist');
			// now save the complete object
			newSpend.save(function (err, savedSpend) {
				console.log('in the spend save call');
				if (err) {
					if (err.name == "ValidationError"){
						req.flash('error', 'Invalid data');
						return res.redirect('/');
					}
					else if (err.code == 11000){
						req.flash('error', 'An expense for that date and that category with that description already exists.');
						return res.redirect('/');
					}
					else {
						req.flash('error', 'Invalid data');
						return res.redirect('/plans/enterData');
					}
					// return next(err) ;
				}
				res.status (201);
				return res.redirect('/plans/enterData');  // redirects are absolute because each post and get is complete
			});  // end of save
		}
	});
});  // end of post

/* GET dataDashboard page */
router.get('/dataDashboard', function (req, res, next) {
	var username = req.user.local.username;

	Spend.find({ 'spendUser' : username}, function(err, spendDocs){
		if (err) { return next(err); }
		spendDocs=getCashFlow(spendDocs);
		for (var overage in overSpend){
			console.log('overage after fn call');
			console.log(overSpend[overage]);
		}
		var moneyToPlayWith = netSpend - startCash;
		return res.render('dataDashboard', {netSpending: netSpend, yearStart: startCash, moneyLeft: moneyToPlayWith, youWentOver : overSpend});
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
		var inTheRed = false;
		
		overSpend = [];
		for(var spend in spendDocs){
			if (spendDocs[spend].cashFlow.value < 0 && inTheRed == false){
				overSpend.push('Cash flow in the red ' + spendDocs[spend].date);
				inTheRed = true;
			}
			if (spendDocs[spend].cashFlow.value > 0){
				inTheRed = false;
			}
		}
		return spendDocs
}

module.exports = router;