const router = require('koa-router')();
const db = require('../db/db')
const md5 = require('./util/md5')
const jwt = require('jsonwebtoken')
router.post('user/login', async (ctx) => {
    let prm = md5.md5('hxdz@2018');
    let data = ctx.request.body
    console.log('表单数据为', data)
    let jobnumber = data.jobnumber
    let password = data.password
    console.log('jobnumber', jobnumber, password);
    let user = await db.querySql(`select fd_login_name, fd_password from dbo.sys_org_person where fd_login_name ='${jobnumber}'`, null);
    user = user.recordset[0];
    if (!user) {
        return ctx.body = {
            code: 100,
            msg: "查无此工号"
        }
    }
    if (password != user.fd_password) {
        return ctx.body = {
            code: 100,
            msg: '密码错误'
        }
    }
    const token = jwt.sign({
        name: jobnumber,
    }, prm, { expiresIn: '1h' });

    ctx.body = {
        code: 200,
        msg: '登录成功',
        date: Date.now(),
        token,
    }
})

router.get('user/token', async (ctx) => {
    let { jobnumber, app_id } = ctx.query
     
    let ret = await db.querySql(`select *  from dbo.Employee_Auth where Employee_ID ='${jobnumber}' and Application_ID = '${app_id}'`, null);
    ret = ret.recordset[0];
    if (!ret) {
        return ctx.body = {
            code: 100,
            msg: '无权限访问'
        }
    }
    ctx.body = {
        code: 200,
    }
})
module.exports = router;