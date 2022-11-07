const http = require('http');

const requestListener = function (req, res) {
    console.log("req.url: " + req.url);
    console.log("req.method: " + req.method);
    
    res.end(`Hello, World!`);
}

const server = http.createServer(requestListener);
server.listen(8080);