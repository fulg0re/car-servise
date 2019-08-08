const chalk = require('chalk');

const error = (data) => console.log(chalk.bold.red(data));

const info = (data) => console.log(chalk.bold.yellow(data));

const good = (data) => console.log(chalk.bold.green(data));

module.exports = { error, info, good };
