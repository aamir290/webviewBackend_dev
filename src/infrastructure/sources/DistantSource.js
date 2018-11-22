/**
 * Return data from distant ChatBot Directory server
 */
const request = require('superagent');

class DistantSource {

  /**
   * Initiate distant source
   * @param config application configuration
   * @param logger alogger
   */
  constructor(config, logger) {
    this._urlServer = config.chatBotRepositoryServerUrl || 'http://localhost';

    if(!logger) throw new Error('Missing logger');
    this._logger = logger;
  }

  /**
   * Return array of chatbots for given category
   * Empty array if no chatbots for given category
   * @param categoryId id of category to retrieve chatbots from
   * @returns promises with ategories array
   */
  async listCategory(categoryId) {
    //Create url
    if (categoryId === undefined) throw new Error('Incorrect parameter category id');
    const url = this._urlServer + '/listCategory/' + categoryId + '/inapp';

    //Request
    this._logger.debug('DistantSource - listCategory request : '+url);
    const res = await request.get(url);
    return res.body;
  }

}

module.exports = DistantSource;
