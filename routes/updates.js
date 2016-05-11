// updates js

var express = require('express');
var router = express.Router();
// var passport = require('passport');

var UserCats = require('../models/userCats.js');
var User = require('../models/user.js');
var Spend = require('../models/spend.js');

var catsArray;

router.get('/updateSpend', function (req, res, next){
	var username = req.user.local.username;
	// find the user's categories by identifying the unique user name in the catsUser collection
	UserCats.findOne({ 'catsUser' : username}, function(err, foundUserCats){
		if (err) { return next(err); }
		if (!foundUserCats){
			return res.render('planmain', {message : 'You need to choose categories before you show categories.'}); 
		}
		else {
		// setup the cats array
		catsArray = [];
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
		}
	Spend.findOne({}, function(){
		
	});
		res.render('/plans/listing', {categories: catsArray, message: ''})
	});
});

router.get('/deleteSpend', function (req, res, next){
	console.log('delete entry');
});


router.post('/updateSpend', function (req, res, next){
	var thisUser = req.user.local.username;
	console.log('the req body for the update is');
	console.log(req.body);
	
	// now save the complete object
	/* Old elements from the req.body:
		input(name='category' value='#{spend.category}' hidden)
		input(name='actual.value' value='#{spend.actual.value}' hidden)
		input(name='description' value='#{spend.description}' hidden)
		input(name='date' value='#{spend.date}' hidden)
		input(name='payee' value='#{spend.payee}' hidden)
	*/
	
	
	// keep the old date if the user doesn't enter a new date
	if (req.body.newDate == ''){
		var today = new Date();
		var newYear = today.getUTCFullYear();
		var newMonth = pad2(today.getUTCMonth() + 1);
		var newDate = today.getUTCDate();
		req.body.newDate = req.body.oldDate;
		// (newMonth + '/' + newDate + '/' + newYear);
	}
	else{
		var datePieces = req.body.newDate.split('-');
		req.body.newDate = (datePieces[1] + '/' + datePieces[2] + '/' + datePieces[0]);
		console.log('there was a date entered');
		console.log('the new spend date is ' + req.body.newDate);
	}
	
	// new elements from the req.body
	var update = {
		date: req.body.newDate,
		payee: req.body.newPayee,
		actual: req.body.newActual,
		description: req.body.newDescription,
		category: req.body.newCategory
		}
		
	Spend.findOneAndUpdate({'_id': req.body.spendId}, update, function (err, updateCount) {
			console.log('in the spend update call');
			if (err){
					req.flash('error', 'Invalid data');
					return next(err);
				}
			console.log('number updated');
			console.log(updateCount);
			res.status (201);
			return res.redirect('/plans/listing');  // redirects are absolute because each post and get is complete
	}); // end of update
});  // end of post

router.post('/deleteSpend', function (req, res, next){
	console.log('delete entry');
	console.log(req.body);
});

function pad2(number) {
   return (number < 10 ? '0' : '') + number
}

module.exports = router;