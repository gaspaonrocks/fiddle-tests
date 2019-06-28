import { cleaningStuff, makeMyMessage, sanitizeBranches2 } from "../utils";
import { exec, fork } from "child_process";
import { IndexManager } from "../index-manager";
import { selectAction } from "../welcome";

const forked = fork("./packages/git-flow-cli/src/fork.ts");
const cleaner = cleaningStuff(process);
let output: any[], error;

export const checkout = () => {
    cleaner.removeKeyPress();
    cleaner.cleanScreen();

    exec(`git branch`, (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }

        if (stdout) {
            cleaner.cleanScreen();
            output = sanitizeBranches2(stdout);
            output.unshift('new-branch');

            IndexManager.resetValue().setLimit(output.length);

            forked.send({ message: `This is checkout, where to ?`, data: makeMyMessage(output, IndexManager.getValue()), execute: false });

            process.stdin.on('keypress', (str, key) => {
                if ((key.ctrl && key.name === 'c') || key.name === 'escape') {
                    cleaner.cleanScreen();
                    cleaner.exitProc();
                } else {
                    if (key.name === 'up') {
                        cleaner.cleanScreen();
                        forked.send({ message: "This is checkout, where to ?", data: makeMyMessage(output, IndexManager.unshiftValue().getValue()), execute: false });
                    } else if (key.name === 'down') {
                        cleaner.cleanScreen();
                        forked.send({ message: "This is checkout, where to ?", data: makeMyMessage(output, IndexManager.shiftValue().getValue()), execute: false });
                    } else if (key.name === 'return') {

                    } else if (key.name === 'g') {
                        cleaner.cleanScreen();
                        selectAction();
                    };
                };
            });
        };

        if (stderr) console.log(stderr);
    });
}