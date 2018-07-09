const path = require('path')
var cacheFolder = '../dist/uploadcache';
exports.upload = function(req, res) {
    var fs = require('fs');
    var formidable = require('formidable');
    //var currentUser = req.session.username; // 
    var userDirPath = path.resolve(__dirname, cacheFolder) /*+ currentUser;*/
    if (!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = userDirPath; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 100 * 1024 * 1024; //文件大小参数 100M
    form.type = true;
    var displayUrl;
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(err);
            return;
        }
        // console.log(files.file)
        if(files.file.size > form.maxFieldsSize){
            res.send({
                code: 202,
                msg: '文件过大,请重新上传！'
            });
            return;
        }   
            var name = files.file.name.replace('?','')
                name = name.replace('%','')
                name = name.replace('&','')
            var avatarName = '/' + Date.now() +'@' + name;
            var newPath = form.uploadDir + avatarName;
            displayUrl = '/uploadcache' + avatarName;
            fs.renameSync(files.file.path, newPath); //重命名
            res.json({
                code: 0,
                img: displayUrl,
                name:name
            });
        
    });
};