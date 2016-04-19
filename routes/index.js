var express = require('express');
var router = express.Router();

var Spend = require('../models/spend.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Plan To Spend' });
});  // end get

/* POST planMain page */
router.post('/planMain', function (req, res, next) {
	res.render('planMain');
}); // end of post

/* POST see current plan */
router.post('/seePlan', function (req, res, next){
	Spend.find(function(err, spendDocs){
	if (err) { return next(err); }
	return res.render('index', { spends: spendDocs, error: req.flash('error') });  // returns an array of JSON ojbects type Spend called spends; planItems.jade deals with spends, displaying them etc.
  });
	
}); // end of post

module.exports = router;
