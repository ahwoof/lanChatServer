const mongoose = require('../mongooseConfig');

var Userschema =  mongoose.Schema({
	username:String,
	pwd:String,
	phone:String,
	head:String,
	sex:Number,
	birthday:String,
	intro:String,
	like:Array
});

module.exports = Userschema;
