const mongoose = require('mongoose')

// creating model for fireflies collection
const fireflySchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId, 
	firefly_name: String,
	child_id: { type: Schema.Types.ObjectId, ref: 'Children' },
}); 

module.exports = mongoose.model('Fireflies', fireflySchema); 
