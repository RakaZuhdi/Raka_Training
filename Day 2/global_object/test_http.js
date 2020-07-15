/*

file system -> fs
operating system -> os
path -> path

HTTP module - => untuk membuat networking application.
- web server, listen HTTP request

*/

const http = require('http');
const server = http.createServer( (req, res) => {
    if(req.url === "/"){
        res.write('Hello World');
        res.end();
    }

    if(req.url === '/sgu/training'){
        res.write('Ini adalah route kedua');
        res.end();
    }

    else{
        res.write('Halaman tidak tersedia');
        res.end();
    }
});


/*
server.on('connection', (socket)=>{
    //perintah yang mau dijalanakan kalau ada incoming connection
    ///atau ada HTTP request ke server kita.
    console.log('New HTTP request, coming...');
})
*/

server.listen(3000);
console.log('Listening on port 3000...')