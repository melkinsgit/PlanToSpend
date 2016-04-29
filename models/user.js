// User.js defines a user record in DB

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');  // enables password encryption
var UserCats = require('./userCats.js');


var userSchema = new Schema ({
	local: {
		username: String,
		password: String
	},
	
	signUpDate : {
		type : Date,
		default: Date.now()
	},
	
	thisUserCats : [UserCats]
});

userSchema.methods.generateHash = function(password){
	// create salted hash of password by hashing plaintext password
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = function(password){
	//Hash entered password, compare with stored hash
	return bcrypt.compareSync(password, this.local.password);
};


// mongoose.model turns it into a Category object
var User = mongoose.model('User', userSchema);

module.exports = User;