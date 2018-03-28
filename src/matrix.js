class Matrix {
    /**
     * 
     * @param {number} [m] 
     * @param {number} [n] 
     * @param {(number[]|Matrix|Function)} init 
     */
    constructor(m, n, init) {
        if (m instanceof Matrix) {
            this._init(m.m, m.n, (i, j) => m.get(i ,j));
        } else if (m instanceof Array) {
            if (m[0] instanceof Array) {
                this._init(m.length, m[0].length, (i, j) => m[i][j]);
            } else {
                this._init(1, m.length, (i, j) => m[j]);
            }
        } else {
            this._init(m, n, init);
        }
    }   

    _init(m, n, init) {
        if (!init) {
            init = () => 0;
        }

        this.values = new Array(m);
        this.m = m;
        this.n = n;
        for (let i = 0; i < m; i++) {
            this.values[i] = new Array(n);
            for (let j = 0; j < n; j++) {
                this.values[i][j] = init(i, j);
            }
        }
    }

    get(i, j) {
        return this.values[i][j];
    }

    set(i, j, value) {
        this.values[i][j] = value;
    }

    map(mapper) {
        return new Matrix(this.m, this.n, (i, j) => mapper(this.get(i, j), i, j));
    }

    scalar(b, oper) {
        const a = this;
        let init;
        if (b instanceof Matrix && a.m === b.m && a.n === b.n) {
            init = (i, j) => oper(a.get(i, j),  b.get(i, j));
        } else {
            throw new Error('Invalid operation');
        }
        return new Matrix(a.m, a.n, init);
    }

    /**
     * 
     * @param {Matrix} b 
     */
    dot(b) {
        const a = this;
        if (!(b instanceof Matrix) || a.n !== b.m) {
            throw new Error('Invalid operation');
        }
        return new Matrix(a.m, b.n, (i, j) => {
            let sum = 0;
            for (let k = 0; k < a.n; k++) {
                sum += a.get(i, k) * b.get(k, j);
            }
            return sum;
        });
    }

    transpose() {
        const a = this;
        return new Matrix(a.n, a.m, (i, j) => a.get(j, i));
    }
}

module.exports = Matrix;
