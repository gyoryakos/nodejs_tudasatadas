const http = require('http');
const port = 8080;

const requestListener = function (req, res) {
    switch(true) {
        case req.url === '/' && req.method === 'GET':
            //res.setHeader('content-type', 'text/html; charset=utf-8')
            res.writeHead(200);
            res.end(
                `
                    <h1 style="color:blue">Rock bands</h1>
                    <button><a href="/iron_maiden">Iron Maiden<a/></button>
                `
            );
            break;
        case req.url === '/iron_maiden' && req.method === 'GET':
            //res.setHeader('content-type', 'text/html; charset=utf-8')
            res.writeHead(200);
            res.end(
                `
                    <h2 style="color:red">Iron Maiden</h2>
                    <button style="margin:15px"><a href="/iron_maiden/history">History</a></button>
                    <button style="margin:15px"><a href="/iron_maiden/discography">Discography</a></button>
                    <button style="margin:15px"><a href="/iron_maiden/shop">Shop</a></button>
                    <br>
                    <button><a href="/">Back to the main page</a></button>
                `
            );
            break;
        default:
            //res.setHeader('content-type', 'text/html; charset=utf-8')
            res.writeHead(404);
            res.end('Page not found.');
    }

}

const server = http.createServer(requestListener);
server.listen(port);