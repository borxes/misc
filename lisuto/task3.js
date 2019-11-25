// function read (fileName, fileType, cb);
//  function cb (err, results) {  …  }


// const readPromise = promisifyRead(read);
// readPromise('history', 'text')
//      .then(result => console.log('File content::', result)))
//      .catch(err => console.error(err));



/*
 * Complete the 'promisifyRead' function below.
 *
 * The function is expected to return an Function.
 * The function accepts Function func as parameter.
 */

function promisifyRead(func) {
  /* Implement here */
  return (fileName, fileType) => {
    return new Promise((resolve, reject) => {
      func(fileName, fileType, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  };
}

function read(name, type, cb) {
  cb(null, 'hello');
}

const pread = promisifyRead(read);

pread('yo', 'dawg').then(res => { console.log(res); });