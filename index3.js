const http = require('http');
const port = 8080;

// Minden http request esetén lefut.
const requestListener = function (req, res) {
    console.log("hi");
    console.log(req.url);
    
    res.end(
    `Hello,          World!
    `);
}

const server = http.createServer(requestListener);
server.listen(port);