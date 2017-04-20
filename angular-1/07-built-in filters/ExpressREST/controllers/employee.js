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
			if(data && data.length > 0)
				res.json(data[0]); //expected only one row here
			else
				res.status(404).send("Employee not found");
        }
    });
};
