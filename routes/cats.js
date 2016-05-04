// cats js for dealing with category definition by user Plan To Spend

var express = require('express');
var router = express.Router();
var passport = require('passport');

var UserCats = require('../models/userCats.js');
var User = require('../models/user.js');

/* GET the blank form page for entering categories */
router.get('/chooseCats', function (req, res, next) {
	console.log(req.user);
	res.render('enterCategories');  // do I need to send the user to the page
}); // end of get

/* GET show current categories */
router.get('/showCats', function (req, res, next){
	UserCats.find(function(err, userCatDocs){
	if (err) { return next(err); }
	
	console.log('checking out user cats search');
	for (var uCat in userCatDocs){
		console.log(userCatDocs[uCat]);
	}
	
	return res.render('listCats', { userCats: userCatDocs, error: req.flash('error') });  // returns an array of JSON ojbects type UserCats
  });
});

/* POST categories - get all the input, configure for UserCats object and save; then add User cats object to User Object */
router.post('/setCats', function (req, res, next){
	// do I want to send the user info hidden with all the post data?
	
	//for (var att in req.body) {  // remove attributes from the req.body for which values were not enetered before they go to the db and create empty records
		//if (req.body[att] === ''){
			//delete(req.body[att]);
		//}
	//}
	
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
		return res.rendirect('/showCats');
	} );
	

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

module.exports = router;