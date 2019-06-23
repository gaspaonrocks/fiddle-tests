const { fork } = require('child_process');
const {
    makeMyMessage,
    shiftArray,
    unshiftArray,
} = require('./utils');
const readline = require('readline');

/**
 * @todo map each choice with a specific git command and execute it
 */
let choices = ['status', 'add', 'commit', 'branch', 'checkout', 'merge', 'rebase', 'log'];

const forked = fork('./packages/git-flow-cli/src/fork.js');

readline.emitKeypressEvents(process.stdin);

const removeKeyPressListeners = () => {
    process.stdin.removeAllListeners('keypress');
}

/**
 * @todo: externalise it.
 */
process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);

const statusSelect = (choice) => {
    removeKeyPressListeners();
    process.stdout.write('\x1Bc');
    forked.send({ message: `You selected ${choices[0]}`, data: choices[0], execute: true });
    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
            process.stdout.write('\x1Bc');
            process.exit();
        } else {
            // console.log(key);

            if (key.name === 'g') {
                // forked.send({ message: "What do you want to do ?", data: makeMyMessage(shiftArray(choices)), execute: false });
                process.stdout.write('\x1Bc');
                selectAction();
            };
        };
    })
}

const selectAction = () => {
    removeKeyPressListeners();
    process.stdout.write('\x1Bc');
    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
            process.stdout.write('\x1Bc');
            process.exit();
        } else {
            /**
             * @todo mapper des action spécifiques avec des touches spécifiques.
             */
            // console.log(key);

            if (key.name === 'up') {
                process.stdout.write('\x1Bc');
                forked.send({ message: "What do you want to do ?", data: makeMyMessage(shiftArray(choices)), execute: false });
            } else if (key.name === 'down') {
                process.stdout.write('\x1Bc');
                forked.send({ message: "What do you want to do ?", data: makeMyMessage(unshiftArray(choices)), execute: false });
            } else if (key.name === 'escape') {
                process.stdout.write('\x1Bc');
                process.exit();
            } else if (key.name === 'return') {
                // forked.send({ message: `You selected ${choices[0]}`, data: choices[0], execute: true });
                statusSelect(choices[0]);
                // process.exit(); ?
            }
        }
    });

    process.stdout.write('\x1Bc');
    forked.send({ message: "What do you want to do ?", data: makeMyMessage(choices) });
}

selectAction();