// import { resolve } from 'path';

const app = require('./commonJS/serverConfig')
const USER_SERVER = require('./commonJS/userServer')
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let {mongo_msgHistory} = require('./commonJS/mongooseDeal')

let socketUser = []
let remeberId = ''
app.listen(8889, function() {
	console.log("server listen 8889")
})
server.listen(8888, function() {
	console.log("socket listen 8888")
})

//处理用户登录
app.post("/login",(req,res) => {
	USER_SERVER.login(res,req)
});
//处理用户注册
app.post("/regist",(req,res) => {
	USER_SERVER.regist(req,res)
});
//返回房间当前用户
app.post("/getSocketUser",(req,res) => {
	res.json({
		code: 1,
		msg: socketUser
	})
});
//处理文件上传
app.post('/upload',function(req,res){
	USER_SERVER.pic(req,res);
})

//获取历史消息
app.post("/getHistory",(req,res) => {
	USER_SERVER.getHistory(req,res)
})
//撤回消息
app.post("/recallMsg",(req,res) => {
	USER_SERVER.recallMsg(req,res)
})
//获取用户资料
app.post("/getUserMsg",(req,res) => {
	USER_SERVER.getUserMsg(req,res)
})
app.post('/updateUser',(req,res) => {
	USER_SERVER.updateUser(req,res)
})

//上传照片
app.post("/upAlbum",(req,res) => {
	USER_SERVER.saveAlbum(req,res)
})
//获取照片
app.post("/getAlbum",(req,res) => {
	USER_SERVER.getAlbum(req,res)
})

//发表动态
app.post("/upDynamic",(req,res) => {
	USER_SERVER.saveDynamic(req,res)
})
//获取动态
app.post("/getDynamic",(req,res) => {
	USER_SERVER.getDynamic(req,res)
})
//上传文件
app.post("/upFile",(req,res) => {
	USER_SERVER.upFile(req,res)
})
//获取文件列表
app.post("/getFile",(req,res) => {
	USER_SERVER.getFile(req,res)
})
//添加评论
app.post("/addComment",(req,res) => {
	USER_SERVER.addComment(req,res)
})

io.on('connection', socket =>{
	socket.on('into',data => {
				let res = {
					type:0,
					msg:data
				}
				if(remeberId != data.id){
					io.emit('notice',res)
				}
				data.socketId = socket.id
				socketUser.push(data)
				io.emit('userList',socketUser);
	})
	socket.on('disconnect', function () {
		let index = socketUser.obj_in_array(socket.id,'socketId')
		if(index == -1){
			remeberId = ''
			return
		}
		remeberId = socketUser[index].id
		socketUser.splice(index,1)
		setTimeout(function(){
			if(socketUser.obj_in_array(remeberId,'id') == -1){
				io.emit('notice',{
					type:1,
					msg:remeberId
				})
			}
			remeberId = ''
		},1000)
	});
	socket.on('diliverMessage',function(data){
			mongo_msgHistory.save(data).then(res => {
				io.emit('message',res)
			})
	})
	socket.on('recall',function(data){
		USER_SERVER.recallMsg(data).then(doc => {
			io.emit('recallMsg',data.index)
		})
	})
})

Array.prototype.obj_in_array = function(val,testVal){ 
			for (var i = 0; i < this.length; i++) { 
				　　if (this[i][testVal] == val) { 
				　　	return i; 
					} 
			} 
			return -1
} 




















Array.prototype.in_array = function (element) {  
	　　for (var i = 0; i < this.length; i++) {  
		　　if (this[i] == element) {  
		　　		return true;  
				}  
		}  
		return false;
	}  