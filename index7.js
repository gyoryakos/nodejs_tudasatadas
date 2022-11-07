const http = require('http');
const fs = require('fs');
const path = require('path');

const requestListener = function (req, res) {
    switch(true) {
        case req.url === '/iron_maiden/discography' && req.method === 'GET':
            fs.readFile(__dirname + "/discography.json", (err, data) => {
                res.setHeader('content-type', 'application/json; charset=utf-8')
                res.writeHead(200);
                res.end(data);  
            })
            break;
        case req.url.match(/\/iron_maiden\/discography\/([0-9]+)/) && req.method === 'GET':
            const splitUrl = req.url.split("/");
            const id = splitUrl[splitUrl.length - 1];

            fs.readFile(path.join(__dirname, "discography.json"), (err, data) => {
                res.setHeader('content-type', 'application/json; charset=utf-8');
                const albums = JSON.parse(data);
                let searchedAlbum;

                for(let album of albums) {
                    if(album.id == id) {
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
        case req.url === '/iron_maiden/discography' && req.method === 'POST':
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
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
            
            // req.on('end', () => {
            //     const newAlbum = JSON.parse(body);
            //     console.log("newAlbum" + newAlbum);
                
            //     fs.readFile(path.join(__dirname, 'discography.json'), (err, data) => {
            //         console.log("data: " + data)
            //         const albums = JSON.parse(data);
            //         albums.push(newAlbum);

            //         fs.writeFile(path.join(__dirname, 'discography.json'), JSON.stringify(albums), () => {
            //             res.end(JSON.stringify(newAlbum));
            //         })
            //     })
            //     res.end();    
            // })

            // req.on('end', () => {
            //     const newAlbum = JSON.parse(body);
            //     console.log("newAlbum" + newAlbum);
                
            //     fs.readFile(path.join(__dirname, 'discography.txt'), (err, data) => {
            //         newData = JSON.parse(data);
            //         console.log("newData: " + newData);
            //         const albums = newData.albums;
            //         console.log("albums: " + albums);
            //         const parsedAlbums = JSON.parse(albums);

            //         albums.push(newAlbum);

            //         fs.writeFile(path.join(__dirname, 'discography.txt'), JSON.stringify(albums), () => {
            //             res.end(JSON.stringify(newAlbum));
            //         })
            //     })
            //     res.end();
            //})
           // break;
        default:
            res.setHeader('content-type', 'text/html; charset=utf-8')
            res.writeHead(404);
            res.end('Page not found.');
    }
}

const server = http.createServer(requestListener);
server.listen(8080);