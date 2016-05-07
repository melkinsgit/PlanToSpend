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

router.get('/showCats', function (req, res, next){
	
	var username = req.user.local.username;
	
	// find the user's categories by identifying the unique user name in the catsUser collection
	UserCats.find({ 'catsUser' : username}, function(err, catsDocs){
		if (err) { return next(err); }
		console.log('trying to show cats');
		console.log(JSON.stringify(catsDocs));
		JSONcatsDocs = JSON.stringify(catsDocs);

		return res.render('listCats', { userCats: catsDocs, error: req.flash('error') });  
  });
});

/* POST categories - get all the input, configure for UserCats object and save; then add User cats object to User Object */
router.post('/setCats', function (req, res, next){
	
	var newCatSetting = UserCats(req.body);  // JSON object of the user input data; calling UserCats constructor
	newCatSetting.catsUser = req.user.local.username
	
	newCatSetting.save(function (err, savedCatSetting) {
		console.log('in save function');
		if (err) { 
			if (err.name == "ValidationError"){
				req.flash('error', 'Invalid data');
				return res.redirect('/');
			}
			// Erro Message not right ********************************
			if (err.code == 11000){
				req.flash('error', 'A spending line item with that name already exists.');
				return res.redirect('/');
			}
			return next(err) ;
		}
		res.status (201);
		return res.redirect('/cats/showCats');
	});
	

});
// The Categories model is:
//	id:
//	catsUser:
//	__v:
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