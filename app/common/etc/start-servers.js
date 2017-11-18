const { spawn } = require('child_process');
const chalk = require('chalk');

//const msg = "asdsd\n\
//asdasd"
//
//console.log(msg)

// todo asdad

console.log('\nStarting API server ' + chalk.blue.bgWhite('[nodemon]') + ' and client-side server ' + chalk.white.bgBlue('[webpack-dev-server]') + '\n')

//TODO: extend/enhance

const server = spawn('nodemon', ['./server/server.js'])

server.stdout.on('data', (data) => {
  console.log(chalk.blue.bgWhite(`[nodemon] stdout:\n${data}`));
});

server.stderr.on('data', (data) => {
  console.error(`child stderr:\n${data}`);
});

const client = spawn('./node_modules/webpack-dev-server/bin/webpack-dev-server.js', ['--config=client/etc/webpack.config.js', '--env.NODE_ENV=development'])

client.stdout.on('data', (data) => {
  console.log(chalk.white.bgBlue(`[webpack-dev-server] stdout:\n${data}`));
});

client.stderr.on('data', (data) => {
  console.error(`child stderr:\n${data}`);
});