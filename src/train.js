const join = require('path').join;
const NeuralNetwork = require('./neuralNetwork');
const reader = require('./reader');
const Matrix = require('./matrix');

function createExpected(num) {
    return new Matrix(1, 10, (i, j) => j === num ? 0.9 : 0.01);
}

function getResult(result) {
    result = result.transpose();
    let min = 1000;
    let idx = -1;
    for (let j = 0; j < result.n; j++) {
        if (result.get(0, j) < min) {
            min = result.get(0, j);
            idx = j;
        }
    }
    return idx;
}

const dir = './data/small';
const network = new NeuralNetwork(28*28, 200, 10, 0.1);
for (let source of reader(join(dir, 'train.csv'))) {
    network.train(source.shape, createExpected(source.value));
}
let full = 0;
let correct = 0;
for (let source of reader(join(dir, 'test.csv'))) {
    full++;
    console.log(`${network.query(source.shape).values}->${source.value}`);
    if (getResult(network.query(source.shape)) === source.value) {
        correct++;
    }
}
console.log(correct / full * 100);
