'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer(function(req, res) {
  const pathname = decodeURI(url.parse(req.url).pathname);
  const filename = pathname.slice(1); // /file.ext -> file.ext

  // if (filename.includes('/') || filename.includes('..')) {
  //   res.statusCode = 400;
  //   res.end('Nested paths are not allowed');
  //   return;
  // }

  // console.log(req.method);

  if (req.method === 'GET' && pathname == '/') {
    const html = fs.readFileSync('../client/index.html', 'utf8');
    res.end(html);
  }

  if (req.method === 'GET' && pathname == '/style.css') {
    const css = fs.readFileSync('../client/style.css', 'utf8');
    res.end(css);
  }

  if (req.method === 'GET' && pathname == '/index.js') {
    const js = fs.readFileSync('../client/index.js', 'utf8');
    res.end(js);
  }
});

console.log('port = ', process.env.PORT);

server.listen(process.env.PORT || 3000);
console.log('Server started!');
