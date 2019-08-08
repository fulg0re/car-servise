const colors = {
  reset:      '\x1b[0m',
  bright:     '\x1b[1m',
  dim:        '\x1b[2m',
  underscore: '\x1b[4m',
  blink:      '\x1b[5m',
  reverse:    '\x1b[7m',
  hidden:     '\x1b[8m',

  black:      '\x1b[30m',
  red:        '\x1b[31m',
  green:      '\x1b[32m',
  yellow:     '\x1b[33m',
  blue:       '\x1b[34m',
  magenta:    '\x1b[35m',
  cyan:       '\x1b[36m',
  white:      '\x1b[37m',

  BgBlack:    '\x1b[40m',
  BgRed:      '\x1b[41m',
  BgGreen:    '\x1b[42m',
  BgYellow:   '\x1b[43m',
  BgBlue:     '\x1b[44m',
  BgMagenta:  '\x1b[45m',
  BgCyan:     '\x1b[46m',
  BgWhite:    '\x1b[47m'
};

// Private method...
const log = (text, options) => console.log(`${options}%s${colors.reset}`, text);

const error = text => log(text, `${colors.bright}${colors.red}`);

const info = text => log(text, `${colors.bright}${colors.yellow}`);

const good = text => log(text, `${colors.bright}${colors.green}`);

const custom = (text, options) => log(text, options);

module.exports = { colors, error, info, good, custom };
