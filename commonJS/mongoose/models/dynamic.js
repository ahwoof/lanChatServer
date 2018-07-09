const mongoose = require('../mongooseConfig');
const dynamic = require("../schemas/dynamic");
//model封装数据库操作函数
const Dynamic = mongoose.model('dynamic',dynamic); //创建model的时候


    

module.exports  = Dynamic;