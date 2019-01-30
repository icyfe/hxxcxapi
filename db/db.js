const mssql = require("mssql");
var db = {};

var config = {
    user: "sa",
    password: "895859@hxdz",
    server: '192.168.130.114',
    database: 'WeChatDate',
    options: {
        //encrypt: true
    },
    pool: {
        min: 0,
        idleTimeoutMillis: 3000
    }
};
var restoreDefaults = function () {
    config = {
        user: "sa",
        password: "895859@hxdz",
        server: '192.168.130.114',
        database: 'WeChatDate',
        options: {
            //encrypt: true
        },
        pool: {
            min: 0,
            idleTimeoutMillis: 3000
        }
    };
}
db.querySql = function (sql, params, callBack) {

    return new Promise((resolve, reject) => {
        var connection = new mssql.ConnectionPool(config, function (err) {
            var ps = new mssql.PreparedStatement(connection);
            if (params != "") {
                for (var index in params) {
                    if (typeof params[index] == "number") {
                        ps.input(index, mssql.Int);
                    } else if (typeof params[index] == "string") {
                        ps.input(index, mssql.NVarChar);
                    }
                }
            }
            ps.prepare(sql, function (err) {
                if (err)
                    console.log(err);
                ps.execute(params, function (err, recordset) {
                    if (err) return console.log(err);
                    resolve(recordset)
                    // callBack(err, recordset);
                    ps.unprepare(function (err) {
                        if (err)
                            console.log(err);
                    });
                });
            });
        });
        restoreDefaults();
    })
};
module.exports = db;
