const router = require('koa-router')();
const db = require('../db/db')

//表一 对应接单发货投料入库表
router.get('/get/reportform/formone', async (ctx) => {
    let { startdate, enddate } = ctx.query;
    console.log(startdate, enddate)
    let result = await db.querySql(`GetResult '${startdate}', '${enddate}'`, null);
    list = result.recordset;
    let chartdata = []
    list = list.slice(0, list.length - 1)
    for (let index in list) {
        chartdata.push({
            year: list[index].transdate,
            type: '接单',
            value: list[index].orderQty
        })
        chartdata.push({
            year: list[index].transdate,
            type: '发货',
            value: list[index].SendQty
        })
        chartdata.push({
            year: list[index].transdate,
            type: '投料',
            value: list[index].stupQty
        })
        chartdata.push({
            year: list[index].transdate,
            type: '入库',
            value: list[index].prodQty
        })
    }
    if (!result) {
        return ctx.body = {
            code: 100,
            msg: '查无数据'
        }
    }
    ctx.body = {
        code: 200,
        result: chartdata
    }
})
module.exports = router