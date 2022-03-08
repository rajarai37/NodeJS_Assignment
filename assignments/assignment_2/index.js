const http=require('http')
const fs= require('fs')
fs.writeFile('index.html','<h1>Hello World</h1><p>I am Raja Rai</p>',(err,data)=>{
    http.createServer((req,res)=>{
        res.writeHead(200,{"Content-type":"text/html"})
    fs.readFile("index.html",{encoding:"utf-8"},(err,data)=>{
        res.end(data)
    })
    }).listen(3000)
})