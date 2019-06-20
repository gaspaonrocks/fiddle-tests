'use strict';

const { exec, fork, spawn } = require('child_process');
const readline = require('readline');
const {
    makeMyMessage,
    sanitizeBranches,
    shiftArray,
    unshiftArray,
} = require('./utils');

module.exports = () => {
    let myList = [];
    const subproc = spawn('git', ['branch'], { encoding: 'string', stdio: 'pipe', shell: true });
    const forked = fork('./packages/git-flow-cli/src/fork.js');

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setEncoding('utf8');
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        // console.log(key);
        if (key.ctrl && key.name === 'c') {
            process.exit();
        } else {
            process.stdout.write('\x1Bc');
            if (key.name === 'up') {
                forked.send(makeMyMessage(shiftArray(myList)));
            } else if (key.name === 'down') {
                forked.send(makeMyMessage(unshiftArray(myList)));
            } else if (key.name === 'escape') {
                process.exit();
            }
        }
    });

    subproc.stdout.setEncoding('utf8');
    subproc.stdout.on('data', data => {
        myList = sanitizeBranches(data);

        forked.send(makeMyMessage(myList));
    });

    subproc.on('error', data => { if (data) console.error(data) });
};