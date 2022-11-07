const http = require('http');
const fs = require('fs');
const path = require('path');

//const rw = fs.createReadStream(path.join(__dirname, 'discography.json'));
//const ws = fs.createWriteStream(path.join(__dirname, 'album.json'));

const requestListener = function (req, res) {
    switch(true) {
        // Get main page.
        case req.url === '/' && req.method === 'GET':
            res.setHeader('content-type', 'text/html; charset=utf-8')
            res.writeHead(200);
            res.end(
                `
                    <h1 style="color:blue">Rock bands</h1>
                    <button><a href="/iron_maiden">Iron Maiden<a/></button>
                `
            );
            break;
        // Get Iron Maiden page.
        case req.url === '/iron_maiden' && req.method === 'GET':
            res.setHeader('content-type', 'text/html; charset=utf-8')
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
        case req.url === '/iron_maiden/discography' && req.method === 'GET':
            fs.readFile(__dirname + "/discography.txt", (err, data) => {
                res.setHeader('content-type', 'text/html; charset=utf-8')
                const jsonData = JSON.parse(data);
                res.writeHead(200);
                res.end(JSON.stringify(jsonData.albums));  
            })
            break;
        case req.url.match(/\/iron_maiden\/discography\/([0-9]+)/) && req.method === 'GET':
            const splitUrl = req.url.split("/");
            const id = splitUrl[splitUrl.length - 1];

            fs.readFile(path.join(__dirname, "discography.txt"), (err, data) => {
                res.setHeader('content-type', 'application/json; charset=utf-8')
                const jsonData = JSON.parse(data);
                const albums = JSON.stringify(jsonData.albums)
                let searchedAlbum;

                for(let album of jsonData.albums) {
                    if(album.id == id) {
                        searchedAlbum = album
                    }
                }

                if(searchedAlbum == undefined) {
                    //ws.write(searchedAlbum);
                    res.end("There is no album with this id.")
                }
                else {
                    res.writeHead(200);
                    res.end(JSON.stringify(searchedAlbum));    
                }
            })
            break;
        case req.url === '/iron_maiden/discography' && req.method === 'POST':
            let body = '';
            req.on('data', chunk => {
                console.log("hi");
                body += chunk.toString();
                console.log("body" + body);
            })

            req.on('end', () => {
                const newAlbum = JSON.parse(body);
                
                fs.readFile(path.join(__dirname, 'discography.json'), (err, data) => {
                    const albums = JSON.parse(data);
                    albums.push(newAlbum);

                    fs.writeFile(path.join(__dirname, 'discography.json'), JSON.stringify(albums), () => {
                        res.end(JSON.stringify(newAlbum));
                    })
                })
                res.end();    
            })
            break;
        default:
            res.setHeader('content-type', 'text/html; charset=utf-8')
            res.writeHead(404);
            res.end('Page not found.');
    }
}

const server = http.createServer(requestListener);
server.listen(8080);