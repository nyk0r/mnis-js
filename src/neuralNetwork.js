const Matrix = require('./matrix');
const random = require('./random');

class NeuralNetwork {
    /**
     * 
     * @param {number} input Amount of input nodes.
     * @param {number} hidden Amount of nodes in the hidden layer.
     * @param {number} output Amount of output nodes.
     * @param {number} rate Learning rate.
     */
    constructor(input, hidden, output, rate) {
        this._hidden = this._initLayer(input, hidden);
        this._out = this._initLayer(hidden, output);

        this._rate = rate;
        this._activation = x => 1/(1 + Math.exp(-x));
    }

    /**
     * 
     * @param {number} inputs Number of inputs to each node.
     * @param {number} nodes Amount of nodes in each layer.
     */
    _initLayer(inputs, nodes) {
        const ceil = 1/Math.sqrt(inputs);
        //return new Matrix(nodes, inputs, () => Math.random()*2*ceil - ceil);
        return new Matrix(nodes, inputs, () => random(0, ceil));
    }

    /**
     * 
     * @param {number[]} input 
     * @param {number[]} expected 
     */
    train(input, expected) {
        const l1 = (new Matrix(input)).transpose();
        const l2 = this._hidden.dot(l1).map(this._activation);
        const l3 = this._out.dot(l2).map(this._activation);

        const errorL3 = (new Matrix(expected)).transpose().scalar(l3, (x, y) => x - y);
        const errorL2 = this._out.transpose().dot(errorL3);

        this._out = this._trainLayer(this._out, l2, l3, errorL3);
        this._hidden = this._trainLayer(this._hidden, l1, l2, errorL2);
    }

    /**
     * 
     * @param {Matrix} layer 
     * @param {Matrix} input 
     * @param {Matrix} output 
     * @param {Matrix} error 
     * @returns {Matrix}
     */
    _trainLayer(layer, input, output, error) {
        const delta = error.scalar(output.map(x => x*(1 - x)), (x, y) => x*y).dot(input.transpose());
        return layer.scalar(delta, (x, y) => x + this._rate * y);
    }

    /**
     * 
     * @param {number[]} input
     * @returns {Matrix}
     */
    query(input) {
        const l1 = (new Matrix(input)).transpose();
        const l2 = this._hidden.dot(l1).map(this._activation);
        return this._out.dot(l2).map(this._activation);
    }
}

module.exports = NeuralNetwork;