import { cleaningStuff } from "../utils";
import { exec, fork } from "child_process";
import { selectAction } from "../welcome";

const forked = fork("./packages/git-flow-cli/src/fork.ts");
const cleaner = cleaningStuff(process);

export const branch = () => {
    cleaner.removeKeyPress();
    cleaner.cleanScreen();

    exec(`git branch`, (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }

        if (stdout) {
            forked.send({ message: `This is branch`, data: stdout, execute: false });

            process.stdin.on('keypress', (str, key) => {
                if ((key.ctrl && key.name === 'c') || key.name === 'escape') {
                    cleaner.cleanScreen();
                    cleaner.exitProc();
                } else {
                    if (key.name === 'g') {
                        cleaner.cleanScreen();
                        selectAction();
                    };
                };
            });
        };

        if (stderr) console.log(stderr);
    });
}