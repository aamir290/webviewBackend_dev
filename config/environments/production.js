/**
 * Configuration for development mode
 * @type {{}}
 */

module.exports = {
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 4000,
  log : {
    level : 'info',
    logDirectory : 'logs'
  }
};
