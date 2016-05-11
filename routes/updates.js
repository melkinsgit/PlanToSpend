// updates js

var express = require('express');
var router = express.Router();
// var passport = require('passport');

var UserCats = require('../models/userCats.js');
var User = require('../models/user.js');
var Spend = require('../models/spend.js');

var catsArray;

router.post('/updateSpend', function (req, res, next){
	var thisUser = req.user.local.username;
	
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
	var thisUser = req.user.local.username;

	// find the spend by id
	Spend.findOne({'_id': req.body.spendId}, function (err, foundSpend) {
			console.log('in the spend update call');
			if (err){
					req.flash('error', 'Invalid data');
					return next(err);
				}
			// remove the spend
			foundSpend.remove({}, function(err, removedSpend){
				if (err){
					return next (err);
				}
				res.status (201);
				return res.redirect('/plans/listing');  // redirects are absolute because each post and get is complete
			}); // end of remove
			
	}); // end of find
});  // end of post

function pad2(number) {
   return (number < 10 ? '0' : '') + number
}

module.exports = router;