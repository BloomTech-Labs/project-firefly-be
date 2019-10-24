const mongoose = require('mongoose'); 

const userSchema = mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	phone_number: String,
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
