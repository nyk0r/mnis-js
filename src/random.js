function nextGaussian () {
    let v1, v2, s;
    do {
        v1 = 2.0 * Math.random() - 1.0;
        v2 = 2.0 * Math.random() - 1.0;
        s = v1 * v1 + v2 * v2;
    } while (s >= 1.0 || s == 0);

    s = Math.sqrt((-2.0 * Math.log(s)) / s);
    return v1 * s;
}

module.exports = (mean, deviation) => mean + nextGaussian() * deviation;