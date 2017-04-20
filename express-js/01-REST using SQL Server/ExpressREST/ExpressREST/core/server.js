var express = require('express');
var settings = require("../settings");
var emp = require("../controllers/employee");
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();
//-->following two line needed for POST/PUT etc.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', function (req, res) {
    res.json({ msg: "Use '/api/employees' to fetch all employees" });
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

////-->method 2
//router.route("/api/employees").get(function (req, res) {
//    emp.getList(req, res);
//}).post(function (req, res) {
//    emp.add(req, res);
//});
//router.route("/api/employees/:empId").get(function (req, res) {
//    emp.get(req, res, req.params.empId);
//}).put(function (req, res) {
//    emp.update(req, res, req.params.empId);
//}).delete(function (req, res) {
//    emp.delete(req, res, req.params.empId);
//});

app.use('/', router);
app.listen(settings.webPort, function () {
    console.log("Started listening at: " + settings.webPort);
});