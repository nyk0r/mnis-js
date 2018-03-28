const expect = require('chai').expect;
const Matrix = require('../src/matrix');

context('#init', () => {
    it('can be initialized by a function', () => {
        const m = new Matrix(3, 2, (i, j) => i + j);
        expect(m.m).to.equal(3);
        expect(m.n).to.equal(2);
        expect(m.values).to.eql([
            [0, 1],
            [1, 2],
            [2, 3]
        ]);
    });

    it('can be initialized by a square array', () => {
        const a = [
            [11, 12, 13],
            [21, 22, 23]
        ];
        const m = new Matrix(a);
        expect(m.m).to.equal(2);
        expect(m.n).to.equal(3);
        expect(m.values).to.eql(a);
    });

    it('can be initialized by a list', () => {
        const a = [11, 12, 13];
        const m = new Matrix(a);
        expect(m.m).to.equal(1);
        expect(m.n).to.equal(3);
        expect(m.values).to.eql([a]);
    });
});

context('#scaler operation', () => {
    it('can be performed on matrices of the same size', () => {
        const x = new Matrix([
            [1, 2, 3],
            [4, 5, 6]
        ]);
        const y = new Matrix([
            [1, 2, 3],
            [4, 5, 6]
        ]);
        const z = x.scalar(y, (a, b) => a*b);
        expect(z.m).to.equal(2);
        expect(z.n).to.equal(3);
        expect(z.values).to.eql([
            [1, 4, 9],
            [16, 25, 36]
        ]);
    });
});

context('#matrices mult', () => {
    it('can multiplay matrices of the same size', () => {
        const x = new Matrix([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);
        const y = new Matrix([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);
        const z = x.dot(y);
        expect(z.m).to.equal(3);
        expect(z.n).to.equal(3);
        expect(z.values).to.eql([
            [30,  36,  42],
            [66,  81,  96],
            [102, 126, 150]
        ]);
    });

    it('can multiplay matrices of the compatible sizes', () => {
        const x = new Matrix([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);
        const y = new Matrix([
            [1],
            [4],
            [7]
        ]);
        const z = x.dot(y);
        expect(z.m).to.equal(3);
        expect(z.n).to.equal(1);
        expect(z.values).to.eql([
            [30],
            [66],
            [102]
        ]);
    });
});

context('#transpose', () => {
    it('can transpose square matrices', () => {
        const x = new Matrix([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);
        const z = x.transpose();
        expect(z.m).to.equal(3);
        expect(z.n).to.equal(3);
        expect(z.values).to.eql([
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9]
        ]);
    });

    it('can transpose lists', () => {
        const x = new Matrix([1, 2, 3]);
        const z = x.transpose();
        expect(z.m).to.equal(3);
        expect(z.n).to.equal(1);
        expect(z.values).to.eql([
            [1],
            [2],
            [3]
        ]);
    });
});
