const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url === "/"){
        res.write('Page 1');
        res.end();
    }

    if(req.url === "/page2"){
        res.write('Page 2');
        res.end();
    }

    if(req.url === "/page2/page3"){
        res.write('Page 3');
        res.end()
    }

    if(req.url === "/page2/page3/page4"){
        res.write('Page 4');
        res.end()
    }

    if(req.url === "/page2/page3/page4/page5"){
        res.write('Page 5');
        res.end()
    }
})

server.listen(5000);
console.log('Listening on port 5000')