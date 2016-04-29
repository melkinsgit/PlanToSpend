// cats js for dealing with category definition by user Plan To Spend

var express = require('express');
var router = express.Router();

var UserCats = require('../models/userCats.js');
var UserCats = require('../models/user.js');

/* GET the blank form page for entering categories */
router.get('/chooseCats', function (req, res, next) {
	res.render('enterCategories');  // do I need to send the user to the page
}); // end of get

/* POST categories - get all the input, configure for UserCats object and save */
router.post('/setCats', function (req, res, next){
	// do I want to send the user info hidden with all the post data?
	console.log('working on setting categories');
	console.log(req.body);
});

/* POST new credit card to array that is property of userCats object */
router.post('/addCreditCard',function (req, res, next){
	// do I want to send the user info hidden with all the post data?
	console.log('working adding credit card');
	console.log(req.body)
});

module.exports = router;