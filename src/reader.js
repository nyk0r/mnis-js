const fs = require('fs');

module.exports = (path) => {
    const lines = fs.readFileSync(path, { encoding: 'ascii' }).split(/\n|\r\n|\r/g).filter(s => !!s);
    return lines.map(line => {
        const nums = line.split(',');
        const val = parseInt(nums.shift());
        return {
            value: val,
            shape: nums.map(n => parseInt(n)/255*0.9 + 0.01)
        };
    });
};
