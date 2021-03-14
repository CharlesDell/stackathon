const router = require('express').Router();
const axios = require('axios');
module.exports = router;

const config = {
  headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` },
};

const MAX_RESULTS = 100;

router.get('/', async (req, res, next) => {
  try {
    console.log('----- Searching twitter -----');
    // console.log('----- With config: ', config);
    const { query } = req.query;
    // console.log('----- With query: ', query);
    const { data } = await axios.get(
      `https://api.twitter.com/2/tweets/search/recent?query=%23${query}%20lang%3Aen&max_results=${MAX_RESULTS}`,
      config
    );
    res.send(data.data);
  } catch (err) {
    next(err);
  }
});
