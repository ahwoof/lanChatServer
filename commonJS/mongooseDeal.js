const user = require("./mongoose/models/user");
const msghistory = require("./mongoose/models/msgHistory");
const album = require("./mongoose/models/album");
const dynamic = require("./mongoose/models/dynamic");
const comment = require("./mongoose/models/comment");
const file = require("./mongoose/models/file");

let mongo_msgHistory = {
    save:data => {
        let p = new Promise((resolve,reject) => {
            new msghistory(data).save((err,doc) => {
                resolve(doc)
            })
        })
        return p
    },
    findAll:(req,res) => {
        let {pageNum,page} = req.body
        let p = new Promise((resolve,reject) => {
            msghistory.find({},(err,doc) => {
                console.log(doc)
                resolve(doc)
            }).sort({_id: -1}).skip(pageNum * page).limit(pageNum-0);
        })
        return p
    },
    update:(data) => {
        let {_id} = data
        let p = new Promise((resolve,reject) => {
            msghistory.update({'_id':_id},{isdel:true},{multi: true},function(errs,docs){
                resolve(docs)
            })
        })
        return p
    }
    
}

let mongo_user = {
    save:data => {
        let p = new Promise((resolve,reject) => {
            new user(data).save((err,doc) => {
                if(err){
                    reject(err)
                }
                resolve(doc)
            })
        })
        return p
    },
    find:data => {
        // console.log(data)
        let p = new Promise((resolve,reject) => {
            user.find(data,(err,doc) => {
                // console.log(doc)
                if(err){
                    reject(err)
                }
                resolve(doc)
            })
        })
        return p
    },
    update:(req,res) => {
        let {id,username,birthday,sex,like,intro,head} = req.body
        let p = new Promise((resolve,reject) => {
            msghistory.update({"id":id},{name:username,head:head},{multi: true},function(errs,docs){
                comment.update({"userId":id},{name:username,head:head},{multi: true},function(err,doc){
                    user.update({"_id":id}, {username : username, birthday:birthday, sex :sex, like:like,intro: intro,head:head},{multi: true},(err,doc) => {
                        resolve(doc)
                    });
                })
            })
        })
        return p
    }
}



let mongo_album = {
    save:(req,res) => {
            console.log(req.body)
            new album(req.body).save((err,doc) => {
                if(err){
                    res.json({
                        code:0,
                        msg:'发表失败'
                    })
                    return
                }
                res.json({
                    code:1,
                    msg:doc
                })
            })
    },
    get:(query) => {
        return album.find(query,(err,doc) => {
            }).sort({_id: -1})    
    }
}
let mongo_comment = {
    get:id =>{
        return  comment.find({'id':id},(err,doc) => {
            })
        
    },
    save:(req,res) => {
            new comment(req.body).save((err,doc) => {
                if(err){
                    res.json({
                        code:0,
                        msg:'评论失败'
                    })
                    return
                }
                res.json({
                    code:1,
                    msg:doc
                })
            })
    }
}
let mongo_file = {
    save:(req,res) => {
        let {id,fileList,time,username} = req.body
        new Promise((resolve,reject) => {
            for(let i=0;i<fileList.length;i++){
                new file({id:id,time:time,src:fileList[i].src,filename:fileList[i].name,username:username}).save((err,doc) =>{
                    if(i+1 == fileList.length){
                        resolve()
                    }
                })
            }
        }).then(() => {
            res.json({
                code:1,
                msg:'上传成功！'
            })
        })
        
    },
    get:(req,res,query) => {
        file.find(query,(err,doc) => {
            if(err){
                res.json({
                    code:0,
                    msg:'获取文件列表失败'
                })
                return
            }
            res.json({
                code:0,
                msg:doc
            })
        }).sort({_id: -1})
    }
}

let mongo_dynamic = {
    save:(req,res) => {
        req.body.username = 'xxx'
        req.body.head = 'xxx'
        req.body.commentList = []
        new dynamic(req.body).save((err,doc) => {
            if(err){
                res.json({
                    code:0,
                    msg:'发表失败'
                })
                return
            }
            res.json({
                code:1,
                msg:doc
            })
        })
},
get:(query) => {
    return dynamic.find(query,(err,doc) => {
            }).sort({_id: -1})    
    }
}
module.exports = {mongo_msgHistory,mongo_user,mongo_album,mongo_comment,mongo_file,mongo_dynamic};


