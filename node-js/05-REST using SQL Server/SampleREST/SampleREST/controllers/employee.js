var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

exports.getList = function (req, resp) {
    db.executeSql("SELECT * FROM emp", function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};

exports.get = function (req, resp, empno) {
    db.executeSql("SELECT * FROM emp WHERE empno=" + empno, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};

exports.add = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {//add more validations if necessary
            var sql = "INSERT INTO emp (empno, ename, sal, deptno) VALUES ";
            sql += util.format("(%d, '%s', %d, %d) ", data.Empno, data.Ename, data.Sal, data.Deptno);
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    } 
        catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
    
};

exports.update = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            if (!data.Empno) throw new Error("Empno not provided");

            var sql = "UPDATE emp SET ";
            
            var isDataProvided = false;
            if (data.Ename) {
                sql += "Ename = '" + data.Ename + "',";
                isDataProvided = true;
            }
            if (data.Sal) {
                sql += "Sal = " + data.Sal + ",";
                isDataProvided = true;
            }
            if (data.Deptno) {
                sql += "Deptno = " + data.Deptno + ",";
                isDataProvided = true;
            }
            
            if (!isDataProvided) throw new Error("No data provided to update");

            sql = sql.slice(0, -1); //remove last comma
            sql += " WHERE empno = " + data.Empno;

            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    } 
        catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

exports.delete = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            if (!data.Empno) throw new Error("Empno not provided");
            
            var sql = "DELETE FROM emp ";
            sql += " WHERE empno = " + data.Empno;
            
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    } 
        catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};