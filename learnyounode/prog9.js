const http = require('http');
const bl = require('bl');

const urls = process.argv.slice(2, 5);

const store = {};
let cbCounter = 0;

const fetchURL = url => {
  http.get(url, res => {
    res.pipe(
      bl((err, data) => {
        store[url] = data.toString();
        cbCounter++;
        if (cbCounter === 3) {
          urls.forEach(url => {
            console.log(store[url]);
          });
        }
      })
    );
  });
};

urls.forEach(url => {
  fetchURL(url);
});
