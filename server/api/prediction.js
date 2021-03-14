const router = require('express').Router();
const axios = require('axios');
module.exports = router;

require('../../secrets');

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
      `https://api.twitter.com/2/tweets/search/recent?query=%23${query}&max_results=${MAX_RESULTS}`,
      config
    );

    console.log('--- Formating data for model');

    console.log('--- Making Prediction ---');

    console.log(data);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

async function quickstart() {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  // The text to analyze
  const text = 'Hello, world!';

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({ document: document });
  const sentiment = result.documentSentiment;

  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
}

quickstart();
