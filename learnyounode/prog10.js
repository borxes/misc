const net = require('net');
const strftime = require('strftime');

const port = process.argv[2];
const server = net.createServer(socket => {
  const datetime = strftime('%F %H:%M', new Date());
  socket.end(datetime + '\n');
});

server.listen(port);
