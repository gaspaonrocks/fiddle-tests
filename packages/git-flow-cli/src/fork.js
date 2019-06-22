const { exec } = require('child_process');

process.on('message', ({ message, data, execute }) => {
  console.log(message);
  execute ? executeAction(data) : console.log(data);
});

/**
 * @todo is it necessary to have it here ?
 */
const actionMapping = {
  status: "",
  checkout: "",
  branch: "",
  log: "",
};

const executeAction = (key) => exec(`git ${key}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stdout) console.log(stdout);
  if (stderr) console.log(stderr);
});