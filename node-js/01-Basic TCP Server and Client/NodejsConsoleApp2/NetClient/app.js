var readlineSync = require("readline-sync");
var net = require("net");
var colors = require("colors");

var HOST = "127.0.0.1";
var PORT = 9000;

var client = null;

function OpenConnection() {
    if (client) {
        console.log("--Connection is already open--".red);
        setTimeout(function () {
            menu();
        }, 0);
        return;
    }
    
    client = new net.Socket();
    
    client.on("error", function (err) {
        client.destroy();
        client = null;
        console.log("ERROR: Connection could not be opened. Msg: %s".red, err.message);
        setTimeout(function () {
            menu();
        }, 0);
    });
    
    client.on("data", function (data) {
        console.log("Received : %s".cyan, data);
        setTimeout(function () {
            menu();
        }, 0);
    });
    
    client.connect(PORT, HOST, function () {
        isConnected = true;
        console.log("Connection opened successfully!".green);
        setTimeout(function () {
            menu();
        }, 0);
    });
}

function SendData(data) {
    if (!client) {
        console.log("--Connection is not open or closed--".red);
        setTimeout(function () {
            menu();
        }, 0);
        return;
    }
    
    client.write(data);
}

function CloseConnection() {
    if (!client) {
        console.log("--Connection is not open or already closed--".red);
        setTimeout(function () {
            menu();
        }, 0);
        return;
    }
    client.destroy();
    client = null;
    console.log("Connection closed successfully!".yellow);
    setTimeout(function () {
        menu();
    }, 0);
}

function menu() {
    var lineRead = readlineSync.question("\n\nEnter option (1-Open, 2-Send, 3-Close, 4-Quit):");
    switch (lineRead) {
        case "1":
            OpenConnection();
            break;
        case "2":
            var data = readlineSync.question("Enter data to send:");
            SendData(data);
            break;
        case "3":
            CloseConnection();
            break;
        case "4":
            return;
            break;
        default:
            setTimeout(function () {
                menu();
            }, 0);
            break;
    }
};

setTimeout(function () {
    menu();
}, 0);



