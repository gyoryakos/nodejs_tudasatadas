const http = require('http');
const fs = require('fs');
const path = require('path');

const requestListener = function (req, res) {
    switch(true) {
        // GET main page.
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
        // GET Iron Maiden discography.
        case req.url === '/iron_maiden/discography' && req.method === 'GET':
            fs.readFile(__dirname + "/discographyTest.json", (err, data) => {
                res.setHeader('content-type', 'application/json; charset=utf-8')
                res.writeHead(200);
                res.end(data);  
            })
            break;
        // GET an album by id.
        case req.url.match(/\/iron_maiden\/discography\/([0-9]+)/) && req.method === 'GET':
            const splitUrlGET = req.url.split("/");
            const idGET = splitUrlGET[splitUrlGET.length - 1];

            fs.readFile(path.join(__dirname, "discographyTest.json"), (err, data) => {
                res.setHeader('content-type', 'application/json; charset=utf-8');
                const albums = JSON.parse(data);
                let searchedAlbum;

                for(let album of albums) {
                    if(album.id == idGET) {
                        searchedAlbum = album;
                    }
                }

                if(searchedAlbum == undefined) {
                    res.end("There is no album with this id.")
                }
                else {
                    res.writeHead(200);
                    res.end(JSON.stringify(searchedAlbum));    
                }
            })
            break;
        // POST an album.
        case req.url === '/iron_maiden/discography' && req.method === 'POST':
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            })

            req.on('end', () => {
                const newAlbum = JSON.parse(body);
                
                fs.readFile(path.join(__dirname, 'discographyTest.json'), (err, data) => {
                    const albums = JSON.parse(data);
                    albums.push(newAlbum);

                    fs.writeFile(path.join(__dirname, 'discographyTest.json'), JSON.stringify(albums), () => {
                        res.end(JSON.stringify(newAlbum));
                    })
                })
            })
            break;
        // DELETE an album by id.
        case req.url.match(/\/iron_maiden\/discography\/([0-9]+)/) && req.method === 'DELETE':
            const splitUrlDELETE = req.url.split("/");
            const idDELETE= splitUrlDELETE[splitUrlDELETE.length - 1];

            fs.readFile(path.join(__dirname, "discographyTest.json"), (err, data) => {
                res.setHeader('content-type', 'application/json; charset=utf-8');
                const albums = JSON.parse(data);
                console.log("data: " + data);
                let searchedAlbum;
                let index = 0; // index of selected item in array

                for(let album of albums) {
                    index++;
                    if(album.id == idDELETE) {
                        searchedAlbum = album;
                        index--;
                        break;
                    }
                }

                console.log("searchedAlbum: " + searchedAlbum);
                console.log('index: ' + index);

                if(searchedAlbum == undefined) {
                    res.end("There is no album with this id.")
                }

                albums.splice(index, 1);

                fs.writeFile(path.join(__dirname, 'discographyTest.json'), JSON.stringify(albums), () => {
                    res.end(JSON.stringify(albums));
                })
            });
            break;
        default:
            res.setHeader('content-type', 'text/html; charset=utf-8')
            res.writeHead(404);
            res.end('Page not found.');
    }
}

const server = http.createServer(requestListener);
server.listen(8080);