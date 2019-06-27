import { exec, spawn, SpawnOptions } from 'child_process';
// import readline from 'readline';
import inquirer from 'inquirer';

export function gitFlowCli() {
    // TODO

    const question = {
        type: 'list',
        name: 'branche',
        message: 'archiver quelle branche ?',
        choices: ['un', 'deux']
    };

    const sanitizeBranches = (input) => {
        return JSON.stringify(input).replace(/"/gi, '').replace(/  /gi, '').replace(/\\n/gi, ' ').split(' ').filter(element => element.length > 1);
    };

    const spawnOptions: SpawnOptions = { stdio: 'pipe' }

    const subproc = spawn('git', ['branch'], { /* encoding: 'string', */ stdio: 'pipe' });

    subproc.stdout.setEncoding('utf8');

    subproc.stdout.on('data', data => {

        const myList = sanitizeBranches(data);
        question.choices = myList;

        inquirer
            .prompt([question])
            .then(answers => {
                console.log(answers[question.name]);
                const subproc2 = spawn('git', ['branch', '-m', `${answers[question.name]}`, `archive/${answers[question.name]}`], { /* encoding: 'string', */ stdio: 'pipe' });

                subproc2.stdout.on("data", data => console.log(`data: ${data}`));
                subproc2.stderr.on("data", data => console.log(`error: ${data}`));
            });
    });

    subproc.on('error', data => { if (data) console.error(data) });
}