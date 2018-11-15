/**
 * Return data from distant ChatBot Directory server
 */
const request = require('superagent');

class DistantSource {

  /**
   * Initiate distant source
   * @param config application configuration
   */
  constructor(config, logger) {
    this._urlServer = config.chatBotRepositoryServerUrl || 'http://localhost';
    this._logger = logger;
  }

  /**
   * Return array of chatbots for given category
   * Empty array if no chatbots for given category
   * @param categoryId id of category to retrieve chatbots from
   * @returns promises with ategories array
   */
  listCategory(categoryId) {
    return new Promise((resolve, reject) => {
      //Create url
      if (categoryId === undefined) reject();
      const url = this._urlServer + '/listCategory/' + categoryId + '/inapp';

      this._logger.debug('Call to server request: ' + url);

      request.get(url).then(res => {
        if (res && res.body) {
          resolve(res.body);
        } else {
          reject();
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

}

module.exports = DistantSource;
