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
	
	// new elements from the req.body
	var update = {
		date: req.body.newDate,
		payee: req.body.newPayee,
		actual: req.body.newActual,
		description: req.body.newDescription,
		category: req.body.newCategory
		}
	var conditions = {
		date: req.body.date,
		category: req.body.category,
		actual: req.body.actual,
		description:req.body.description,
		payee: req.body.payee
		}
	Spend.findOne({'spendUser': thisUser, 'date': req.body.date, 'payee': req.body.payee}, function (err, thatSpend){
		if (err){
			return next(err);
		}
		else{
			console.log('found that item');
			
			thatSpend.update(conditions, update, function (err, updatedSpend) {
				console.log('in the spend update call');
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
				console.log('updated spend');
				console.log(updatedSpend);
				res.status (201);
				return res.redirect('/plans/listing');  // redirects are absolute because each post and get is complete
			});  // end of save
		}
	}); // end of find
});  // end of post

router.post('/deleteSpend', function (req, res, next){
	console.log('delete entry');
	console.log(req.body);
});

module.exports = router;