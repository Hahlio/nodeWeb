var fs = require('fs');
var url = require('url');

// This is where we deal with the request
module.exports = {
    GET: function(req, res){
        var pathname = url.parse(req.url, true).pathname;
        console.log("GET %s", pathname);
        fs.readFile(__dirname + "/website" + pathname + "index.html", (err, data) => {
                if(err){
                    console.log(err);
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end("Error 404: page not found");
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    res.end();
                    //console.log("GET %s", pathname);
                }
            });
    },
    PUT: function(req, res){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("locArr[1]");
    }
}
