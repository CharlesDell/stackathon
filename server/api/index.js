const router = require('express').Router();
module.exports = router;

router.use('/twitter', require('./twitter'));
router.use('/google-cloud', require('./google-cloud'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
