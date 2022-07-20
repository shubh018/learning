const http = require('http')
const fs = require('fs')

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName == '/overview'){
        res.end('You have entered the Overview page!Welcome');
    }
    if (pathName == '/api'){
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    }
    else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'shubham-header': 'testing'
        });
        res.end('<h2>Please enter a valid URL</h2>');
    }
});

server.listen('8000', '127.0.0.1', () => {
    console.log("Starting server");
    console.log("Listening to port 8000");
});