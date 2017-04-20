var sqlDb = require("mssql");
var settings = require("../settings");

exports.executeSql = function (sql, callback) {
    
    //intentional blocking delay
    var seconds = 3; //3 second delay
    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    while(waitTill > new Date()){};

    var conn = new sqlDb.Connection(settings.dbConfig);
    conn.connect().then(function () {
        var req = new sqlDb.Request(conn);
        req.query(sql).then(function (recordset) {
            conn.close();
            callback(recordset);
        }).catch(function (err) {
            console.log(err);
            callback(null, err);
        });
    }).catch(function (err) {
        console.log(err);
        callback(null, err);
    });
};