var express = require('express');
var settings = require("./settings");
var calc = require("./controllers/calc");
var bodyParser = require('body-parser'); //just for future POST/PUT
var cors = require("cors");

var app = express();
app.use(cors());
var router = express.Router();
//-->following two line needed for POST/PUT etc (just in case).
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', function (req, res) {
	res.json({ msg: "Use '/api/add/10/20' to add 10 and 20" });
});

router.route("/api/add/:a?/:b?").get(function (req, res) {
	calc.add(req, res, req.params.a, req.params.b);
});

router.route("/api/multiply/:a?/:b?").get(function (req, res) {
	calc.multiply(req, res, req.params.a, req.params.b);
});

app.use('/', router);

app.listen(settings.webPort, function () {
	console.log("Started listening at: " + settings.webPort);
});