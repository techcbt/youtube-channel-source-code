var http = require("http");
var httpMsgs = require("./httpMsgs");
var settings = require("../settings");
var emp = require("../controllers/employee");

http.createServer(function (req, resp) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                httpMsgs.showHome(req, resp);
            }
            else if (req.url === "/employees") {
                emp.getList(req, resp);
            }
            else {
                var empnoPatt = "[0-9]+";
                var patt = new RegExp("/employees/" + empnoPatt);
                if (patt.test(req.url)) {
                    patt = new RegExp(empnoPatt);
                    var empno = patt.exec(req.url);
                    emp.get(req, resp, empno);
                }
                else {
                    httpMsgs.show404(req, resp);
                }                
            }
            break;
        case "POST":
            if (req.url === "/employees") {
                var reqBody = '';
                req.on('data', function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) { //10MB
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on('end', function () {                    
                    emp.add(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        case "PUT":
            if (req.url === "/employees") {
                var reqBody = '';
                req.on('data', function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) { //10MB
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on('end', function () {
                    emp.update(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        case "DELETE":
            if (req.url === "/employees") {
                var reqBody = '';
                req.on('data', function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) { //10MB
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on('end', function () {
                    emp.delete(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        default:
            httpMsgs.show405(req, resp);
            break;
    }
}).listen(settings.webPort, function () {
    console.log("Started listening at: " + settings.webPort);
});