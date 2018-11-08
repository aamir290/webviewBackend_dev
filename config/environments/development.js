/**
 * Configuration for development mode
 * @type {{}}
 */

module.exports = {
  // port: process.env.PORT
  port: process.env.PORT || 3000,
  host: 'localhost',
  log : {
    level : 'debug',
    logDirectory : 'logs'
  }
};
