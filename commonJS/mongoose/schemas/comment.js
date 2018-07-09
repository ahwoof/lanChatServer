const mongoose = require('../mongooseConfig');

var comment =  mongoose.Schema({
    id:String,
    txt:String,
    time:Number,
    userId:String,
    username:String,
    head:String
});

module.exports = comment;