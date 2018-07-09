const mongoose = require('../mongooseConfig');
const file = require("../schemas/file");
//model封装数据库操作函数
const Files = mongoose.model('file',file); //创建model的时候


    

module.exports  = Files;