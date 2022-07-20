const http = require('http')
const fs = require('fs')

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%FROM%}/g, product.from)
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%PRODUCTDESCRIPTION%}/g, product.description)
    if (!product.organic){
        output = output.replace(/{%IS_ORGANIC%}/g, 'not-organic')
    }
    output = output.replace(/{%ID%}/g, product.id)

    return output
}


const templateOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');
const template = fs.readFileSync(`${__dirname}/starter/templates/template.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`)
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    const pathName = req.url;

    // Overview Page
    if (pathName === '/overview' || pathName === '/'){
        res.writeHead(200, {'Content-type':'text/html'});
        
        const cardsHtml = dataObj.map(el => replaceTemplate(template, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }

    // API
    else if (pathName === '/product'){
        res.writeHead(200, {'Content-type':'text/html'});
        res.end(templateProduct)
    }

    // API
    else if (pathName === '/api'){
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