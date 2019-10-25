const mongoose = require('mongoose')

// creating model for fireflies collection
const fireflySchema = new mongoose.Schema({
	firefly_name: { type:String, required: true },
	child_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Children' },
}); 

const FireFly = new mongoose.model('Fireflies', fireflySchema); 

module.exports = FireFly
