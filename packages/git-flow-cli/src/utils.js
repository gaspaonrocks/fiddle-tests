const makeMyMessage = input => input.reduce((prev, curr, index) => {
    return prev + `${curr}\n  `
}, '> ');

const sanitizeBranches = input => {
    return JSON.stringify(input).replace(/"/gi, '').replace(/  /gi, '').replace(/\\n/gi, ' ').split(' ').filter(element => element.length > 1);
};

const shiftArray = array => {
    array.push(array.shift());

    return array;
};

const unshiftArray = array => {
    array.unshift(array.pop());

    return array;
};

module.exports = {
    makeMyMessage,
    sanitizeBranches,
    shiftArray,
    unshiftArray,
};