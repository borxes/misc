const http = require('http');
const fs = require('fs');

const [port, filePath] = [...process.argv.slice(2, 4)];

const sendFileStream = (req, res) => {
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
};

const server = http.createServer(sendFileStream);
console.log(`listening on port ${port} serving ${filePath}`);
server.listen(port);
