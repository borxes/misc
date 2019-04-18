const http = require('http');
const url = require('url');

const port = process.argv[2];

const server = http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const { query, pathname } = url.parse(req.url, true);
    const date = new Date(query.iso);
    if (pathname === '/api/parsetime') {
      res.end(
        JSON.stringify({
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
        })
      );
    }
    if (pathname === '/api/unixtime') {
      res.end(
        JSON.stringify({
          unixtime: Date.parse(query.iso),
        })
      );
    }
    res.end('dunno');
  })
  .listen(port);
