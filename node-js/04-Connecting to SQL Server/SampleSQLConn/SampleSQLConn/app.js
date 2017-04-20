var sql = require("mssql");

var dbConfig = {
    server: "localhost\\SQL2K14",
    database: "SampleDb",
    user: "sa",
    password: "sql2014",
    port: 1433
};

function getEmp() {
    var conn = new sql.Connection(dbConfig);
    
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("SELECT * FROM emp").then(function (recordset) {
            console.log(recordset);
            conn.close();
        })
        .catch(function (err) {
            console.log(err);
            conn.close();
        });        
    })
    .catch(function (err) {
        console.log(err);
    });

    //--> another way
    //var req = new sql.Request(conn);
    //conn.connect(function (err) {
    //    if (err) {
    //        console.log(err);
    //        return;
    //    }
    //    req.query("SELECT * FROM emp", function (err, recordset) {
    //        if (err) {
    //            console.log(err);
    //        }
    //        else { 
    //            console.log(recordset);
    //        }
    //        conn.close();
    //    });
    //});

}

getEmp();