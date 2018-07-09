const mongoose = require('../mongooseConfig');
const UserSchema = require("../schemas/user");
//model封装数据库操作函数
const User = mongoose.model('users',UserSchema); //创建model的时候


    

module.exports  = User;