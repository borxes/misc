/* global process  */

const express = require('express');
const app = express();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ urls: [] }).write();

//console.log(db.get('urls').value());
app.use(express.static('static'));

require('./routes/walletinfo')(app);
require('./routes/savewebshot')(app, db);
require('./routes/listurls')(app, db);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log(`Server: listening on port ${PORT}`);
