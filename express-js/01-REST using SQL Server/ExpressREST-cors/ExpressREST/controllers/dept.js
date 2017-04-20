var db = require("../core/db");
var util = require("util");

exports.getList = function (req, res) {
    db.executeSql("SELECT * FROM dept", function (data, err) {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.json(data);
        }
    });
};

exports.get = function (req, res, deptno) {
    db.executeSql("SELECT * FROM dept WHERE deptno=" + deptno, function (data, err) {
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
            var sql = "INSERT INTO dept (deptno, dname) VALUES ";
            sql += util.format("(%d, '%s') ", data.Deptno, data.Dname);
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

exports.update = function (req, res, deptno) {
    try {
        var data = req.body;
        if (data) {
            if (!deptno) throw new Error("Deptno not provided");
            
            var sql = "UPDATE dept SET ";
            
            var isDataProvided = false;
            if (data.Dname) {
                sql += "Dname = '" + data.Dname + "',";
                isDataProvided = true;
            }
            
            if (!isDataProvided) throw new Error("No data provided to update");
            
            sql = sql.slice(0, -1); //remove last comma
            sql += " WHERE deptno = " + deptno;
            
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

exports.delete = function (req, res, deptno) {
    try {
        if (!deptno) throw new Error("Deptno not provided");
        
        var sql = "DELETE FROM dept ";
        sql += " WHERE deptno = " + deptno;
        
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