const http = require('http');
const map = require('through2-map');

const port = process.argv[2];

//  inStream.pipe(map(function (chunk) {
//    return chunk.toString().split('').reverse().join('')
//  })).pipe(outStream)

const server = http
  .createServer((req, res) => {
    req.pipe(map(chunk => chunk.toString().toUpperCase())).pipe(res);
  })
  .listen(port);
