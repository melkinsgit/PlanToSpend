// Category.js defines one record of categories for user in DB

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userCatsSchema = new Schema ({
	housing: String,
	creditCards: [String],
	utils: [String],
	auto: String,
	carIns: String,
	mine: [String],
	loans: [String],
	savings: [String]
});  // end Schema

// mongoose.model turns it into a Category object
var UserCats = mongoose.model('UserCats', userCatsSchema);

module.exports = UserCats;