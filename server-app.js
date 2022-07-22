const http = require('http')
const fs = require('fs')
const url = require('url')
const slugify = require('slugify')

const replaceTemplate = require('./modules/replaceTemplate')

const templateOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');
const template = fs.readFileSync(`${__dirname}/starter/templates/template.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`)
const dataObj = JSON.parse(data)

const urls = dataObj.map(el => slugify(el.productName, {lower: true}))
console.log(urls)

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true)

    // Overview Page
    if (pathname === '/overview' || pathname === '/'){
        res.writeHead(200, {'Content-type':'text/html'});
        
        const cardsHtml = dataObj.map(el => replaceTemplate(template, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output)
        console.log(output);
    }

    // API
    else if (pathname === '/product'){
        res.writeHead(200, {'Content-type':'text/html'});
        
        const product = dataObj[query.id]
        const output = replaceTemplate(templateProduct, product)
        res.end(output)
    }

    // API
    else if (pathname === '/api'){
        res.writeHead(200, {'Content-type':'text/html'});
    }

    // Not Found Page
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