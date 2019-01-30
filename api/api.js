const router = require('koa-router')();
const reportform = require('./reportform')

 
router.use(reportform.routes(), reportform.allowedMethods());
module.exports = router;