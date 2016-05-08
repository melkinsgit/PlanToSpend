// Category.js defines one record of categories for user in DB

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userCatsSchema = new Schema ({
	catsUser: String,
	housing: String,
	creditCard1: String,
	creditCard2: String,
	creditCard3: String,
	creditCard4: String,
	util1: String,
	util2: String,
	util3: String,
	util4: String,
	carPayment1: String,
	carPayment2: String,
	carPayment2: String,
	carIns1: String,
	carIns2: String,
	carIns3: String,
	healthIns: String,
	medical1: String,
	medical2: String,
	dental: String,
	mine1: String,
	mine2: String,
	mine3: String,
	mine4: String,
	mine5: String,
	loan1: String,
	loan2: String,
	loan3: String,
	loan4: String,
	saving1: String,
	saving2: String,
	saving3: String,
	saving4: String,
	saving5: String,
	income1: String,
	income2: String,
	income3: String,
	income4: String,
	income5: String,
	cell1: String,
	cell2: String,
	taxPayment: String
});  // end Schema

// mongoose.model turns it into a Category object
var UserCats = mongoose.model('UserCats', userCatsSchema);

module.exports = UserCats;