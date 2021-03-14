const tf = require('@tensorflow/tfjs-node');

const model = tf.sequential();
/* NOTE:
 * Embeddings layer removed in favor of using the TensorFlow.js
 * Universal Text Encoder.
 */
model.add(
  tf.layers.embedding({ inputDim: 250, outputDim: 64, maskZero: true })
);
model.add(
  tf.layers.bidirectional({
    layer: tf.layers.lstm({ units: 64 }),
  })
);
model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1 }));

model.compile({
  optimizer: tf.train.adam(0.0001),
  loss: 'binaryCrossentropy',
  metrics: ['accuracy'],
});

module.exports = model;
