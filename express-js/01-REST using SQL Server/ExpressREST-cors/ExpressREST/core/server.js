var express = require('express');
var settings = require("../settings");
var emp = require("../controllers/employee");
var dept = require("../controllers/dept");
var bodyParser = require('body-parser');
var cors = require("cors");

var app = express();
app.use(cors());
var router = express.Router();
//-->following two line needed for POST/PUT etc.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', function (req, res) {
	res.json({ msg: "Use '/api/employees' to fetch all employees or '/api/depts' to fetch all departments" });
});

////-->method 1
//router.get('/api/employees', function (req, res) {
//    emp.getList(req, res);
//});
//router.get('/api/employees/:empId', function (req, res) {
//    emp.get(req, res, req.params.empId);
//});
//router.post('/api/employees', function (req, res) {
//    emp.add(req, res);
//});
//router.put('/api/employees/:empId', function (req, res) {
//    emp.update(req, res, req.params.empId);
//});
//router.delete('/api/employees/:empId', function (req, res) {
//    emp.delete(req, res, req.params.empId);
//});

//-->method 2
router.route("/api/employees").get(function (req, res) {
	emp.getList(req, res);
}).post(function (req, res) {
	emp.add(req, res);
});
router.route("/api/employees/:empId").get(function (req, res) {
	emp.get(req, res, req.params.empId);
}).put(function (req, res) {
	emp.update(req, res, req.params.empId);
}).delete(function (req, res) {
	emp.delete(req, res, req.params.empId);
});
router.route("/api/employees/dept/:deptno").get(function (req, res) {
	emp.getListByDeptno(req, res, req.params.deptno);
});

//departments stuff
router.route("/api/depts").get(function (req, res) {
	dept.getList(req, res);
}).post(function (req, res) {
	dept.add(req, res);
});
router.route("/api/depts/:deptno").get(function (req, res) {
	dept.get(req, res, req.params.deptno);
}).put(function (req, res) {
	dept.update(req, res, req.params.deptno);
}).delete(function (req, res) {
	dept.delete(req, res, req.params.deptno);
});

app.use('/', router);

app.listen(settings.webPort, function () {
	console.log("Started listening at: " + settings.webPort);
});