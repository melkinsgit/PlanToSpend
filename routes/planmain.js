
var express = require('express');
var router = express.Router();




/* GET signup page - can't get message anymore */
router.get('/planMain', function (req, res, next) {
	res.render('planMain', {message: req.flash('signupMessage')})
});

/* POST planMain page */
router.post('/planMain', function (req, res, next) {
	res.render('login');
	// res.render('planMain');
}); // end of post

/* POST see current plan */
router.post('/seePlan', function (req, res, next){
	Spend.find(function(err, spendDocs){
	if (err) { return next(err); }
	return res.render('index', { spends: spendDocs, error: req.flash('error') });  // returns an array of JSON ojbects type Spend called spends; planItems.jade deals with spends, displaying them etc.
  });
}); // end of post

/* GET seePlan */
router.get('/seePlan', function (req, res, next){
	res.render('seePlan');
});


module.exports = router;
