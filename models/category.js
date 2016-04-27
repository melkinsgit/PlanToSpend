// Category.js defines one record of categories for user in DB

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema ({
	date: Date,
	description: String,
	budget: Number,
	actual: Number,
	category: String
});  // end Schema

// mongoose.model turns it into a Category object
var Category = mongoose.model('Category', categorySchema);

module.exports = Category;