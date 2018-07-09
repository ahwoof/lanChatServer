const mongoose = require('../mongooseConfig');

var dynamic =  mongoose.Schema({
    id:String,
    title:String,
    txt:String,
    pciture:Array,
    time:Number,
    head:String,
    username:String,
    commentList:Array
});

module.exports = dynamic;