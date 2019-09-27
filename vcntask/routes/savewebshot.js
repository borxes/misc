const captureWebsite = require('capture-website');
const parseUri = require('parse-uri');
var metadata = require('html-metadata');

const UPLOAD_DIR = './static/uploads';
const WEBPATH_DIR = 'uploads';

module.exports = async (app, db) => {
  app.get('/savewebshot/', async (req, res) => {
    console.log(req.query);
    if (req.query.url) {
      console.log(`got ${req.query.url}`);
      metadata(req.query.url)
        .then(async metadata => {
          const title = metadata.general.title || '';
          const description = metadata.general.description || '';
          const name = metadata.openGraph ? metadata.openGraph.title : '';
          const path = `${UPLOAD_DIR}/${parseUri(req.query.url).host}.png`;
          const webPath = `${WEBPATH_DIR}/${parseUri(req.query.url).host}.png`;
          console.log(`title: ${title}`);
          await captureWebsite.file(req.query.url, path);
          await db
            .get('urls')
            .push({
              title,
              description,
              name,
              path: webPath,
            })
            .write();
          res.send({
            status: 'Ok',
            result: { title, description, name, url: req.query.url },
          });
        })
        .catch(err => {
          res.send({ status: 'Error', message: err });
        });
    } else {
      res.send({ status: 'Error', message: 'Please supply URL' });
    }
  });
};
