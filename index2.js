const Koa = require('koa');
const app = new Koa();
const route = require('koa-route');
const path = require('path');
const server = require('koa-static');

// 1.主页静态网页，把静态页统一放到public中管理
const home = server(path.join(__dirname)+'/public/');

// 2.hello接口
const main = ctx => {
   //ctx.response.body = 'Hello World';
}

// 3.分配路由
app.use(home);
app.use(route.get('/',main));
app.listen(3001);
