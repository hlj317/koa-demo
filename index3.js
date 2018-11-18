const Koa = require('koa');
const router = require('koa-router')();  //注意：引入的方式
const app = new Koa();
const render = require('koa-art-template');
const static = require('koa-static');
const multer = require('koa-multer');
const path = require('path');
 
//以下是配置
var storage = multer.diskStorage({
	//定义文件保存路径
	destination:function(req,file,cb){
	    cb(null,'./public/uploads/');//路径根据具体而定。如果不存在的话会自动创建一个路径
	},                       //注意这里有个，
	//修改文件名
	filename:function(req,file,cb){
	    var fileFormat = (file.originalname).split(".");
    	    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
})
 
var upload = multer({ storage: storage });
 
/*配置模板路径*/
render(app,{
    root:path.join(__dirname,'views'),
    extname:'.html',
    debug:process.env.NODE_ENV !=='production'
});
//配置静态资源中间件
app.use(static(__dirname + '/public'));
 
router.post('/uploads',upload.single('file'), async (ctx, next) => {

  ctx.body = {
    success : true ,
    message : '上传图片成功！',
    filename: ctx.req.file.filename  //返回文件名 
  }
})
 
app.use(router.routes());//启动路由
app.use(router.allowedMethods());
 
app.listen(3003,()=>{
    console.log('starting at port 3003');
});