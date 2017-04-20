var express = require('express');
var settings = require("../settings");
var emp = require("../controllers/employee");
var bodyParser = require('body-parser');
var cors = require("cors");

var app = express();
app.use(cors());

var router = express.Router();
//-->following two line needed for POST/PUT etc.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', function (req, res) {
    res.json({ msg: "Use '/api/employees' to fetch all employees" });
});

////-->method 1
router.get('/api/employees', function (req, res) {
    emp.getList(req, res);
});
router.get('/api/employees/:empId', function (req, res) {
    emp.get(req, res, req.params.empId);
});

app.use('/', router);
app.listen(settings.webPort, function () {
    console.log("Started listening at: " + settings.webPort);
});