const language = require('@google-cloud/language');
const router = require('express').Router();
const axios = require('axios');
module.exports = router;

const client = new language.LanguageServiceClient();

router.post('/', async (req, res, next) => {
  try {
    let { text } = req.body;

    text = text.replace(/[^0-9a-zA-Z_\s]/g, '');

    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({ document: document });
    const sentiment = result.documentSentiment;

    res.json(sentiment);
  } catch (err) {
    next(err);
  }
});
