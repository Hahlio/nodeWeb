var fs = require('fs');
var url = require('url');

// This is where we deal with the request
module.exports = {
    GET: function(req, res){
        /* The segment that parses the URL so that it either grabs the website,
         * information (query), or file that it requests
         */
        var pathname = url.parse(req.url, true).pathname;

        console.log("GET %s", pathname);

        var grabPath;
        var error = 0;
        var splitPath = pathname.split(".");

        // if it is a request for the webpage, then there will not be a file extension
        if(splitPath.length < 2){
            if(!pathname.endsWith("/")){
                pathname = pathname.concat("/");
            }
            grabPath = __dirname + "/website" + pathname + "index.html";
            fileType = 'text/html';
        }
        else{
            // Checks what file we are going to return
            switch(splitPath[1].toLowerCase()){
                case "ico":
                    grabPath = __dirname + "/website" + pathname;
                    fileType = 'image/x-icon';
                    break;
                case "png":
                    grabPath = __dirname + "/website" + pathname;
                    fileType = 'image/png';
                    break;
                // TODO: Implement more cases depending on what files we will support.
                default:
                    error = 400;
                    errMsg = "GET request for an unsupported file type: ." + splitPath[1];
                    console.log("GET request for an unsupported file type: .%s", splitPath[1]);
            }
        }

        // Grabs data from server only if there isn't any errors
        if(error == 0){
            fs.readFile(grabPath, (err, data) => {
                    if(err){
                        errMsg = err;
                        error = 404;
                        res.writeHead(error, {'Content-Type': 'text/html'});
                        res.end("<h1>Error " + error +"</h1>"+"<p>" + errMsg + "</p>");
                    }
                    else{
                        res.writeHead(200, {'Content-Type': fileType});
                        res.write(data);
                        res.end();
                        //console.log("GET %s", pathname);
                    }
                });
        }
        // Error handler
        if(error != 0){
            res.writeHead(error, {'Content-Type': 'text/html'});
            res.end("<h1>Error " + error +"</h1>"+"<p>" + errMsg + "</p>");
        }
    },

    PUT: function(req, res){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("locArr[1]");
    }
}
