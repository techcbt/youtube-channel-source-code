var http = require("http");
var qs = require("querystring");
var StringBuilder = require("stringbuilder");

var port = 9000;

function getCalcHtml(req, resp, data) {
    var sb = new StringBuilder({ newline: "\r\n" });
    sb.appendLine("<html>");
    sb.appendLine(" <body>");
    sb.appendLine("     <form method='post'>");
    sb.appendLine("         <table>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>Enter First No: </td>");
    
    if (data && data.txtFirstNo) {
        sb.appendLine("                 <td><input type='text' id='txtFirstNo' name='txtFirstNo' value='{0}'/></td>", data.txtFirstNo);
    }
    else {
        sb.appendLine("                 <td><input type='text' id='txtFirstNo' name='txtFirstNo' /></td>");
    }
    
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>Enter Second No: </td>");
    
    if (data && data.txtSecondNo) {
        sb.appendLine("                 <td><input type='text' id='txtSecondNo' name='txtSecondNo' value='{0}'/></td>", data.txtSecondNo);
    }
    else {
        sb.appendLine("                 <td><input type='text' id='txtSecondNo' name='txtSecondNo' /></td>");
    }
    
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td><input type='submit' value='Calculate' /></td>");
    sb.appendLine("             </tr>");
    
    if (data && data.txtFirstNo && data.txtSecondNo) {
        var sum = parseInt(data.txtFirstNo) + parseInt(data.txtSecondNo);
        sb.appendLine("             <tr>");
        sb.appendLine("                 <td>Sum: {0}</td>", sum);
        sb.appendLine("             </tr>");
    }
    
    sb.appendLine("         </table>");
    sb.appendLine("     </form>")
    sb.appendLine(" </body>");
    sb.appendLine("</html>");
    sb.build(function (err, result) {
        resp.write(result);
        resp.end();
    });
}

function getCalcForm(req, resp, data) {
    resp.writeHead(200, { "Content-Type": "text/html" });
    getCalcHtml(req, resp, data);
}

function getHome(req, resp) {
    resp.writeHead(200, { "Content-Type": "text/html" });
    resp.write("<html><html><head><title>Home</title></head><body>Want to some calculation? Click <a href='/calc'>here</a></body></html>");
    resp.end();
}

function get404(req, resp) {
    resp.writeHead(404, "Resource Not Found", { "Content-Type": "text/html" });
    resp.write("<html><html><head><title>404</title></head><body>404: Resource not found. Go to <a href='/'>Home</a></body></html>");
    resp.end();
}

function get405(req, resp) {
    resp.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
    resp.write("<html><html><head><title>405</title></head><body>405: Method not supported</body></html>");
    resp.end();
}

http.createServer(function (req, resp) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                getHome(req, resp);
            }
            else if (req.url === "/calc") {
                getCalcForm(req, resp);
            }
            else {
                get404(req, resp);
            }
            break;
        case "POST":
            if (req.url === "/calc") {
                var reqBody = '';
                req.on('data', function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) { //10MB
                        resp.writeHead(413, 'Request Entity Too Large', { 'Content-Type': 'text/html' });
                        resp.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
                    }
                });
                req.on('end', function () {
                    var formData = qs.parse(reqBody);
                    getCalcForm(req, resp, formData);
                });
            }
            else {
                get404(req, resp);
            }
            break;
        default:
            get405(req, resp);
            break;
    }
}).listen(port);
