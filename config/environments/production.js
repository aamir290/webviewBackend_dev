/**
 * Configuration for development mode
 * @type {{}}
 */

module.exports = {
  port: process.env.RUN_PORT || 4000,
  host: process.env.RUN_HOST || 'localhost',
  log : {
    level : 'info',
    logDirectory : 'logs'
  },
  chatBotRepositoryServerUrl : process.env.CHATBOT_REPOSITORY_URL || 'https://bot-directory.noprod-b.kmt.orange.com'
};
