const fs = require('fs');

fs.readFile(process.argv[2], undefined, (err, data) => {
  console.log(data.toString().split('\n').length - 1);
});
