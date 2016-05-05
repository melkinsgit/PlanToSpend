// cats js for dealing with category definition by user Plan To Spend

var express = require('express');
var router = express.Router();
// var passport = require('passport');

var UserCats = require('../models/userCats.js');
var User = require('../models/user.js');

/* GET the blank form page for entering categories */
router.get('/chooseCats', function (req, res, next) {
	res.render('enterCategories');  // do I need to send the user to the page
}); // end of get

/* GET show current categories */
// router.get('/showCats', function (req, res, next){
	// UserCats.find(function(err, userCatDocs){
	// if (err) { return next(err); }
	
	// console.log('checking out user cats search');
	// for (var uCat in userCatDocs){
		// console.log(userCatDocs[uCat]);
	// }
	
	// return res.render('listCats', { userCats: userCatDocs, error: req.flash('error') });  // returns an array of JSON ojbects type UserCats
  // });
// });

router.get('/showCats', function (req, res, next){
	
	console.log('in show cats and the user should have categories ');
	console.log(req.user);
	var username = req.user.local.username;
	console.log(username);
	
	UserCats.find({ 'catsUser' : username}, function(err, catsDocs){
		if (err) { return next(err); }
	
		// console.log('in show cats just found this user:');
		// console.log(foundUser[0]);
		// console.log('the user cats element is');
		// console.log(foundUser[0].thisUserCats);
		// console.log('the array is ');
		// console.log(catArray);
		// for (var thing in catArray){
			// console.log(catArray[thing]);
		// }
		
		// returns an array of JSON ojbects type UserCats
		// console.log('showing utils array');
		// console.log(catArray.utils + " and " + catArray.utils.length);
		return res.render('listCats', { userCats: catsDocs, error: req.flash('error') });  
  });
});

/* POST categories - get all the input, configure for UserCats object and save; then add User cats object to User Object */
router.post('/setCats', function (req, res, next){

	// read the credit card cat data
	var creditCard = req.body.creditCard1;
	
	// create the array and push the value into it ** there will eventually be more than 1
	req.body.creditCards = [];
	req.body.creditCards.push(creditCard);
	
	// utils
	// read the credit card cat data
	var utility = req.body.utility;
	
	// create the array and push the value into it ** there will eventually be more than 1
	req.body.utils = [];
	req.body.utils.push(utility);
	
	// mine
	// read the my category cat data
	var myCat = req.body.myCat;
	
	// create the array and push the value into it ** there will eventually be more than 1
	req.body.mine = [];
	req.body.mine.push(myCat);
	
	// loans
	// read the credit card cat data
	var loan = req.body.loan;
	
	// create the array and push the value into it ** there will eventually be more than 1
	req.body.loans = [];
	req.body.loans.push(loan);
	
	// savings
	// read the credit card cat data
	var saving = req.body.saving;
	
	// create the array and push the value into it ** there will eventually be more than 1
	req.body.savings = [];
	req.body.savings.push(saving);
	
	var newCatSetting = UserCats(req.body);  // JSON object of the user input data; calling UserCats constructor
	newCatSetting.catsUser = req.user.local.username
	// var currUser = req.user;
	
	newCatSetting.save(function (err, savedCatSetting) {
		console.log('in save function');
		if (err) { 
			if (err.name == "ValidationError"){
				req.flash('error', 'Invalid data');
				return res.redirect('/');
			}
			if (err.code == 11000){
				req.flash('error', 'A spending line item with that name already exists.');
				return res.redirect('/');
			}
			var currUser = local-user.user;
			local.categories = savedCatSetting;
			return next(err) ;
		}
		res.status (201);
		return res.redirect('/cats/showCats');
	});
	
	// req.user.thisUserCats = catsToSave;
	// console.log('user after adding cats');
	// console.log(req.user.thisUserCats);
	
	// var username = req.user.local.username;

	// User.update({ 'local.username' : username}, update, function(err, howMany){
		// if (err) { return next(err); }
		// res.redirect('/cats/showCats');
	// });
	
	// User.find({ 'local.username' : username}, function(err, foundUser){
		// if (err) { return next(err); }
		// console.log('this user cats before and after');
		// console.log(foundUser[0].thisUserCats);
		// foundUser[0].thisUserCats = catsToSave;	
		// console.log(foundUser[0].thisUserCats);
		// res.redirect('/cats/showCats');
	// });
	
	// catsToSave.save(function (err, savedCatSetting) {
		// console.log('in save function');
		// if (err) { 
			// if (err.name == "ValidationError"){
				// req.flash('error', 'Invalid data');
				// return res.redirect('/');
			// }
			// if (err.code == 11000){
				// req.flash('error', 'A spending line item with that name already exists.');
				// return res.redirect('/');
			// }
			// return next(err) ;
		// }
		// var currUser = local-user.user;
		// var thisUser = req.user;
		// console.log('set up cats and saved them in a UserCats object, the user is ');
		// console.log(req.user);
		// req.user.categories = savedCatSetting;
		// res.status (201);
		// return res.redirect('/cats/showCats');
	// } );
	

});
// The Categories model is:
//	housing: String,
//	creditCards: [String],
//	utils: [String],
//	carPayment: String, (don't need any user input - just yes no)
//	carIns: String, (don't need any user input - just yes no)
//	healthIns: String, (don't need any user input - just yes no)
//	mine: [String],
//	loans: [String],
//	savings: [String]

/* POST new credit card to array that is property of userCats object */
router.post('/addCreditCard',function (req, res, next){
	// do I want to send the user info hidden with all the post data?
	console.log('working adding credit card');
	console.log(req.body)
	// remove nulls
});


// low priority
router.post('/updateCats', function(req, res, next){
	
});

module.exports = router;