'use strict';

const { exec, spawn } = require('child_process');
const readline = require('readline');
const inquirer = require('inquirer');

function gitFlowCli() {
    // TODO

    const question = {
        type: 'list',
        name: 'branche',
        message: 'archiver quelle branche ?',
        choices: ['un', 'deux']
    };

    const sanitizeBranches = (input) => {
        return JSON.stringify(input).replace(/"/gi, '').replace(/  /gi, '').replace(/\\n/gi, ' ').split(' ').filter(element => element.length > 1);
    }

    const subproc = spawn('git', ['branch'], { encoding: 'string', stdio: 'pipe' });

    subproc.stdout.setEncoding('utf8');

    subproc.stdout.on('data', data => {

        const myList = sanitizeBranches(data);
        question.choices = myList;
        const myMessage = myList.reduce((prev, curr, index) => {
            return prev + `  ${curr} \n`
        }, '')

        /* inquirer
            .prompt([question])
            .then(answers => {
                console.log(answers[question.name]);
                const subproc2 = spawn('git', ['branch', '-m', `${answers[question.name]}`, `archive/${answers[question.name]}`], { encoding: 'string', stdio: 'pipe' });

                subproc2.stdout.on("data", data => console.log(`data: ${data}`));
                subproc2.stderr.on("data", data => console.log(`error: ${data}`));
            }); */

        console.log(myMessage);
    });

    subproc.on('error', data => { if (data) console.error(data) });

    // (error, stdout, stderr) => {
    // if (error) throw error;
    // 

    // });
}


module.exports = gitFlowCli;
