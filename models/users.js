const mongoose = require('mongoose'); 

const userSchema = mongoose.Schema({
	first_name: { type:String, required: true },
	last_name: { type:String, required: true },
	email: { type:String, required: true },
	phone_number: { type:String, pattern: "^([0-9]{3}-[0-9]{3}-[0-9]{4}$", required: true },
	academic_research: Boolean,
	parent_age: Number,
	marital_status: String,
	relation_to_child: String,
	education: String,
	address: String,
	city: String,
	state: String,
	country: String,
	zip: String
}); 

module.exports = mongoose.model('Users', userSchema); 
