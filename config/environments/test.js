/**
 * Configuration for development mode
 * @type {{}}
 */

module.exports = {
  port: process.env.RUN_PORT || 2000,
  host: process.env.RUN_HOST || 'localhost',
  log : {
    level : 'debug',
    logDirectory : 'logs'
  },
  chatBotRepositoryServerUrl : process.env.CHATBOT_REPOSITORY_URL || 'https://pubsecbotdir.kmt.orange.com'
};
