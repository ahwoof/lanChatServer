

const upload = require('./upload');
let {mongo_user,mongo_msgHistory,mongo_comment,mongo_album,mongo_file,mongo_dynamic} = require("./mongooseDeal");
const USER_SERVER = {
	login: (res,req) => {
		let {phone,pwd} = req.body;
		mongo_user.find({"phone":phone}).then(doc => {
			//		console.log(doc);
			if(doc.length == 0){
				res.json({
					code:1,
					msg:"号码未注册"
				})
				return
			}
			if(doc[0].pwd !== pwd){
				res.json({
					code:1,
					msg:"密码错误"
				})
				return
			}
			// loginUser.push(phone)
			res.json({
					code:0,
					msg:"登录成功",
					username:doc[0].username,
					id:doc[0]._id,
					head:doc[0].head,
					sex:doc[0].sex
				})
		})
	},
	regist: (req,res) =>{
		// console.log(req.body)
		let {username,pwd,phone,sex} = req.body;
		let flag = false
		mongo_user.find({
			"username": username
		}).then(doc => {
			if(doc.length == 0) {
				mongo_user.find({
					"phone": phone
				}).then(doc => {
					if(doc.length == 0) {
						let head = ''
						let u = {
								username,
								pwd,
								phone,
								head,
								sex
						};
						mongo_user.save(u).then((doc) => {
							res.json({
								code: 0,
								msg: "注册成功"
							})
						
						})
					} else {
						res.json({
							code: 1,
							msg: "电话号码已被注册"
						})
					}
				})
			} else {
				res.json({
					code: 1,
					msg: "用户名已存在"
				})
			}
		
		})
	},
	getHistory:(req,res)=> {
		mongo_msgHistory.findAll(req,res).then(doc => {
			console.log(doc)
			res.json({
				code:1,
				hisToryList:doc
			})
		})
	},
	pic:(req,res)=> {
		upload.upload(req,res);
	},
	updateUser:(req,res) => {
		mongo_user.update(req,res).then(doc => {
			res.json({
				code:1,
				msg:doc
			})
		})
	},
	getUserMsg:(req,res) => {
		mongo_user.find({'_id':req.body._id}).then(doc => {
			if(doc.length == 0){
				return
			}
			let {username,birthday,sex,like,intro,head} = doc[0]
			res.json({
				code:1,
				userMsg:{username,birthday,sex,like,intro,head}
			})
		})
	},
	recallMsg:(data) => {
		return mongo_msgHistory.update(data)
	},

	saveAlbum:(req,res) => {
		mongo_album.save(req,res)
	},
	getAlbum:(req,res) => {
			let query = {}
			if(req.body.id){
				query = {
					id:req.body.id
				}
			}
			mongo_album.get(query).then(data => {
				let arr = []
				if(data.length<=0){
					res.json({
						code:1,
						albumList:[]
					})
					return
				}
				let i = 0
				deal(i)
				function deal(i){
					mongo_user.find({'_id':data[i].id}).then(da =>{
						data[i].username = da[0].username
						data[i].head = da[0].head
						if(i+1 != data.length){
							deal(i+1)
							return
						}
						res.json({
							code:1,
							albumList:data,
						})
					})
				}
			})	
	},
	addComment:(req,res) =>{
		mongo_comment.save(req,res)	
	},
	upFile:(req,res) =>{
		
		mongo_file.save(req,res)	
	},
	getFile:(req,res) =>{
		let query = {}
		if(req.body.id){
			query = {
				id:req.body.id
			}
		}
		mongo_file.get(req,res,query) 
	},

	saveDynamic:(req,res) => {
		mongo_dynamic.save(req,res)
	},
	getDynamic:(req,res) => {
			let query = {}
			if(req.body.id){
				query = {
					id:req.body.id
				}
			}
			mongo_dynamic.get(query).then(data => {
				let arr = []
				if(data.length<=0){
					res.json({
						code:1,
						dynamicList:[]
					})
					return
				}
				let i =0
				deal(i)
				function deal(i){
					mongo_comment.get(data[i]._id).then(d => {
						data[i].commentList = []
						data[i].commentList = d
						mongo_user.find({'_id':data[i].id}).then(da =>{
							data[i].username = da[0].username
							data[i].head = da[0].head
							if(i+1 != data.length){
								deal(i+1)
								return
							}
							res.json({
								code:1,
								dynamicList:data,
							})
						})
					})
				}					
			})	
	},
}


module.exports =  USER_SERVER
















//加载职位
// app.get("/load",function(req,res){
//     // console.log(req.query);
    
//      work.find({},function(err,doc){
// //   	console.log(doc);
     	
//          res.json({
//             code:0,
//             list:doc
//          })
//      }).skip(req.query.pageNum * req.query.page).limit(req.query.pageNum-0);
// })
//获取长度
// app.get("/getlen",function(req,res){
// 	work.count({},function(err,count){
// 		if(err){
// 			return	
// 		}
// 		res.json({
//           code:0,
//           "count":count
//         });
		
// 	})
// })

//处理图片上传
// app.post('/upload',function(req,res){
// 	upload.upload(req,res);
// })