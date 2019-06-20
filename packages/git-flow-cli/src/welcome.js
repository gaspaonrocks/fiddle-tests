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
let choices = ['status', 'add', 'commit', 'branch', 'checkout', 'merge', 'rebase'];

const forked = fork('./packages/git-flow-cli/src/fork.js');

readline.emitKeypressEvents(process.stdin);

/**
 * @todo: externalise it.
 */
process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.stdout.write('\x1Bc');
        process.exit();
    } else {
        process.stdout.write('\x1Bc');
        // console.log(key);
        console.log("What do you want to do ?");

        if (key.name === 'up') {
            forked.send(makeMyMessage(shiftArray(choices)));
        } else if (key.name === 'down') {
            forked.send(makeMyMessage(unshiftArray(choices)));
        } else if (key.name === 'escape') {
            process.stdout.write('\x1Bc');
            process.exit();
        } else if (key.name === 'return') {
            process.stdout.write('\x1Bc');
            forked.send(`You selected ${choices[0]}`);
        }
    }
});

const selectAction = () => {
    process.stdout.write('\x1Bc');
    console.log("What do you want to do ?");
    forked.send(makeMyMessage(choices));
}

selectAction();