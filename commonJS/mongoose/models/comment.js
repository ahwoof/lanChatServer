const mongoose = require('../mongooseConfig');
const comment = require("../schemas/comment");
//model封装数据库操作函数
const Comments = mongoose.model('comment',comment); //创建model的时候


    

module.exports  = Comments;