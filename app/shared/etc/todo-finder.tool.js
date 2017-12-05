const { exec } = require('child_process');
const chalk = require('chalk');

console.log(chalk.black.bgWhite('\n> This is a tool to find commented \"todos\" thoughout this application, so I can actually follow through on some those things I should\'ve done when I actually wrote the note :)\n'))

exec('grep -nrE "(TODO)|(todo)" --exclude-dir=node_modules', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }

  //TODO: could padd stdout through loop to make the out more "readable"...not a high order of concern
  console.log(chalk.black.bgWhite(stdout));
});
