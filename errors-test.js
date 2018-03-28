// const logistic = x => 1 / (1 + Math.exp(-x));
// const derivative = x => logistic(x) * (1 - logistic(x));
// const h = 0.000001;

// let error = 0;
// let counter = 0;
// for (let x = 0.1; x < 100; x+=0.1) {
//     const real = derivative(x);
//     const comp = (logistic(x + h) - logistic(x)) / h;

//     console.log(`${x}\t${real}\t${comp}`)

//     error += Math.abs(real - comp);
//     counter++;
// }

// console.log(error / counter);

const NeuralNetwork = require('./src/neuralNetwork');
const network = new NeuralNetwork(1, 3, 1, 0.1);
console.log(network.train([0.5], [0.7]));