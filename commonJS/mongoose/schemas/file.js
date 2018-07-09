const mongoose = require('../mongooseConfig');

let file =  mongoose.Schema({
    id:String,
    src:String,
    time:Number,
    filename:String,
    username:String
});

module.exports = file;