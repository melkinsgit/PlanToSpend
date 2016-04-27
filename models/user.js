// User.js defines a user record in DB

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');  // enables password encryption

var userSchema = new Schema ({
	_userid : {
		type: Number,
		ref: 'UserCats'},
	local: {
		username: String,
		password: String
	},
	
	signUpDate : {
		type : Date,
		default: Date.now()
	},
	userCats : [{ type: Number, ref: 'UserCats' }]
});

userSchema.methods.generateHash = function(password){
	// create salted hash of password by hashing plaintext password
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = function(password){
	//Hash entered password, compare with stored hash
	return bcrypt.compareSync(password, this.local.password);
};

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
// mongoose.model turns it into a Category object
var User = mongoose.model('User', userSchema);

module.exports = User;
module.exports = UserCats;