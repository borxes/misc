const fs = require('fs');
const path = require('path');

module.exports = (dirName, ext, cb) => {
  fs.readdir(dirName, (err, files) => {
    let data = [];
    if (err) {
      return cb(err);
    }
    files.forEach(file => {
      if (path.extname(file) === `.${ext}`) {
        data.push(file);
      }
    });
    cb(null, data);
  });
};
