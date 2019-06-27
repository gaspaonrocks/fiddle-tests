const makeMyMessage = (input, inpIndex) => input.reduce((prev, curr, index) => {
    return prev + `${inpIndex === index ? '>' : ' '} ${curr}\n`
}, '');

const sanitizeBranches = input => {
    return JSON.stringify(input).replace(/"/gi, '').replace(/  /gi, '').replace(/\\n/gi, ' ').split(' ').filter(element => element.length > 1);
};

const cleaningStuff = function (proc) {
    const internalProc = proc;
    return {
        cleanScreen: () => internalProc.stdout.write('\x1Bc'),
        removeKeyPress: () => internalProc.stdin.removeAllListeners('keypress'),
        exitProc: () => internalProc.exit(),
    };
}

export {
    cleaningStuff,
    makeMyMessage,
    sanitizeBranches,
};