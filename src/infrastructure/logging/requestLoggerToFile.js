/**
 * Log request access to file
 */

const morgan = require('morgan');
const fs = require('fs');
var rfs = require('rotating-file-stream');

module.exports = (config) => {

  //Logs directory => create it if not exists
  const logDirectory = config.log.logDirectory || 'logs';
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, {recursive: true}, (err) => {
      if (err) throw err;
    });
  }

  // create a rotating write stream
  const accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
  });

  return morgan('common', {stream: accessLogStream});
};

