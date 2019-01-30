/***
 * create by 2018/12/22
 * author cc
 */
const koa = require('koa2');
const http = require('http');
const https = require('https');
const bodyParser = require("koa-bodyparser");
const router = require('./api/index')
const koajwt = require('koa-jwt');
const md5 = require('./api/util/md5')
const prm = md5.md5('hxdz@2018');
const fs = require('fs')
const sslify = require('koa-sslify').default;
const app = new koa();
// app.use(sslify());

//tokne验证出错返回异常
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = ' token权鉴校验失败！\n';
        } else {
            throw err;
        }
    })
})

// app.use(koajwt({
//     secret:prm,
// }).unless({path:[/\/user/]}))

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

// const options = {
//     key: fs.readFileSync('./ssl/2_www.fpcchina.com.key'),  //ssl文件路径
//     cert: fs.readFileSync('./ssl/1_www.fpcchina.com_bundle.crt')  //ssl文件路径
// };

// start the server
// http.createServer(app.callback()).listen(3301);
// console.log('https server is running 3301');
// https.createServer(options, app.callback()).listen(3302);
app.listen(3302);
//
console.log('https server is running 3302');
