const tf = require('@tensorflow/tfjs-node');
const model = require('./model');

const encode = require('./encoder');

const CSV_URL = 'file:///home/charles/Downloads/tweet_training.csv';
const DATASET_SIZE = 16384;

const TRAIN_SIZE = Math.floor(0.7 * DATASET_SIZE);
const TEST_SIZE = Math.floor(0.15 * DATASET_SIZE);
const VAL_SIZE = Math.floor(0.15 * DATASET_SIZE);

async function run() {
  const csvDataset = tf.data.csv(CSV_URL, {
    columnConfigs: {
      target: {
        isLabel: true,
      },
    },
  });

  const unencodedDataset = await csvDataset.toArray();
  const encodedDataset = await Promise.all(
    unencodedDataset.map(async (dataObj) => {
      try {
        // console.log(dataObj);
        const encodedText = await encode(dataObj.xs.text);
        return { xs: { text: encodedText }, ys: { target: dataObj.ys.target } };
      } catch (err) {
        console.error(err);
      }
    })
  );

  console.log(await encodedDataset);

  // const numOfFeatures = (await csvDataset.columnNames()).length - 1;

  /*

  Step-1: import data X
  Step-2: encode just the text column
  Step-3: reform


  */

  // const fullDataset = csvDataset;
  const fullDataset = tf.data
    .array(encodedDataset)
    .shuffle(Math.floor(0.5 * DATASET_SIZE));
  const trainDataset = fullDataset.take(TRAIN_SIZE);
  const testAndValDataset = fullDataset.skip(TRAIN_SIZE);
  const testDataset = testAndValDataset.take(TEST_SIZE);
  const valDataset = testAndValDataset.take(VAL_SIZE);

  console.log(trainDataset.toArray());

  const flatten = (dataset) => {
    return dataset
      .map(({ xs, ys }) => {
        return { xs: Object.values(xs), ys: Object.values(ys) };
      })
      .batch(10);
  };

  const flattenedTrainDataset = flatten(trainDataset);
  const flattenedValDataset = flatten(valDataset);

  await model.fitDataset(flattenedTrainDataset, {
    epochs: 10,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        console.log(epoch + ':' + logs.loss);
      },
    },
    validationData: flattenedValDataset,
  });

  const testArr = await testDataset.toArray();
  const errArr = testArr.map((e) => {
    const expTensor = model.predict(tf.tensor(Object.values(e.xs), [1, 11]));
    const exp = expTensor.arraySync();
    const result =
      (Math.abs(Math.round(exp[0][0]) - e.ys.target) / e.ys.target) * 100;
    return result;
  });

  const result = errArr.reduce((acc, val) => acc + val) / errArr.length;
  console.log(`Average Percent Error: ${result.toFixed(2)}%`);
  console.log(`Accuracy: ${(100 - result).toFixed(2)}%`);
}

run();
