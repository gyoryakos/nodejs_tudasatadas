const http = require('http');

// Minden http request esetén lefut.
const requestListener = function (req, res) {
    console.log("hi");
    res.end(`Hello,       World!`);
}

const server = http.createServer(requestListener);
server.listen(8080);