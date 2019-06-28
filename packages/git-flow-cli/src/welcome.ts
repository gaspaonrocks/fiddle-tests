import { IndexManager } from './index-manager';
import { fork } from 'child_process';
import {
    cleaningStuff,
    makeMyMessage,
} from './utils';
import { branch, checkout, log, status } from "./commands";
import * as readline from 'readline';

const forked = fork('./packages/git-flow-cli/src/fork.ts', ['-r', 'ts-node/register']);
const cleaner = cleaningStuff(process);

/**
 * @todo map each choice with a specific git command and execute it
 */
let choices = ['status', 'add', 'commit', 'branch', 'checkout', 'merge', 'rebase', 'log'];
IndexManager.setLimit(choices.length);

readline.emitKeypressEvents(process.stdin);

/**
 * @todo: externalise it.
 */
process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);

const mapping = {
    branch,
    checkout,
    log,
    status,
}

const statusSelect = (index) => {
    cleaner.removeKeyPress();
    cleaner.cleanScreen();
    // forked.send({ message: `You selected ${choices[index]}`, data: choices[index], execute: true });
    mapping[choices[index]]();
    process.stdin.on('keypress', (str, key) => {
        if ((key.ctrl && key.name === 'c') || key.name === 'escape') {
            cleaner.cleanScreen();
            cleaner.exitProc();
        } else {
            if (key.name === 'g') {
                forked.send({ message: "", data: '', execute: false });
                // cleaner.cleanScreen();
                selectAction();
            };

            mapping[choices[index]](key);
        };
    });
}

export const selectAction = () => {
    cleaner.removeKeyPress();
    cleaner.cleanScreen();

    IndexManager.resetValue().setLimit(choices.length);

    process.stdin.on('keypress', (str, key) => {
        if ((key.ctrl && key.name === 'c') || key.name === 'escape') {
            cleaner.cleanScreen();
            cleaner.exitProc();
        } else {
            if (key.name === 'up') {
                cleaner.cleanScreen();
                forked.send({ message: "What do you want to do ?", data: makeMyMessage(choices, IndexManager.unshiftValue().getValue()), execute: false });
            } else if (key.name === 'down') {
                cleaner.cleanScreen();
                forked.send({ message: "What do you want to do ?", data: makeMyMessage(choices, IndexManager.shiftValue().getValue()), execute: false });
            } else if (key.name === 'return') {
                statusSelect(IndexManager.getValue());
            }
        }
    });

    cleaner.cleanScreen();
    forked.send({ message: "What do you want to do ?", data: makeMyMessage(choices, IndexManager.getValue()) });
};

selectAction();