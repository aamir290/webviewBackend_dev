const finabankChatbotResults = require('./finabank');
const allChatbotsResults = require('./all');

module.exports = [
  {
    /**
     * regular expression of URL
     */
    pattern: 'https://pubsecbotdir.kmt.orange.com(.*)',

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match, params, headers, context) {
      /**
       * Return for request returning list of chatbot associated to finabank category
       */
      if (match[1] === '/listCategory/finabank/orangeApp') {
        return finabankChatbotResults;
      }

      if (match[1] === '/listCategory/educ/orangeApp') {
        throw new Error(500);
      }

      if (match[1] === '/searchChatbots/toto/orangeApp') {
        return finabankChatbotResults;
      }

      if (match[1] === '/searchChatbots/toto/orangeApp/tutu') {
        return allChatbotsResults;
      }

      if (match[1] === '/searchChatbots/educ/orangeApp') {
        throw new Error(500);
      }

      if (match[1] === '/list/orangeApp') {
        return allChatbotsResults;
      }
    },

    /**
     * returns the result of the GET request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    get: function (match, data) {
      return {
        body: data
      };
    }
  },
];
