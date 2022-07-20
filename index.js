const fs = require('fs')

// Blocking code; Synchronous
// const result = fs.readFileSync('./starter/txt/input.txt', 'utf-8')
// const textOut = `This is what we know about Avocado: ${result}.\nCreated on ${Date.now()}`

// fs.writeFileSync('./starter/txt/output.txt', textOut)

// Non-blocking code; Asynchronous
fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data) => {
    if (err) return console.log('ERROR! BOOOOOOOOM!!!!')
    fs.readFile(`./starter/txt/${data}.txt`, 'utf-8', (err, data1) => {
        console.log(data1)
        fs.readFile('./starter/txt/append.txt', 'utf-8', (err, data2) => {
            console.log(data2)
            fs.writeFile('./starter/txt/final.txt', `${data1}\n${data2}` , 'utf-8', err => {
                console.log("Contents have been written to final.txt file")
            })
        })
    })
})