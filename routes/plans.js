// plan main js
var express = require('express');
var router = express.Router();

var Spend = require('../models/spend.js');

/* POST enterData page */
router.post('plans/enterData', function (req, res, next) {
	res.render('enterData');
}); // end of post

/* POST dataDashboard page */
router.post('plans/dataDashboard', function (req, res, next) {
	res.render('dataDashboard');
}); // end of post

/* POST enterSpend page */
router.post('plans/enterSpend', function (req, res, next) {
	res.render('enterSpend');
}); // end of post