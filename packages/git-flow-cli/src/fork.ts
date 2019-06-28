const { exec } = require('child_process');

process.on('message', ({ message, data, execute }) => {
  console.log(message);
  execute ? executeAction(data) : console.log(data);
});

const executeAction = (key) => exec(`git ${key}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  if (stdout) console.log(stdout);
  if (stderr) console.log(stderr);
});