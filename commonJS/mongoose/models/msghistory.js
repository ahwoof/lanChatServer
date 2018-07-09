const mongoose = require('../mongooseConfig');

const msgHistory = require("../schemas/msghistory");

//model封装数据库操作函数
const msgHistoryModel = mongoose.model('msghistory',msgHistory); //创建model的时候
module.exports  = msgHistoryModel;