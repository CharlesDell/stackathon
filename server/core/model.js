const tf = require('@tensorflow/tfjs-node');

const model = tf.sequential();
model.add(
  tf.layers.embedding({ inputDim: 250, outputDim: 64, maskZero: true })
);
model.add(tf.layers.bidirectional(tf.layers.lstm({ units: 64 })));
model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1 }));

model.compile({
  optimizer: tf.train.adam(0.0001),
  loss: 'binaryCrossentropy',
  metrics: ['accuracy'],
});

module.exports = model;
