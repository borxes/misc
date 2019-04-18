const fs = require('fs');
const path = require('path');

const [dir, ext] = [process.argv[2], process.argv[3]];
fs.readdir(dir, (err, list) => {
  list.forEach(file => {
    if (path.extname(file) === `.${ext}`) {
      console.log(file);
    }
  });
});
