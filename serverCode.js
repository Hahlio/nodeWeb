var http = require('http');
var url = require('url');
var methods = require(__dirname + '/methods.js');

http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);

    // The switch that deals with the different request methods
    switch(req.method){
        case "GET":
            methods.GET(req, res);
            break;
        case "PUT":
            console.log("put");
            methods.PUT(req, res);
            break;
        default:
            console.log("Not yet implemented");
    }
}).listen(8080);
