const router = require('koa-router')();
const user = require('./user');
const api = require('./api')

// router.get('/', async(ctx) =>{
//     console.log("首页")
//     ctx.body = "<h1>!!!!!</h1>"
// })
router.use('/', user.routes(), user.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
module.exports = router;