const readDir = require('./module6');

readDir(process.argv[2], process.argv[3], (err, data) => {
  data.forEach(file => {
    console.log(file);
  });
});
