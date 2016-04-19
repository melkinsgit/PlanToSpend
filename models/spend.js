// Spend.js defines a spend record in our DB

// require returns module.exports - you require a file.js

// define the data structure
// define data types
// arrays and nested objects
// objectID

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* spending plan db - records date of planned spending, description of same, planned amount and actual amount (when this is entered the spend date may be udpated) */

var spendSchema = new Schema ({
	date: Date,
	description: String,
	budget: Number,
	actual: Number
});  // end Schema

// mongoose.model turns it into a Spend object
var Spend = mongoose.model('Spend', spendSchema);

module.exports = Spend;