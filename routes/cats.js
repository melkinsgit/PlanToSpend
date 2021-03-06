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
	UserCats.findOne({ 'catsUser' : username}, function(err, foundUserCats){
		if (err) { return next(err); }
		if (!foundUserCats){
			return res.render('planmain', {message : 'You need to choose categories before you show categories.'}); 
		}
		else {
			var catsArray = [];
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
			
			return res.render('listCats', { userCats: catsArray, error: req.flash('error') });  
		}
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
		console.log('saved usercats');
		console.log(savedCatSetting);
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

function json2array(json){
    var result = [];
    var keys1 = Object.keys(json);
    keys1.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}

module.exports = router;