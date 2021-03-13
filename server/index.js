const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== 'production') require('../secrets');

const createApp = () => {
  // api routes
  app.use('/api', require('./api'));

  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
};

const bootApp = async () => {
  await createApp();
  await startListening();
};

if (require.main === module) {
  bootApp();
} else {
  createApp();
}
