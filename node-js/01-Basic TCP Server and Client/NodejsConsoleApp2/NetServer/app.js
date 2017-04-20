var net = require("net");
var server = net.createServer();

var colors = require("colors");

server.on("connection", handleConnection);
server.listen(9000, function () {
    console.log("server listening to %j", server.address());
});

function handleConnection(conn) {
    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    console.log("new client connection from %s".green, remoteAddress);
    
    conn.on("data", onConnData);
    conn.once("close", onConnClose);
    conn.on("error", onConnError);
    
    function onConnData(d) {
        //console.log('connection data from %s: %j', remoteAddress, d);
        console.log("connection data from %s: %s".cyan, remoteAddress, d.toString("ascii"));
        conn.write("Hello " + d);
    }
    
    function onConnClose() {
        console.log("connection from %s closed".yellow, remoteAddress);
    }
    
    function onConnError(err) {
        console.log("Connection %s error: %s".red, remoteAddress, err.message);
    }
}