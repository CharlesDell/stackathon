require('@tensorflow/tfjs-node');
const use = require('@tensorflow-models/universal-sentence-encoder');

const tokenizer = new use.Tokenizer();

console.log(tokenizer);

// tokenizer.loadTokenizer().then((tokenizer) => {
//   tokenizer.encode('Hello, how are you?'); // [341, 4125, 8, 140, 31, 19, 54]
// });

module.exports = async (input) => {
  console.log(input);
  return tokenizer.encode(input);
};
