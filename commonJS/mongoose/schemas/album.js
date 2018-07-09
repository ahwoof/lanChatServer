const mongoose = require('../mongooseConfig');

var album =  mongoose.Schema({
    id:String,
    head:String,
    username:String,
    pciture:Array,
    time:Number,
    title:String
});

module.exports = album;