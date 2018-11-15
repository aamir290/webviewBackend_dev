const finabankChatbotResults = require('./finabank');

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
      if (match[1] === '/listCategory/finabank/inapp') {
        return finabankChatbotResults;
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
