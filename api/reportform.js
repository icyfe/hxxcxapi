const router = require('koa-router')();
const db = require('../db/db')

//表一 对应接单发货投料入库表
router.get('/get/reportform/formone', async (ctx) => {
    let { startdate, enddate } = ctx.query;
    console.log(startdate, enddate)
    let result = await db.querySql(`GetResult '${startdate}', '${enddate}'`, null);
    result = result.recordset;
    if (!result) {
        return ctx.body = {
            code: 100,
            msg: '查无数据'
        }
    }
    ctx.body = {
        code: 200,
        result
    }
})
//销售报表每日下单统计
router.get('/get/reportform/saleform/daytotal', async (ctx) => {
    let { year, month } = ctx.query;
    let formhead = await db.querySql(`Sales_GetSummaryByYearMonthNewThree '${year}', '${month}'`, null);
    let formbody = await db.querySql(`SaleDaylyOrdersStatistic '${year}', '${month}'`, null);
    formhead = formhead.recordset[0];
    formbody = formbody.recordset;
    console.log(year, month)
    let monthtotal = formbody.splice(formbody.length - 2, 1)[0];
    let yeartotal = formbody.splice(formbody.length - 1, 1)[0];
    if (!formhead || !formbody) {
        return ctx.throw(400, 'No-data')
    }
    ctx.body = {
        code: 200,
        result: { formhead, formbody, monthtotal, yeartotal }
    }
})
//销售报表每日发货统计
router.get('/get/reportform/saleform/daydelivergoodstotal', async (ctx) => {
    let { year, month } = ctx.query;
    let formhead = await db.querySql(`Sales_GetSummaryByYearMonthNewThree '${year}', '${month}'`, null);
    let formbody = await db.querySql(`SaleDaylyShipmentsStatistic '${year}', '${month}'`, null);
    formhead = formhead.recordset[0];
    formbody = formbody.recordset;
    let monthtotal = formbody.splice(formbody.length - 2, 1)[0];
    let yeartotal = formbody.splice(formbody.length - 1, 1)[0];
    if (!formhead || !formbody) {
        return ctx.throw(400, 'No-data')
    }
    ctx.body = {
        code: 200,
        result: { formhead, formbody ,monthtotal,yeartotal}
    }
})
module.exports = router