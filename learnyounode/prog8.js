const bl = require('bl');
const http = require('http');

const url = process.argv[2];

http.get(url, response => {
  response.pipe(
    bl((err, data) => {
      const str = data.toString();
      const len = str.length;
      console.log(len);
      console.log(str);
    })
  );
});
