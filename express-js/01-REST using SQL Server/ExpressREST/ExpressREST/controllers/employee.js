var db = require("../core/db");
var util = require("util");

exports.getList = function (req, res) {
    db.executeSql("SELECT * FROM emp", function (data, err) {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.json(data);
        }
    });
};

exports.get = function (req, res, empno) {
    db.executeSql("SELECT * FROM emp WHERE empno=" + empno, function (data, err) {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.json(data);
        }
    });
};

exports.add = function (req, res) {
    try {
        var data = req.body;
        if (data) {//add more validations if necessary
            var sql = "INSERT INTO emp (empno, ename, sal, deptno) VALUES ";
            sql += util.format("(%d, '%s', %d, %d) ", data.Empno, data.Ename, data.Sal, data.Deptno);
            db.executeSql(sql, function (data, err) {
                if (err) {
                    res.status(500).json(err);
                }
                else {
                    res.sendStatus(200); //or res.status(200).send('OK')
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    } 
    catch (ex) {
        res.status(500).json({ msg: ex.message });
    }
    
};

exports.update = function (req, res, empId) {
    try {
        var data = req.body;
        if (data) {
            if (!empId) throw new Error("Empno not provided");
            
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
            sql += " WHERE empno = " + empId;
            
            db.executeSql(sql, function (data, err) {
                if (err) {
                    res.status(500).json(err);
                }
                else {
                    res.sendStatus(200);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    } 
    catch (ex) {
        res.status(500).json({ msg: ex.message });
    }
};

exports.delete = function (req, res, empId) {
    try {
        if (!empId) throw new Error("Empno not provided");
        
        var sql = "DELETE FROM emp ";
        sql += " WHERE empno = " + empId;
        
        db.executeSql(sql, function (data, err) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.sendStatus(200);
            }
        });        
    } 
    catch (ex) {
        res.status(500).json({ msg: ex.message });
    }
};