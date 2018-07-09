const mongoose = require('../mongooseConfig');

var msghistoryschema =  mongoose.Schema({
		id:String,
		type:Number,
		name:String,
		head:String,
		time:Number,
		txt:String,
		anonymity:Boolean,
		isdel:Boolean,
});

module.exports = msghistoryschema;