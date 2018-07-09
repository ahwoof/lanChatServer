const mongoose = require('../mongooseConfig');
const album = require("../schemas/album");
//model封装数据库操作函数
const Album = mongoose.model('album',album); //创建model的时候


    

module.exports  = Album;