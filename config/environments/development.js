/**
 * Configuration for development mode
 * @type {{}}
 */

module.exports = {
  port: process.env.RUN_PORT || 3000,
  host: process.env.RUN_HOST || 'localhost',
  log : {
    level : 'debug',
    logDirectory : 'logs'
  },
  chatBotRepositoryServerUrl : process.env.CHATBOT_REPOSITORY_URL || 'https://bot-directory.noprod-b.kmt.orange.com'
};
