// Spend.js defines a spend record in DB

// require of this returns module.exports (the Spend object) - require by filename.js

// define the data structure
// define data types
// arrays and nested objects
// objectID

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

/* spending plan db - records date of planned spending, description of same, planned amount and actual amount (when this is entered the spend date may be udpated) */

var spendSchema = new Schema ({
	date: Date,
	description: String,
	budget : {type: SchemaTypes.Double},
	actual : {type: SchemaTypes.Double},
	category: String
});  // end Schema

// mongoose.model turns it into a Spend object
var Spend = mongoose.model('Spend', spendSchema);

module.exports = Spend;