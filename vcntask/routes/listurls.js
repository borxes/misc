module.exports = async (app, db) => {
  app.get('/listurls', async (req, res) => {
    res.send({ urls: db.get('urls').value() });
  });
};
