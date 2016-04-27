// plan main js
var express = require('express');
var router = express.Router();

var Spend = require('../models/spend.js');

/* GET listing page. */
router.get('/listing', function(req, res, next) {
  Spend.find(function(err, spendDocs){
	if (err) { return next(err); }
	
	for (var item in spendDocs){
		console.log(item);
		console.log(spendDocs[item].category);
		console.log(spendDocs[item].date);
		console.log(spendDocs[item].description);
		console.log(spendDocs[item].budget.value);
	}
	
	return res.render('listing', { spends: spendDocs, error: req.flash('error') });  // returns an array of JSON ojbects type Spend
  });
});

/* GET enterData page */
router.get('/enterData', function (req, res, next) {
	// find the user's categories
	var Categories=["Option1", "Option2", "Option3"];
	res.render('enterData', {categories: Categories});
}); // end of get

router.post('/enterOneLine', function(req, res, next){
	var newSpend = Spend(req.body);  // cast the req.body as a Spend object
	console.log('first req.body');
	console.log(req.body);
	if (!req.body.actual){
		req.body.actual.value = 0;
	}
	console.log('second req.body');
	console.log(req.body);
	newSpend.save(function (err, savedSpend) {
		if (err) {
			if (err.name == "ValidationError"){
				req.flash('error', 'Invalid data');
				return res.redirect('/');
			}
			if (err.code == 11000){  // make this work
				req.flash('error', 'An expense for that date and that category with that description already exists.');
				return res.redirect('/');
			}
			return next(err) ;
		}
		res.status (201);
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