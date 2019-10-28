const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
  email: { type:String, required: true, unique: true },
  password: { type:String, required: true },
	first_name: String,
	last_name: String,
	phone_number: { type:String, pattern: "^([0-9]{3}-[0-9]{3}-[0-9]{4}$" },
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

const Users = new mongoose.model('Users', userSchema); 

module.exports = Users
