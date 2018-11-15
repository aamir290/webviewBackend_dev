/**
 * Configuration for development mode
 * @type {{}}
 */

module.exports = {
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 4000,
  host: process.env.OPENSHIFT_NODEJS_IP || 'localhost',
  log : {
    level : 'info',
    logDirectory : 'logs'
  },
  chatBotRepositoryServerUrl : 'https://pubsecbotdir.kmt.orange.com'
};
